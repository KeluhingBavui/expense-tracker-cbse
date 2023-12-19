/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.expenses;

import com.cbse.expensetracker.shared.repository.ExpensesRepository;
import com.cbse.expensetracker.shared.entity.Expenses;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel Wan
 */

@Service
public class ExpensesServiceImpl implements ExpensesService {
    
    private final ExpensesRepository expensesRepository;
    
    @Autowired
    public ExpensesServiceImpl(ExpensesRepository expensesRepository) {
        this.expensesRepository = expensesRepository;
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
}
