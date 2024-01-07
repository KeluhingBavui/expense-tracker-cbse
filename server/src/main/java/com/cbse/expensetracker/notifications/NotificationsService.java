package com.cbse.expensetracker.notifications;

import com.cbse.expensetracker.shared.entity.Notifications;

import java.util.List;
import java.util.UUID;

public interface NotificationsService {

    List<Notifications> getNotificationsByUserId(UUID userId);

    Notifications save(Notifications notification);

    void deleteById(UUID id);

    void sendEmailNotif(UUID userId, String message);

    String sendNotif(UUID userId, String message, String type);
}
