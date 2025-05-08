package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Tournament tournament;

    @ManyToOne
    @JoinColumn(name = "team_a_id")
    private Team teamA;

    @ManyToOne
    @JoinColumn(name = "team_b_id")
    private Team teamB;

    private LocalDateTime scheduledAt;

    private Integer scoreA;
    private Integer scoreB;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        SCHEDULED,
        COMPLETED,
        CANCELLED
    }

    private Integer roundNumber; // 1 = QF, 2 = SF, 3 = Final
    private Boolean isBracketMatch; // distinguish from friendly matches

}
