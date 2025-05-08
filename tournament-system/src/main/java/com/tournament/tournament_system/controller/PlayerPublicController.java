package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.PlayerProfileResponse;
import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerPublicController {

    private final PlayerRepository playerRepository;

    @GetMapping("/{id}/profile")
    public ResponseEntity<?> getPlayerProfile(@PathVariable Integer id) {
        return playerRepository.findById(id)
                .map(player -> {
                    PlayerProfileResponse dto = new PlayerProfileResponse();
                    dto.setId(player.getId());
                    dto.setUsername(player.getUsername());
                    dto.setImage(player.getImage());
                    dto.setGamertag(player.getGamertag());
                    dto.setGameId(player.getGameId());
                    dto.setRating(player.getRating());
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
