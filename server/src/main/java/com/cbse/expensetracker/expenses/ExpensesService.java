/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.expenses;

import com.cbse.expensetracker.shared.entity.Expenses;
import java.util.List;
import java.util.UUID;

/**
 *
 * @author Daniel Wan
 */
public interface ExpensesService {
    List<Expenses> getExpensesByUserId(UUID userId);
    
    Expenses save(Expenses expense);
    
    List<Expenses> getExpensesByCategoryId(UUID categoryId);
    
    void deleteById(UUID id);

    double getUserOverallExpenses(UUID userId);

    double getUserExpensesInCurrentYear(UUID userId);

    double getUserExpensesInCurrentMonth(UUID userId);

    double getUserExpensesInCurrentWeek(UUID userId);

    double getUserExpensesToday(UUID userId);

    String getUserMostSpentDay(UUID userId);

    String getUserLeastSpentDay(UUID userId);

    void sendWeeklyExpenseSummary();
}
