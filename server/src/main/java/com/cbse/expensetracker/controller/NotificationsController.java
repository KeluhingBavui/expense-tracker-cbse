package com.cbse.expensetracker.controller;

import java.util.List;
import java.util.UUID;

import com.cbse.expensetracker.notifications.NotificationsService;
import com.cbse.expensetracker.shared.entity.Notifications;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/notifications")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping
    public ResponseEntity<String> sendNotification(@RequestBody Notifications request) {
        try {
            String result = notificationsService.sendNotif(request.getUserId(), request.getMessage(), request.getType());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception properly
            return new ResponseEntity<>("Error sending notification", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping()
    public void deleteNotification(@RequestParam(name = "id") UUID id) {
        this.notificationsService.deleteById(id);
    }

}

