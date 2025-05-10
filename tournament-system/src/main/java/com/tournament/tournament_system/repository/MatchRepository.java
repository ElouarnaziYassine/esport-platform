package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    List<Match> findByTournamentId(Integer tournamentId);
    List<Match> findByTournamentIdAndIsBracketMatch(Integer tournamentId, Boolean isBracketMatch);

}
