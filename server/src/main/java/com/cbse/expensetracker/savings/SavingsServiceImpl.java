package com.cbse.expensetracker.savings;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import com.cbse.expensetracker.notifications.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import com.cbse.expensetracker.shared.entity.Saving;
import com.cbse.expensetracker.shared.repository.SavingsRepository;

@Service
public class SavingsServiceImpl implements SavingsService {
    private final SavingsRepository savingsRepository;
    private final NotificationsService notificationsService;

    @Autowired
    public SavingsServiceImpl(SavingsRepository savingsRepository, NotificationsService notificationsService) {
        this.savingsRepository = savingsRepository;
        this.notificationsService = notificationsService;
    }

    @Override
    public List<Saving> getSavingsByUserId(UUID userId) {
        return this.savingsRepository.findByUserId(userId);
    }

    @Override
    public Saving getSavingById(UUID id) {
        return this.savingsRepository.findById(id).orElse(null);
    }

    @Override
    public Saving saveSaving(Saving saving) {
        return this.savingsRepository.save(saving);
    }

    @Override
    public void deleteSavingById(UUID id) {
        this.savingsRepository.deleteById(id);
    }

    @Override
    public float calculateToSaveByUserId(UUID userId) {
        List<Saving> savingsList = this.savingsRepository.findByUserId(userId);
        if (savingsList != null) {
            float sum = 0;
            for (Saving saving : savingsList) {
                sum += saving.getTarget_amount() - saving.getSaving_amount();
            }
            return sum;
        }
        return 0;
    }

    @Override
    public float calculateToSaveBySavingId(UUID id) {
        Saving saving = this.savingsRepository.findById(id).orElse(null);
        if (saving != null) {
            return saving.getTarget_amount() - saving.getSaving_amount();
        }
        return 0;
    }

    // Schedule the task to run daily at a specific time
    @Scheduled(fixedDelay = 6000) // Every day at 12 PM
    public void sendNotificationForUpcomingSavings() {
        System.out.println("sendNote method invoked.");
        List<Saving> savingsList = this.savingsRepository.findAll();

        for (Saving saving : savingsList) {
            LocalDate targetDate = saving.getTarget_date();
            LocalDate today = LocalDate.now();
            long daysUntilTarget = ChronoUnit.DAYS.between(today, targetDate);

            // Check if it's 3 days before the target date and the savings to save amount is not zero
            if (daysUntilTarget == 3 && calculateToSaveBySavingId(saving.getId()) > 0) {
                // Send notification
                String notificationMessage = "Reminder: You have a savings goal coming up in 3 days. Don't forget to save!";
                notificationsService.sendNotif(saving.getUserId(), notificationMessage, "SAVINGS_REMINDER");
            }
            String notificationMessage = "Reminder: You have a savings goal coming up in 3 days. Don't forget to save!";
            notificationsService.sendNotif(saving.getUserId(), notificationMessage, "LOAN_CMPLTD");
        }
    }

}
