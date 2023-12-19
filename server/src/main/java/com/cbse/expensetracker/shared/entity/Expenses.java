/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.shared.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author Daniel Wan
 */

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
@Table
@Getter @Setter @NoArgsConstructor
public class Expenses {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;
    private LocalDate date;
    private float expense;
    
    @Column(name = "category_id")
    private UUID categoryId;
    private String comments;
    
    @Column(name = "user_id")
    private UUID userId;
    
    public Expenses(LocalDate date, float expense, UUID categoryId, String comments, UUID userId) {
        this.date = date;
        this.expense = expense;
        this.categoryId = categoryId;
        this.comments = comments;
        this.userId = userId;
    }
}
