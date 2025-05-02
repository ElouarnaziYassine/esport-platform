package com.tournament.tournament_system.entity;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "players")
@Data
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Player extends User {

    private String gamertag;
    private String gameId;
    private Float rating;

    // statistics: to be implemented later
}