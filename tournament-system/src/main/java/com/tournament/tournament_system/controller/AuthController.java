package com.tournament.tournament_system.controller;


import com.tournament.tournament_system.dto.LoginRequest;
import com.tournament.tournament_system.dto.LoginResponse;
import com.tournament.tournament_system.dto.RegisterRequest;
import com.tournament.tournament_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Player registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        System.out.println("Login hit");
        return ResponseEntity.ok(authService.login(request));
    }
}
