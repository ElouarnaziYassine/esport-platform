package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.TournamentTeamResponse;
import com.tournament.tournament_system.entity.TournamentTeam;
import com.tournament.tournament_system.repository.TournamentRepository;
import com.tournament.tournament_system.repository.TournamentTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tournaments")
@RequiredArgsConstructor
public class TournamentAdminController {

    private final TournamentTeamRepository tournamentTeamRepository;
    private final TournamentRepository tournamentRepository;

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



}
