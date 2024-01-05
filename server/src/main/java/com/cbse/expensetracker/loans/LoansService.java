package com.cbse.expensetracker.loans;

import com.cbse.expensetracker.shared.entity.Loan;
import java.util.List;
import java.util.UUID;

public interface LoansService {
  List<Loan> getLoansByUserId(UUID userId);

  Loan saveLoan(Loan loan);

  void deleteLoanById(UUID loanId);

  float calculateToRepayByUserId(UUID userId);

  float calculateToReceiveByUserId(UUID userId);

  void sendNotificationForPendingLoans();
}
