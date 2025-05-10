package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.TeamProfileResponse;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamPublicController {

    private final TeamRepository teamRepository;

    @GetMapping("/{teamId}/profile")
    public ResponseEntity<?> getTeamProfile(@PathVariable Integer teamId) {
        return teamRepository.findById(teamId)
                .map(team -> {
                    TeamProfileResponse dto = new TeamProfileResponse();
                    dto.setTeamId(team.getId());
                    dto.setName(team.getName());
                    dto.setLogo(team.getLogo());
                    dto.setRegion(team.getRegion());

                    dto.setCoachUsername(team.getCoach().getUsername());
                    dto.setCoachImage(team.getCoach().getImage());

                    List<TeamProfileResponse.PlayerInfo> playerInfos = team.getPlayers().stream()
                            .map(p -> {
                                TeamProfileResponse.PlayerInfo pi = new TeamProfileResponse.PlayerInfo();
                                pi.setUsername(p.getUsername());
                                pi.setImage(p.getImage());
                                return pi;
                            })
                            .toList();

                    dto.setPlayers(playerInfos);

                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // New endpoint to get all teams sorted by rating
    @GetMapping("/leaderboard")
    public ResponseEntity<List<Team>> getLeaderboard() {
        // Fetch all teams ordered by rating in descending order
        List<Team> leaderboard = teamRepository.findAllByOrderByRatingDesc();
        return ResponseEntity.ok(leaderboard);
    }

}
