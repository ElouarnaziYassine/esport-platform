package com.tournament.tournament_system.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateTeamRequest {
    private String name;
    private List<Integer> playerIds; // must contain exactly 5
}
