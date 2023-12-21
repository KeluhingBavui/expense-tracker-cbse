package com.cbse.expensetracker.notifications;

import com.cbse.expensetracker.shared.entity.Notifications;

import java.util.List;
import java.util.UUID;

public interface NotificationsService {

    List<Notifications> getNotificationsByUserId(UUID userId);

    Notifications save(Notifications notification);

    void deleteById(UUID id);

    String sendEmailNotif(UUID userId, String message);

    String sendWebNotif(UUID userId, String message);
}
