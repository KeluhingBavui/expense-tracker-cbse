/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.expenses;

import com.cbse.expensetracker.notifications.NotificationsService;
import com.cbse.expensetracker.shared.repository.ExpensesRepository;
import com.cbse.expensetracker.shared.entity.Expenses;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel Wan
 */

@Service
public class ExpensesServiceImpl implements ExpensesService {
    
    private final ExpensesRepository expensesRepository;
    private final NotificationsService notificationsService;
    
    @Autowired
    public ExpensesServiceImpl(ExpensesRepository expensesRepository, NotificationsService notificationsService) {
        this.expensesRepository = expensesRepository;
        this.notificationsService = notificationsService;
    }
    
    public List<Expenses> getExpensesByUserId(UUID userId) {
        return expensesRepository.findByUserId(userId);
    }
    
    public Expenses save(Expenses expense) {
        return expensesRepository.save(expense);
    }
    
    public List<Expenses> getExpensesByCategoryId(UUID categoryId) {
        return expensesRepository.findByCategoryId(categoryId);
    }
    
    public void deleteById(UUID id) {
        expensesRepository.deleteById(id);
    }

    @Scheduled(cron = "0 0 12 * * SUN") // Every Sunday at 12 PM
    public void sendWeeklyExpenseSummary() {
        LocalDate endDate = LocalDate.now().atStartOfDay().toLocalDate();
        LocalDate startDate = endDate.minusDays(7);

        // Retrieve expenses for the current week
        List<Expenses> weeklyExpenses = expensesRepository.findByDateBetween(startDate, endDate);

        // Calculate the total expenses per user
        Map<UUID, Float> userTotalExpenses = new HashMap<>();
        for (Expenses expense : weeklyExpenses) {
            UUID userId = expense.getUserId();
            userTotalExpenses.merge(userId, expense.getExpense(), Float::sum);
        }

        // Prepare and send the notifications
        for (Map.Entry<UUID, Float> entry : userTotalExpenses.entrySet()) {
            UUID userId = entry.getKey();
            float totalExpenseAmount = entry.getValue();

            String notificationMessage = "Weekly Expense Summary: Total expenses for the week - " + totalExpenseAmount;
            // Use your notification service to send the message
            notificationsService.sendNotif(userId, notificationMessage, "EXP_SUM");
        }
    }
}
