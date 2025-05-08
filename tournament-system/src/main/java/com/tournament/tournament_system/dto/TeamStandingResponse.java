package com.tournament.tournament_system.dto;

import lombok.Data;

@Data
public class TeamStandingResponse {
    private Integer teamId;
    private String teamName;
    private String logo;
    private String region;
    private String game;
    private int played;
    private int wins;
    private int losses;
    private int points;
}
