package com.tournament.tournament_system.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateMatchRequest {
    private Integer tournamentId;
    private Integer teamAId;
    private Integer teamBId;
    private LocalDateTime scheduledAt;
}
