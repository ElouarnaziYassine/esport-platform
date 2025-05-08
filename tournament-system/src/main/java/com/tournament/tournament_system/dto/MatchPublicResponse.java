package com.tournament.tournament_system.dto;

import com.tournament.tournament_system.entity.Match;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MatchPublicResponse {
    private Integer matchId;
    private String teamA;
    private String teamB;
    private LocalDateTime scheduledAt;
    private Integer scoreA;
    private Integer scoreB;
    private Match.Status status;
}
