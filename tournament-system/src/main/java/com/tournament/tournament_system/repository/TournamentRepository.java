package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament, Integer> {
}
