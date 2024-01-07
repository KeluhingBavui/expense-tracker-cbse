package com.cbse.expensetracker.shared.repository;

import com.cbse.expensetracker.shared.entity.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;

public interface NotificationsRepository extends JpaRepository<Notifications, UUID> {
    List<Notifications> findByUserId(UUID userId);
}
