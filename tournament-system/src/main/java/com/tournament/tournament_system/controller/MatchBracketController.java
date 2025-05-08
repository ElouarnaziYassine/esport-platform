package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.entity.TournamentTeam;
import com.tournament.tournament_system.repository.MatchRepository;
import com.tournament.tournament_system.repository.TeamRepository;
import com.tournament.tournament_system.repository.TournamentRepository;
import com.tournament.tournament_system.repository.TournamentTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/admin/bracket")
@RequiredArgsConstructor
public class MatchBracketController {

    private final TournamentRepository tournamentRepository;
    private final TournamentTeamRepository tournamentTeamRepository;
    private final MatchRepository matchRepository;

    @PostMapping("/generate/{tournamentId}")
    public ResponseEntity<?> generateBracket(@PathVariable Integer tournamentId) {
        Optional<Tournament> tournamentOpt = tournamentRepository.findById(tournamentId);

        if (tournamentOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Tournament tournament = tournamentOpt.get();

        List<TournamentTeam> registeredTeams = tournamentTeamRepository.findAllByTournamentId(tournamentId);
        List<Team> teams = registeredTeams.stream().map(TournamentTeam::getTeam).toList();

        int teamCount = teams.size();

        if (!isPowerOfTwo(teamCount)) {
            return ResponseEntity.badRequest().body("Team count must be a power of 2 (e.g., 4, 8, 16). Currently: " + teamCount);
        }

        // Shuffle teams randomly
        Collections.shuffle(teams);

        List<Match> matches = new ArrayList<>();

        for (int i = 0; i < teams.size(); i += 2) {
            Match match = new Match();
            match.setTournament(tournament);
            match.setTeamA(teams.get(i));
            match.setTeamB(teams.get(i + 1));
            match.setScheduledAt(LocalDateTime.now().plusDays(1)); // default for now
            match.setStatus(Match.Status.SCHEDULED);
            match.setIsBracketMatch(true);
            match.setRoundNumber(1); // Round 1
            matches.add(match);
        }

        matchRepository.saveAll(matches);

        return ResponseEntity.ok("Bracket for round 1 generated with " + matches.size() + " matches.");
    }

    private boolean isPowerOfTwo(int n) {
        return (n > 0) && ((n & (n - 1)) == 0);
    }

    @PostMapping("/generate-next-round/{tournamentId}")
    public ResponseEntity<?> generateNextRound(@PathVariable Integer tournamentId) {
        List<Match> bracketMatches = matchRepository.findByTournamentId(tournamentId).stream()
                .filter(m -> Boolean.TRUE.equals(m.getIsBracketMatch()))
                .toList();

        if (bracketMatches.isEmpty()) {
            return ResponseEntity.badRequest().body("No bracket matches found.");
        }

        // Find the highest completed round
        int maxRound = bracketMatches.stream()
                .filter(m -> m.getStatus() == Match.Status.COMPLETED)
                .mapToInt(Match::getRoundNumber)
                .max()
                .orElse(-1);

        if (maxRound == -1) {
            return ResponseEntity.badRequest().body("No completed round found.");
        }

        // Ensure all matches in that round are completed
        List<Match> lastRoundMatches = bracketMatches.stream()
                .filter(m -> m.getRoundNumber() == maxRound)
                .toList();

        if (lastRoundMatches.stream().anyMatch(m -> m.getStatus() != Match.Status.COMPLETED)) {
            return ResponseEntity.badRequest().body("Not all matches in round " + maxRound + " are completed.");
        }

        // Collect winners
        List<Team> winners = new ArrayList<>();
        for (Match match : lastRoundMatches) {
            if (match.getScoreA() > match.getScoreB()) {
                winners.add(match.getTeamA());
            } else {
                winners.add(match.getTeamB());
            }
        }

        if (winners.size() < 2) {
            return ResponseEntity.badRequest().body("Not enough winners to generate next round.");
        }

        // Shuffle (optional for randomness)
        Collections.shuffle(winners);

        List<Match> nextRoundMatches = new ArrayList<>();

        for (int i = 0; i < winners.size(); i += 2) {
            Match newMatch = new Match();
            newMatch.setTournament(lastRoundMatches.get(0).getTournament());
            newMatch.setTeamA(winners.get(i));
            newMatch.setTeamB(winners.get(i + 1));
            newMatch.setScheduledAt(LocalDateTime.now().plusDays(1));
            newMatch.setStatus(Match.Status.SCHEDULED);
            newMatch.setIsBracketMatch(true);
            newMatch.setRoundNumber(maxRound + 1);
            nextRoundMatches.add(newMatch);
        }

        matchRepository.saveAll(nextRoundMatches);

        return ResponseEntity.ok("Next round generated with " + nextRoundMatches.size() + " matches (Round " + (maxRound + 1) + ").");
    }

}
