package com.cbse.expensetracker.shared.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbse.expensetracker.shared.entity.Loan;

@Repository
public interface LoansRepository extends JpaRepository<Loan, UUID> {
  List<Loan> findByUserId(UUID userId);

  List<Loan> findByUserIdAndType(UUID userId, String type);

  List<Loan> findByStatus(String status);
}
