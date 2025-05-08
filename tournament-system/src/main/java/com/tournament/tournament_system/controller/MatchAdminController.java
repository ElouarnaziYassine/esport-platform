package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.CreateMatchRequest;
import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.repository.MatchRepository;
import com.tournament.tournament_system.repository.TeamRepository;
import com.tournament.tournament_system.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/matches")
@RequiredArgsConstructor
public class MatchAdminController {

    private final MatchRepository matchRepository;
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;

    // 🔹 1. Create a match
    @PostMapping
    public ResponseEntity<?> createMatch(@RequestBody CreateMatchRequest request) {
        Tournament tournament = tournamentRepository.findById(request.getTournamentId())
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        Team teamA = teamRepository.findById(request.getTeamAId())
                .orElseThrow(() -> new RuntimeException("Team A not found"));

        Team teamB = teamRepository.findById(request.getTeamBId())
                .orElseThrow(() -> new RuntimeException("Team B not found"));

        if (teamA.getId().equals(teamB.getId())) {
            return ResponseEntity.badRequest().body("Teams must be different.");
        }

        Match match = new Match();
        match.setTournament(tournament);
        match.setTeamA(teamA);
        match.setTeamB(teamB);
        match.setScheduledAt(request.getScheduledAt());
        match.setStatus(Match.Status.SCHEDULED);
        match.setScoreA(null);
        match.setScoreB(null);

        return ResponseEntity.ok(matchRepository.save(match));
    }

    // 🔹 2. List matches by tournament
    @GetMapping("/tournament/{tournamentId}")
    public ResponseEntity<List<Match>> getMatchesByTournament(@PathVariable Integer tournamentId) {
        List<Match> matches = matchRepository.findByTournamentId(tournamentId);
        return ResponseEntity.ok(matches);
    }

    // 🔹 3. Update match result (score and status)
    @PutMapping("/{matchId}/result")
    public ResponseEntity<?> updateMatchResult(@PathVariable Integer matchId,
                                               @RequestParam Integer scoreA,
                                               @RequestParam Integer scoreB) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        match.setScoreA(scoreA);
        match.setScoreB(scoreB);
        match.setStatus(Match.Status.COMPLETED);

        return ResponseEntity.ok(matchRepository.save(match));
    }

    // 🔹 4. Delete a match (optional)
    @DeleteMapping("/{matchId}")
    public ResponseEntity<?> deleteMatch(@PathVariable Integer matchId) {
        if (!matchRepository.existsById(matchId)) {
            return ResponseEntity.notFound().build();
        }

        matchRepository.deleteById(matchId);
        return ResponseEntity.ok("Match deleted.");
    }
}
