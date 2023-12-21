package com.cbse.expensetracker.loans;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbse.expensetracker.shared.entity.Loan;
import com.cbse.expensetracker.shared.repository.LoansRepository;

@Service
public class LoansServiceImpl implements LoansService {

  private final LoansRepository loansRepository;

  @Autowired
  public LoansServiceImpl(LoansRepository loansRepository) {
    this.loansRepository = loansRepository;
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
}
