package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.entity.Tournament;
import com.tournament.tournament_system.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/tournaments")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentRepository tournamentRepository;

    // GET - Available to everyone
    @GetMapping
    public ResponseEntity<?> getAllTournaments() {
        return ResponseEntity.ok(tournamentRepository.findAll());
    }

    // POST - Admin Only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        return ResponseEntity.ok(tournamentRepository.save(tournament));
    }

    // PUT - Admin Only
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Integer id, @RequestBody Tournament updatedTournament) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    tournament.setName(updatedTournament.getName());
                    tournament.setGame(updatedTournament.getGame());
                    tournament.setStartDate(updatedTournament.getStartDate());
                    tournament.setEndDate(updatedTournament.getEndDate());
                    tournament.setStatus(updatedTournament.getStatus());
                    Tournament savedTournament = tournamentRepository.save(tournament);
                    return ResponseEntity.ok(savedTournament);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Admin Only
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTournament(@PathVariable Integer id) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    tournamentRepository.delete(tournament);
                    return ResponseEntity.noContent().build(); // Successfully deleted
                })
                .orElse(ResponseEntity.notFound().build());  // If tournament doesn't exist
    }
}
