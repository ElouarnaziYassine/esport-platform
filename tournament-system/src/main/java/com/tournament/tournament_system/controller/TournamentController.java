package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/tournaments")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentRepository tournamentRepository;

    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        return ResponseEntity.ok(tournamentRepository.save(tournament));
    }

    @GetMapping
    public ResponseEntity<?> getAllTournaments() {
        return ResponseEntity.ok(tournamentRepository.findAll());
    }
}
