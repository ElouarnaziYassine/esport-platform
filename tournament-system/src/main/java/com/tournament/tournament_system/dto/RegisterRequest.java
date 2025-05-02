package com.tournament.tournament_system.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    // role no longer needed for request
}