package com.cbse.expensetracker.shared.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Categories {
  @Id
  @GeneratedValue(generator = "UUID")
  private UUID id;
  private String name;
      
  @Column(name = "user_id")
  private UUID userId;

  @Column(name = "expenses_id")
  private List<UUID> expensesId;

  @Column(name = "savings_id")
  private List<UUID> savingsId;

  public Categories(
    UUID id,
    String name,
    UUID userId,
    List<UUID> expensesId,
    List<UUID> savingsId
  ) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.expensesId = expensesId;
    this.savingsId = savingsId;
  }
}
