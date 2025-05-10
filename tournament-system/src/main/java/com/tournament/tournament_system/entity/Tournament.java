package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String game;
    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private Status status;
    private String logo;   // URL or image name

    private int maxTeams = 8;  // Set max teams to 8
    private int registeredTeams = 0;  // Number of teams currently registered

    public enum Status {
        UPCOMING,
        ONGOING,
        COMPLETED,
        CANCELLED
    }

    public boolean canRegisterTeam() {
        return registeredTeams < maxTeams;  // Check if there's space for more teams
    }

    public void increaseRegisteredTeams() {
        this.registeredTeams++;
    }
}
