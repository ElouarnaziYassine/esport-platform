package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.CreateTeamRequest;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.User;
import com.tournament.tournament_system.repository.TeamRepository;
import com.tournament.tournament_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coach/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody CreateTeamRequest request,
                                        @AuthenticationPrincipal UserDetails userDetails) {

        if (request.getPlayerIds().size() != 5) {
            return ResponseEntity.badRequest().body("Team must have exactly 5 players.");
        }

        User coach = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Coach not found"));


        if (!"COACH".equalsIgnoreCase(coach.getRole())) {
            return ResponseEntity.status(403).body("Only users with role COACH can create teams.");
        }

        List<User> players = userRepository.findAllById(request.getPlayerIds());

        if (players.size() != 5 || players.stream().anyMatch(p -> !"PLAYER".equalsIgnoreCase(p.getRole()))) {
            return ResponseEntity.badRequest().body("All team members must be valid players.");
        }

        Team team = new Team();
        team.setName(request.getName());
        team.setCoach(coach);
        team.setPlayers(players);

        return ResponseEntity.ok(teamRepository.save(team));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTeamById(@PathVariable Integer id,
                                         @AuthenticationPrincipal UserDetails userDetails) {

        User coach = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        return teamRepository.findById(id)
                .map(team -> {
                    // Only the coach who owns the team can view it (or extend to allow ADMIN later)
                    if (!team.getCoach().getId().equals(coach.getId())) {
                        return ResponseEntity.status(403).body("You are not allowed to view this team.");
                    }
                    return ResponseEntity.ok(team);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
