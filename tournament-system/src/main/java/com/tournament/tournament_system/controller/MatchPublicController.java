package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.MatchPublicResponse;
import com.tournament.tournament_system.dto.TeamStandingResponse;
import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchPublicController {

    private final MatchRepository matchRepository;

    @GetMapping("/tournament/{tournamentId}")
    public ResponseEntity<List<MatchPublicResponse>> getMatchesByTournament(@PathVariable Integer tournamentId) {
        List<Match> matches = matchRepository.findByTournamentId(tournamentId);

        List<MatchPublicResponse> response = matches.stream().map(match -> {
            MatchPublicResponse dto = new MatchPublicResponse();
            dto.setMatchId(match.getId());
            dto.setTeamA(match.getTeamA().getName());
            dto.setTeamB(match.getTeamB().getName());
            dto.setScheduledAt(match.getScheduledAt());
            dto.setScoreA(match.getScoreA());
            dto.setScoreB(match.getScoreB());
            dto.setStatus(match.getStatus());
            return dto;
        }).toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/tournament/{tournamentId}/standings")
    public ResponseEntity<?> getStandings(@PathVariable Integer tournamentId) {
        List<Match> matches = matchRepository.findByTournamentId(tournamentId);

        Map<Integer, TeamStandingResponse> standings = new HashMap<>();

        for (Match match : matches) {
            if (match.getStatus() != Match.Status.COMPLETED) continue;

            int teamAId = match.getTeamA().getId();
            int teamBId = match.getTeamB().getId();

            standings.putIfAbsent(teamAId, buildEntry(match.getTeamA(), match.getTournament().getGame()));
            standings.putIfAbsent(teamBId, buildEntry(match.getTeamB(), match.getTournament().getGame()));

            TeamStandingResponse teamA = standings.get(teamAId);
            TeamStandingResponse teamB = standings.get(teamBId);

            teamA.setPlayed(teamA.getPlayed() + 1);
            teamB.setPlayed(teamB.getPlayed() + 1);

            int scoreA = match.getScoreA();
            int scoreB = match.getScoreB();

            if (scoreA > scoreB) {
                teamA.setWins(teamA.getWins() + 1);
                teamB.setLosses(teamB.getLosses() + 1);
                teamA.setPoints(teamA.getPoints() + 3);
            } else {
                teamB.setWins(teamB.getWins() + 1);
                teamA.setLosses(teamA.getLosses() + 1);
                teamB.setPoints(teamB.getPoints() + 3);
            }
        }

        List<TeamStandingResponse> sorted = standings.values().stream()
                .sorted(Comparator.comparingInt(TeamStandingResponse::getPoints).reversed()
                        .thenComparingInt(TeamStandingResponse::getWins).reversed())
                .toList();

        return ResponseEntity.ok(sorted);
    }

    private TeamStandingResponse buildEntry(Team team, String game) {
        TeamStandingResponse dto = new TeamStandingResponse();
        dto.setTeamId(team.getId());
        dto.setTeamName(team.getName());
        dto.setLogo(team.getLogo());
        dto.setRegion(team.getRegion());
        dto.setGame(game);
        dto.setPlayed(0);
        dto.setWins(0);
        dto.setLosses(0);
        dto.setPoints(0);
        return dto;
    }


}
