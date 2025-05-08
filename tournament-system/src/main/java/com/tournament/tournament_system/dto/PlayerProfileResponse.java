package com.tournament.tournament_system.dto;

import lombok.Data;

@Data
public class PlayerProfileResponse {
    private Integer id;
    private String username;
    private String image;
    private String gamertag;
    private String gameId;
    private Float rating;
}

