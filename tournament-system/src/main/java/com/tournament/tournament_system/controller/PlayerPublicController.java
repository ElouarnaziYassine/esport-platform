package com.tournament.tournament_system.controller;

import com.tournament.tournament_system.dto.PlayerProfileResponse;
import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class PlayerPublicController {

    private final PlayerRepository playerRepository;

    // Endpoint to get the authenticated user's profile
    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        return playerRepository.findByUsername(username)
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
                .orElse(ResponseEntity.status(404).body(new PlayerProfileResponse()));  // Return empty PlayerProfileResponse when not found
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestBody PlayerProfileResponse profileUpdate) {
        String currentUsername = userDetails.getUsername();

        return playerRepository.findByUsername(currentUsername)
                .map(player -> {
                    // Check if username is being changed
                    if (profileUpdate.getUsername() != null &&
                            !profileUpdate.getUsername().equals(currentUsername)) {

                        // Verify new username is available
                        Optional<Player> existingPlayer = playerRepository.findByUsername(profileUpdate.getUsername());
                        if (existingPlayer.isPresent()) {
                            return ResponseEntity.badRequest().body("Username already taken");
                        }

                        player.setUsername(profileUpdate.getUsername());
                    }

                    player.setGamertag(profileUpdate.getGamertag());
                    player.setGameId(profileUpdate.getGameId());
                    player.setRating(profileUpdate.getRating());

                    playerRepository.save(player);
                    return ResponseEntity.ok("Profile updated successfully");
                })
                .orElse(ResponseEntity.status(404).body("Player not found"));
    }
}
