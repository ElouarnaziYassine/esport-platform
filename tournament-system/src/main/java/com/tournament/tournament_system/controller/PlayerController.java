package com.tournament.tournament_system.controller;


import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerRepository playerRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Integer id) {
        Optional<Player> player = playerRepository.findById(id);
        return player.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Integer id, @RequestBody Player updatedPlayer) {
        return playerRepository.findById(id).map(existing -> {
            existing.setGamertag(updatedPlayer.getGamertag());
            existing.setGameId(updatedPlayer.getGameId());
            existing.setRating(updatedPlayer.getRating());
            return ResponseEntity.ok(playerRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }


}

