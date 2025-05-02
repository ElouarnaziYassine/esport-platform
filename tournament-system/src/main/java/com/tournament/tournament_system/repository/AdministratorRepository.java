package com.tournament.tournament_system.repository;

import com.tournament.tournament_system.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
}