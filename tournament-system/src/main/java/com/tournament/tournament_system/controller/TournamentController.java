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

    // Create Tournament
    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        return ResponseEntity.ok(tournamentRepository.save(tournament));
    }

    // Get All Tournaments
    @GetMapping
    public ResponseEntity<?> getAllTournaments() {
        return ResponseEntity.ok(tournamentRepository.findAll());
    }

    // Get a single tournament by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getTournamentById(@PathVariable Integer id) {
        return tournamentRepository.findById(id)
                .map(tournament -> ResponseEntity.ok(tournament))
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing tournament (Edit)
    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Integer id, @RequestBody Tournament updatedTournament) {
        return tournamentRepository.findById(id)
                .map(tournament -> {
                    tournament.setName(updatedTournament.getName());
                    tournament.setGame(updatedTournament.getGame());
                    tournament.setStartDate(updatedTournament.getStartDate());
                    tournament.setEndDate(updatedTournament.getEndDate());
                    tournament.setStatus(updatedTournament.getStatus());
                    // Save the updated tournament
                    Tournament savedTournament = tournamentRepository.save(tournament);
                    return ResponseEntity.ok(savedTournament);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a tournament
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
