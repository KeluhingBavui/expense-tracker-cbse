package com.cbse.expensetracker.shared.entity;

import java.time.LocalDate;
import java.util.UUID;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties({ "hibernateLazyInitializer" })
@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Loan {
  @Id
  @GeneratedValue(generator = "UUID")
  @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
  private UUID id;
  private LocalDate date;
  private float amount;
  private String type;
  private String person;
  private String status;
  private String reason;

  public Loan(LocalDate date, float amount, String type, String person, String status, String reason) {
    this.date = date;
    this.amount = amount;
    this.type = type;
    this.person = person;
    this.status = status;
    this.reason = reason;
  }
}
