package com.tournament.tournament_system.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BracketMatchResponse {
    private Integer matchId;
    private Integer roundNumber;
    private String teamAName;
    private String teamBName;
    private Integer scoreA;
    private Integer scoreB;
    private String status;
    private LocalDateTime scheduledAt;
}
