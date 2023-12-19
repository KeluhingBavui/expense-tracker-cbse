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
@Table(name = "loans") // Specify the table name explicitly
@Getter
@Setter
@NoArgsConstructor
public class Loan {
  @Id
  @GeneratedValue(generator = "UUID")
  private UUID id;

  private LocalDate date;
  private float amount;
  private String type;
  private String person;
  private String status;
  private String reason;

  @Column(name = "user_id")
  private UUID userId;

  public Loan(LocalDate date, float amount, String type, String person, String status, String reason, UUID userId) {
    this.date = date;
    this.amount = amount;
    this.type = type;
    this.person = person;
    this.status = status;
    this.reason = reason;
    this.userId = userId;
  }
}
