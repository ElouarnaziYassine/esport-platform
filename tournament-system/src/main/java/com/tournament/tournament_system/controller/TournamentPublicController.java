package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.MatchPublicResponse;
import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class TournamentPublicController {

    private final MatchRepository matchRepository;

    @PreAuthorize("hasRole('USER')")  // Example, ensure the correct roles
    @GetMapping("/bracket/{tournamentId}")
    public ResponseEntity<List<MatchPublicResponse>> getTournamentBracket(@PathVariable Integer tournamentId) {
        // Fetch all the matches for the tournament
        List<Match> matches = matchRepository.findByTournamentId(tournamentId);

        // Map to the response DTO
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
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
