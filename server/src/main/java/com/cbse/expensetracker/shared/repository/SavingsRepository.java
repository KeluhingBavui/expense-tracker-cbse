package com.cbse.expensetracker.shared.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbse.expensetracker.shared.entity.Savings;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, UUID> {
    List<Savings> findByUserId(UUID userId);

    List<Savings> findByUserIdAndType(UUID userId, String type);
}
