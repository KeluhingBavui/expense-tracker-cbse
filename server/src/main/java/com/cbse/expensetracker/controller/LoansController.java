package com.cbse.expensetracker.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cbse.expensetracker.loans.LoansService;
import com.cbse.expensetracker.shared.entity.Loan;

@RestController
@RequestMapping(path = "api/v1/loans")
public class LoansController {
  private final LoansService loansService;

  @Autowired
  public LoansController(LoansService loansService) {
    this.loansService = loansService;
  }

  @GetMapping()
  public ResponseEntity<List<Loan>> getUserLoans(@RequestParam(name = "userId", required = true) UUID userId) {
    List<Loan> loans;

    if (userId == null) {
      return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
    } else {
      loans = this.loansService.getLoansByUserId(userId);
      return new ResponseEntity<>(loans, HttpStatus.OK);
    }
  }

  @PostMapping()
  public Loan createLoan(@RequestBody Loan newLoan) {
    return this.loansService.saveLoan(newLoan);
  }

  @PutMapping()
  public Loan updateLoan(@RequestBody Loan updatedLoan) {
    return this.loansService.saveLoan(updatedLoan);
  }

  @DeleteMapping()
  public void deleteLoan(@RequestParam(name = "id") UUID loanId) {
    this.loansService.deleteLoanById(loanId);
  }

  @GetMapping(path = "to-repay")
  public ResponseEntity<Float> getToRepay(@RequestParam(name = "userId", required = true) UUID userId) {
    float toRepay;

    if (userId == null) {
      return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
    } else {
      toRepay = this.loansService.calculateToRepayByUserId(userId);
      return new ResponseEntity<>(toRepay, HttpStatus.OK);
    }
  }

  @GetMapping(path = "to-receive")
  public ResponseEntity<Float> getToReceive(@RequestParam(name = "userId", required = true) UUID userId) {
    float toReceive;

    if (userId == null) {
      return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
    } else {
      toReceive = this.loansService.calculateToReceiveByUserId(userId);
      return new ResponseEntity<>(toReceive, HttpStatus.OK);
    }
  }
}
