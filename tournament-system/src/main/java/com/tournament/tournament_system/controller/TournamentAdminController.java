package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.CreateMatchRequest;
import com.tournament.tournament_system.dto.TournamentTeamResponse;
import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.entity.TournamentTeam;
import com.tournament.tournament_system.repository.TournamentRepository;
import com.tournament.tournament_system.repository.TournamentTeamRepository;
import com.tournament.tournament_system.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tournaments")
@RequiredArgsConstructor
public class TournamentAdminController {

    private final TournamentTeamRepository tournamentTeamRepository;
    private final TournamentRepository tournamentRepository;
    private final TournamentService tournamentService;


    @GetMapping("/{tournamentId}/teams")
    public ResponseEntity<?> getTeamsForTournament(@PathVariable Integer tournamentId) {
        if (!tournamentRepository.existsById(tournamentId)) {
            return ResponseEntity.notFound().build();
        }

        List<TournamentTeam> registered = tournamentTeamRepository.findAllByTournamentId(tournamentId);

        List<TournamentTeamResponse> result = registered.stream().map(reg -> {
            TournamentTeamResponse dto = new TournamentTeamResponse();
            dto.setTeamId(reg.getTeam().getId());
            dto.setTeamName(reg.getTeam().getName());
            dto.setCoachUsername(reg.getTeam().getCoach().getUsername());
            dto.setPlayerUsernames(
                    reg.getTeam().getPlayers().stream().map(player -> player.getUsername()).toList()
            );
            return dto;
        }).toList();

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{tournamentId}/teams/{teamId}")
    public ResponseEntity<?> removeTeamFromTournament(@PathVariable Integer tournamentId,
                                                      @PathVariable Integer teamId) {
        List<TournamentTeam> links = tournamentTeamRepository
                .findAllByTournamentId(tournamentId)
                .stream()
                .filter(reg -> reg.getTeam().getId().equals(teamId))
                .toList();

        if (links.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        tournamentTeamRepository.deleteAll(links);
        return ResponseEntity.ok("Team removed from tournament.");
    }

    @PostMapping("/{tournamentId}/generate-bracket")
    public ResponseEntity<?> generateBracket(@PathVariable Integer tournamentId) {
        try {
            tournamentService.generateBracketForTournament(tournamentId);
            return ResponseEntity.ok("Bracket generated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }




}
