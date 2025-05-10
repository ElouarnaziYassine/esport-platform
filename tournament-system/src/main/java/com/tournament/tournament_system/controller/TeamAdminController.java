package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.entity.Team;
import com.tournament.tournament_system.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/teams")
@RequiredArgsConstructor
public class TeamAdminController {

    private final TeamRepository teamRepository;

    // 1. Get all teams
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        return ResponseEntity.ok(teams);
    }

    // 2. Delete a team by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Integer id) {
        if (!teamRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        teamRepository.deleteById(id);
        return ResponseEntity.ok("Team deleted successfully.");
    }
}
