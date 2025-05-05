package com.tournament.tournament_system.dto;

import lombok.Data;

import java.util.List;

@Data
public class TournamentTeamResponse {
    private Integer teamId;
    private String teamName;
    private String coachUsername;
    private List<String> playerUsernames;
}
