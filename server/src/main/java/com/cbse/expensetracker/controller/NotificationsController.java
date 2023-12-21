package com.cbse.expensetracker.controller;

import java.util.List;
import java.util.UUID;

import com.cbse.expensetracker.notifications.NotificationsService;
import com.cbse.expensetracker.shared.entity.Notifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cbse.expensetracker.savings.SavingsService;
import com.cbse.expensetracker.shared.entity.Saving;

@RestController
@RequestMapping(path = "api/v1/notifications")
public class NotificationsController {
    private final NotificationsService notificationsService;

    @Autowired
    public NotificationsController(NotificationsService notificationsService) {
        this.notificationsService = notificationsService;
    }

    @GetMapping()
    public ResponseEntity<List<Notifications>> getNotifications(@RequestParam(name = "userId", required = true) UUID userId) {
        List<Notifications> notifications;

        if (userId == null) {
            return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            notifications = this.notificationsService.getNotificationsByUserId(userId);
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        }
    }

    @PostMapping()
    public Notifications createNotification(@RequestBody Notifications newNotification) {
        return this.notificationsService.save(newNotification);
    }

    @DeleteMapping()
    public void deleteNotification(@RequestParam(name = "id") UUID id) {
        this.notificationsService.deleteById(id);
    }

    @PostMapping("/send-email")
    public String sendEmailNotification(
            @RequestParam("userId") UUID userId,
            @RequestParam("message") String message
    ) {
        try {
            // Use your NotificationService to send the email
            notificationsService.sendEmailNotif(userId, message);

            return "Email notification sent successfully.";
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception properly
            return "Failed to send email notification.";
        }
    }

}

