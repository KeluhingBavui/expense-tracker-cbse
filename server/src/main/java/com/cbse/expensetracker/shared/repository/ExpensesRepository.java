/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.shared.repository;

import com.cbse.expensetracker.shared.entity.Expenses;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Daniel Wan
 */

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, UUID> {
    List<Expenses> findByUserId(UUID userId);
    
    List<Expenses> findByCategoryId(UUID categoryId);

    List<Expenses> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
