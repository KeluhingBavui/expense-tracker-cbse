/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.expenses;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel Wan
 */

@Service
public class ExpensesService {
    
    private final ExpensesRepository expensesRepository;
    
    @Autowired
    public ExpensesService(ExpensesRepository expensesRepository) {
        this.expensesRepository = expensesRepository;
    }
    
    public List<Expenses> getAllExpenses() {
        return expensesRepository.findAll();
    }
}
