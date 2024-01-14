package com.cbse.expensetracker.shared.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbse.expensetracker.shared.entity.Settings;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, UUID> {
    Settings findByUserId(UUID userId);

    // updates
}
