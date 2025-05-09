package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.entity.TournamentTeam;
import com.tournament.tournament_system.entity.User;
import com.tournament.tournament_system.repository.TeamRepository;
import com.tournament.tournament_system.repository.TournamentRepository;
import com.tournament.tournament_system.repository.TournamentTeamRepository;
import com.tournament.tournament_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/coach/tournaments")
@RequiredArgsConstructor
public class TeamTournamentController {

    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TournamentTeamRepository tournamentTeamRepository;

    @PostMapping("/{tournamentId}/register")
    public ResponseEntity<?> registerTeam(
            @PathVariable Integer tournamentId,
            @RequestParam Integer teamId,
            @AuthenticationPrincipal UserDetails userDetails) {

        User coach = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        if (!team.getCoach().getId().equals(coach.getId())) {
            return ResponseEntity.status(403).body("You are not the coach of this team.");
        }

        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        // Check if tournament has space for more teams (8 max)
        if (!tournament.canRegisterTeam()) {
            return ResponseEntity.status(400).body("This tournament has already reached its team limit (8 teams).");
        }

        // Check if the team is already registered
        if (tournamentTeamRepository.existsByTournamentIdAndTeamId(tournamentId, teamId)) {
            return ResponseEntity.badRequest().body("Team already registered to this tournament.");
        }

        // Register the team
        TournamentTeam registration = new TournamentTeam();
        registration.setTeam(team);
        registration.setTournament(tournament);
        registration.setRegisteredAt(LocalDate.now());

        // Update the tournament's registered teams count
        tournament.increaseRegisteredTeams();
        tournamentRepository.save(tournament);  // Save the updated tournament

        return ResponseEntity.ok(tournamentTeamRepository.save(registration));
    }

}
