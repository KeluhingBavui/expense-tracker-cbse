package com.cbse.expensetracker.notifications;

import com.cbse.expensetracker.settings.SettingsService;
import com.cbse.expensetracker.shared.entity.Notifications;
import com.cbse.expensetracker.shared.entity.Settings;
import com.cbse.expensetracker.shared.entity.Users;
import com.cbse.expensetracker.shared.repository.NotificationsRepository;
import com.cbse.expensetracker.users.UsersService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationsServiceImpl implements NotificationsService {
    private final NotificationsRepository notificationsRepository;
    private final UsersService usersService;
    private final SettingsService settingsService;
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    public NotificationsServiceImpl(NotificationsRepository notificationsRepository, UsersService usersService, SettingsService settingsService) {
        this.notificationsRepository = notificationsRepository;
        this.usersService = usersService;
        this.settingsService = settingsService;
    }

    @Override
    public List<Notifications> getNotificationsByUserId(UUID userId) {
        // Assuming you have a Spring Data JPA repository for Notifications
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
    public void sendEmailNotif(UUID userId, String message) {
        try {
            // Retrieve user email from the database
            Users user = usersService.getUserById(userId);
            String userEmail = user.getEmail();
            System.out.println(userEmail);

            if (userEmail != null && !userEmail.isEmpty()) {
                MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);

                mimeMessageHelper.setFrom("khairinahizar@gmail.com");
                mimeMessageHelper.setTo(userEmail);
                mimeMessageHelper.setSubject("Notification from Expense Manager");
                mimeMessageHelper.setText(message, true); // Use true for HTML content

                // Send the email
                javaMailSender.send(mimeMailMessage);

            } else {
            }
        } catch (Exception e) {
            e.printStackTrace(); // Replace with proper logging
        }

    }

    @Override
    public String sendNotif(UUID userId, String message, String type) {
        try {
            Settings settings = this.settingsService.getSettingsByUserId(userId);
            List<String> notifTypesList = settings.getNotifTypes();
            Notifications savedNotification = null;

            for (String notifType : notifTypesList) {
                if (notifType.equals(type)) {
                    Notifications notification = new Notifications(userId, message, type, settings.isWebEnbld());
                    savedNotification = save(notification);
                    break;
                }
            }

            // Check if the notification is successfully saved
            if (savedNotification != null) {
                if (!settings.isWebEnbld() && !settings.isEmailEnbld()) {
                    // Send web notification
                    return "No notifications configured";
                }

                if (settings.isEmailEnbld()) {
                    // Send email notification using the saved notification
                    sendEmailNotif(savedNotification.getUserId(), savedNotification.getMessage());
                }

                return "Notification Sent";
            } else {
                return "Error creating notification";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error sending notification";
        }
    }

}
