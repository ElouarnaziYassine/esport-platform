package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.TournamentTeam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TournamentTeamRepository extends JpaRepository<TournamentTeam, Integer> {
    boolean existsByTournamentIdAndTeamId(Integer tournamentId, Integer teamId);
    List<TournamentTeam> findAllByTournamentId(Integer tournamentId);

}
