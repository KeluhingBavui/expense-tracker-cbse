package com.cbse.expensetracker.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import com.cbse.expensetracker.expenses.ExpensesService;
import com.cbse.expensetracker.loans.LoansService;
import com.cbse.expensetracker.savings.SavingsService;
import com.cbse.expensetracker.settings.SettingsService;
import com.cbse.expensetracker.shared.entity.Expenses;
import com.cbse.expensetracker.shared.entity.Loan;
import com.cbse.expensetracker.shared.entity.Saving;
import com.cbse.expensetracker.shared.entity.Settings;
import com.fasterxml.jackson.databind.JsonNode;
import com.cbse.expensetracker.shared.repository.SettingsRepository;

import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;



@RestController
@RequestMapping("/api/v1/currency")
public class CurrencyController {
    private final WebClient webClient;
    private final ExpensesService expenseService;
    private final LoansService loanService;
    private final SavingsService savingService;
    private final SettingsService settingsService;

    public CurrencyController(WebClient.Builder webClientBuilder, SettingsService settingsService, ExpensesService expenseService, LoansService loanService, SavingsService savingService) {
        this.webClient = webClientBuilder.baseUrl("https://api.freecurrencyapi.com").build();
        this.settingsService = settingsService;
        this.expenseService = expenseService;
        this.loanService = loanService;
        this.savingService = savingService;
    }

    private String getUserCurrency(UUID userId) {
        Settings settings = this.settingsService.getSettingsByUserId(userId);
        if (settings != null) {
            return settings.getCurrency();
        } else {
            return "USD";
        }
    }

    @GetMapping("/rates")
    public Mono<ResponseEntity<JsonNode>> getCurrencyRates(@RequestParam(name = "userId", required = true) UUID userId) {
    String apiKey = "fca_live_tIfyF8V7fLsCiEkccoJUf5vCVqNYlJiFVuKIxXZe";
    String baseCurrency = getUserCurrency(userId);

    
    return webClient.get()
    .uri(uriBuilder -> uriBuilder
        .path("/v1/latest")
        .queryParam("apikey", apiKey)
        .queryParam("base_currency", baseCurrency)
        .build())
        .retrieve()
        .bodyToMono(JsonNode.class).map(jsonNode -> new ResponseEntity<>(jsonNode, HttpStatus.OK));
    }

    @PutMapping("/convert") 
    public String convertUserFinancials(@RequestParam UUID userId, @RequestParam String newCurrency, @RequestParam float exchangeRate) {

        List<Loan> loans = loanService.getLoansByUserId(userId);
        List<Saving> savings = savingService.getSavingsByUserId(userId);
        List<Expenses> expenses = expenseService.getExpensesByUserId(userId);

        // convert loans 
        for (Loan loan : loans) {
            float newAmount = loan.getAmount() / exchangeRate;
            loan.setAmount(newAmount);
            loanService.saveLoan(loan);
        }

        // convert savings
        for (Saving saving : savings) {
            float savingsAmount = saving.getSaving_amount() / exchangeRate;
            float targetAmount = saving.getTarget_amount() / exchangeRate;
            saving.setSaving_amount(savingsAmount);
            saving.setTarget_amount(targetAmount);
            savingService.saveSaving(saving);
        }

        // convert expenses
        for (Expenses expense : expenses) {
            float newAmount = expense.getExpense() / exchangeRate;
            expense.setExpense(newAmount);
            expenseService.save(expense);
        }

        // update currency in settings
        Settings settings = settingsService.getSettingsByUserId(userId);
        settings.setCurrency(newCurrency);
        settingsService.updateCurrency(userId, newCurrency);

        return "success from Omar";
    }
    

}




