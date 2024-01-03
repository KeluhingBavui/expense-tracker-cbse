package com.cbse.expensetracker.notifications;

import com.cbse.expensetracker.shared.entity.Notifications;
import com.cbse.expensetracker.shared.repository.NotificationsRepository;
import com.cbse.expensetracker.users.UsersService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationsServiceImpl implements NotificationsService {
    private final NotificationsRepository notificationsRepository;
    private final UsersService usersService;
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    public NotificationsServiceImpl(NotificationsRepository notificationsRepository, UsersService usersService, SimpMessagingTemplate messagingTemplate) {
        this.notificationsRepository = notificationsRepository;
        this.usersService = usersService;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public List<Notifications> getNotificationsByUserId(UUID userId) {
        return this.notificationsRepository.findByUserId(userId);
    }

    @Override
    public Notifications save(Notifications notification) {
        return notificationsRepository.save(notification);
    }

    @Override
    public void deleteById(UUID id) {
        notificationsRepository.deleteById(id);
    }

    @Override
    public String sendEmailNotif(UUID userId, String message) {
        try {
            // Retrieve user email from the database
            String userEmail = usersService.getUserById(userId).getEmail();

            if (userEmail != null && !userEmail.isEmpty()) {
                MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);

                mimeMessageHelper.setFrom("khairinahizar@gmail.com");
                mimeMessageHelper.setTo(userEmail);
                mimeMessageHelper.setSubject("Notification from Expense Manager");
                mimeMessageHelper.setText(message, true); // Use true for HTML content

                // Send the email
                javaMailSender.send(mimeMailMessage);

                return "Email Sent";
            } else {
                return "Give userId";
            }
        } catch (Exception e) {
            e.printStackTrace(); // Replace with proper logging
            return null;
        }

    }

    @Override
    public String sendWebNotif(UUID userId, String message) {
        try {
            // Construct the destination for the user-specific queue
            String destination = "/user/" + userId + "/queue/notifications";

            // Create a new Notifications entity with the provided message
            Notifications notification = new Notifications();
            notification.setMessage(message);

            // Send the notification message to the user-specific queue
            messagingTemplate.convertAndSend(destination, notification);

            return "Web Notification Sent";
        } catch (Exception e) {
            e.printStackTrace(); // Replace with proper logging
            return "Error sending web notification";
        }
    }
}
