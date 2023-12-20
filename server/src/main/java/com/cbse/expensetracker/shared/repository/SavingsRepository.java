package com.cbse.expensetracker.shared.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbse.expensetracker.shared.entity.Saving;

@Repository
public interface SavingsRepository extends JpaRepository<Saving, UUID> {
    List<Saving> findByUserId(UUID userId);

    List<Saving> findBySavingId(UUID savingId);
}
