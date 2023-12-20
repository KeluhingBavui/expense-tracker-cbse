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
public class Saving {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    private LocalDate target_date;
    private float goal_amount;
    private float saving_amount;
    private String purpose;
    private String comment;

    @Column(name = "user_id")
    private UUID userId;

    public Saving(LocalDate target_date, float goal_amount, float saving_amount, String purpose, String comment, UUID userId) {
        this.target_date = target_date;
        this.goal_amount = goal_amount;
        this.saving_amount = saving_amount;
        this.purpose = purpose;
        this.comment = comment;
        this.userId = userId;
    }
}
