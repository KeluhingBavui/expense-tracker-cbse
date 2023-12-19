/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.controller;

import com.cbse.expensetracker.expenses.ExpensesService;
import com.cbse.expensetracker.shared.entity.Expenses;
import java.util.List;
import java.util.UUID;
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

/**
 *
 * @author Daniel Wan
 */

@RestController
@RequestMapping(path = "api/v1/expenses")
public class ExpensesController {
    private final ExpensesService expensesService;
    
    @Autowired
    public ExpensesController(ExpensesService expensesService) {
        this.expensesService = expensesService;
    }
    
    @GetMapping()
    public ResponseEntity<List<Expenses>> getExpenses(
            @RequestParam(name = "userId", required = false) UUID userId, 
            @RequestParam(name = "categoryId", required = false) UUID categoryId
        ) {
        List<Expenses> expense;
        
        if (userId == null && categoryId == null) {
            return new ResponseEntity("Please provide at least userId or categoryId query parameter", HttpStatus.BAD_REQUEST);
        } else if (userId != null && categoryId != null) {
            return new ResponseEntity("Only one query parameter should be provided", HttpStatus.BAD_REQUEST);
        } else if (userId != null) {
            expense = this.expensesService.getExpensesByUserId(userId);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        } else {
            expense = this.expensesService.getExpensesByCategoryId(categoryId);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        }
    }
    
    @PostMapping()
    public Expenses createExpense(@RequestBody Expenses expense) {
        return this.expensesService.save(expense);
    }
    
    @PutMapping()
    public Expenses editExpense(@RequestBody Expenses expense) {
        return this.expensesService.save(expense);
    }
    
    @DeleteMapping()
    public void deleteById(@RequestParam("id") UUID id) {
        this.expensesService.deleteById(id);
    }
}
