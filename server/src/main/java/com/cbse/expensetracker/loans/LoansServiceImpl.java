package com.cbse.expensetracker.loans;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.cbse.expensetracker.notifications.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import com.cbse.expensetracker.shared.entity.Loan;
import com.cbse.expensetracker.shared.repository.LoansRepository;

@Service
public class LoansServiceImpl implements LoansService {

  private final LoansRepository loansRepository;
  private final NotificationsService notificationsService;

  @Autowired
  public LoansServiceImpl(LoansRepository loansRepository, NotificationsService notificationsService) {
    this.loansRepository = loansRepository;
    this.notificationsService = notificationsService;
  }

  public List<Loan> getLoansByUserId(UUID userId) {
    return this.loansRepository.findByUserId(userId);
  }

  @Override
  public Loan saveLoan(Loan loan) {
    return this.loansRepository.save(loan);
  }

  @Override
  public void deleteLoanById(UUID id) {
    this.loansRepository.deleteById(id);
  }

  @Override
  public float calculateToRepayByUserId(UUID userId) {
    List<Loan> takenLoansList = this.loansRepository.findByUserIdAndType(userId, "Taken");
    if (takenLoansList != null) {
      float sum = 0;
      for (Loan loan : takenLoansList) {
        sum += loan.getAmount();
      }
      return sum;
    }
    return 0;
  }

  @Override
  public float calculateToReceiveByUserId(UUID userId) {
    List<Loan> givenLoansList = this.loansRepository.findByUserIdAndType(userId, "Given");
    if (givenLoansList != null) {
      float sum = 0;
      for (Loan loan : givenLoansList) {
        sum += loan.getAmount();
      }
      return sum;
    }
    return 0;
  }

  @Scheduled(cron = "0 0 12 * * ?") // Run every day at 12 PM
  public void sendNotificationForPendingLoans() {
    List<Loan> pendingLoans = loansRepository.findByStatus("Pending");

    // Filter loans that are 10 or more days old
    LocalDate tenDaysAgo = LocalDate.now().minusDays(10);
    List<Loan> overdueLoans = pendingLoans.stream()
            .filter(loan -> loan.getDate().isEqual(tenDaysAgo))
            .collect(Collectors.toList());

    for (Loan loan : overdueLoans) {
      // Send notification for each overdue loan
      String notificationMessage = "Reminder: You have a pending loan totaling " + loan.getAmount() + " waiting for action!";
      notificationsService.sendNotif(loan.getUserId(), notificationMessage, "LOAN_RMND");
    }
  }
}
