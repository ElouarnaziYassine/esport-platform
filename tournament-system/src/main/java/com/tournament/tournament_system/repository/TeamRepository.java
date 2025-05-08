package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}
