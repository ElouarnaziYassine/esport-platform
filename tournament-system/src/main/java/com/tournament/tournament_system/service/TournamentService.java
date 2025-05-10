package com.tournament.tournament_system.service;

import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.entity.TournamentTeam;
import com.tournament.tournament_system.repository.MatchRepository;
import com.tournament.tournament_system.repository.TeamRepository;
import com.tournament.tournament_system.repository.TournamentRepository;
import com.tournament.tournament_system.repository.TournamentTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final MatchRepository matchRepository;
    private final TournamentRepository tournamentRepository;
    private final TournamentTeamRepository tournamentTeamRepository;
    private final TeamRepository teamRepository;

    public void generateBracketForTournament(Integer tournamentId) {
        // Fetch the tournament
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        // Ensure the tournament has 8 registered teams
        if (tournament.getRegisteredTeams() != 8) {
            throw new RuntimeException("Tournament is not full yet.");
        }

        // Get all registered teams for the tournament
        List<TournamentTeam> registeredTeams = tournamentTeamRepository.findAllByTournamentId(tournamentId);

        // Shuffle or randomize the list of teams
        Collections.shuffle(registeredTeams);

        // Create the initial bracket (Quarterfinals)
        createMatches(registeredTeams, tournament);
    }

    private void createMatches(List<TournamentTeam> registeredTeams, Tournament tournament) {
        for (int i = 0; i < registeredTeams.size(); i += 2) {
            Team teamA = registeredTeams.get(i).getTeam();
            Team teamB = registeredTeams.get(i + 1).getTeam();

            // Create match for the quarterfinals
            Match match = new Match();
            match.setTournament(tournament);
            match.setTeamA(teamA);
            match.setTeamB(teamB);
            match.setRoundNumber(1); // Quarterfinals
            match.setScheduledAt(LocalDateTime.now().plusDays(1)); // Placeholder time
            match.setStatus(Match.Status.SCHEDULED);
            match.setIsBracketMatch(true); // Indicates it's part of the bracket

            matchRepository.save(match);
        }
    }
}
