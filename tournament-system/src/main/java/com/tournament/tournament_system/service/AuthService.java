package com.tournament.tournament_system.service;

import com.tournament.tournament_system.dto.LoginRequest;
import com.tournament.tournament_system.dto.LoginResponse;
import com.tournament.tournament_system.dto.RegisterRequest;
import com.tournament.tournament_system.entity.Player;
import com.tournament.tournament_system.entity.User;
import com.tournament.tournament_system.repository.PlayerRepository;
import com.tournament.tournament_system.repository.UserRepository;
import com.tournament.tournament_system.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil; //

    public void register(RegisterRequest request) {
        Player player = new Player();
        player.setUsername(request.getUsername());
        player.setEmail(request.getEmail());
        player.setPassword(passwordEncoder.encode(request.getPassword()));
        player.setRole("PLAYER");

        // Optional player-specific fields
        player.setGamertag("default");
        player.setGameId("unknown");
        player.setRating(0.0f);

        playerRepository.save(player);
    }


    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new LoginResponse(token);
    }

}
