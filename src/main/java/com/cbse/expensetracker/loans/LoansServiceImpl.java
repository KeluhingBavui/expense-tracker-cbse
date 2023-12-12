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
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getToRepay'");
  }

  @Override
  public float calculateToReceiveByUserId(UUID userId) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getToReceive'");
  }

}
