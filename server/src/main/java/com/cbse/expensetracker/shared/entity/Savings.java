package com.cbse.expensetracker.shared.entity;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "savings") // Specify the table name explicitly
@Getter
@Setter
@NoArgsConstructor
public class Savings {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    private LocalDate target_date;
    private int goal_amount;
    private int saving_amount;
    private String purpose;

    @Column(name = "user_id")
    private UUID userId;

    public Savings(LocalDate target_date, int goal_amount, int saving_amount, String purpose, UUID userId) {
        this.target_date = target_date;
        this.goal_amount = goal_amount;
        this.saving_amount = saving_amount;
        this.purpose = purpose;
        this.userId = userId;
    }
}
