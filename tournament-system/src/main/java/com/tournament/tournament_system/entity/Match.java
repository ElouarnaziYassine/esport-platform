package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tournament_match")  // Custom table name to avoid conflict with MySQL's reserved keyword 'match'
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tournament_id", referencedColumnName = "id") // Link to Tournament entity
    private Tournament tournament;

    @ManyToOne
    @JoinColumn(name = "team_a_id", referencedColumnName = "id") // Link to Team A
    private Team teamA;

    @ManyToOne
    @JoinColumn(name = "team_b_id", referencedColumnName = "id") // Link to Team B
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
    private Boolean isBracketMatch; // To distinguish from friendly matches
}
