package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Match;
import com.tournament.tournament_system.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByCoachId(Integer coachId);
    List<Team> findAllByOrderByRatingDesc();

}
