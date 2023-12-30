package com.cbse.expensetracker.currency;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
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

import reactor.core.publisher.Mono;

@Service
public class CurrencyServiceImpl implements CurrencyService {
    private final WebClient webClient;
    private final ExpensesService expenseService;
    private final LoansService loanService;
    private final SavingsService savingService;
    private final SettingsService settingsService;

    @Autowired
    public CurrencyServiceImpl(WebClient.Builder webClientBuilder, ExpensesService expenseService, LoansService loanService, SavingsService savingService, SettingsService settingsService) {
        this.webClient = webClientBuilder.baseUrl("https://api.freecurrencyapi.com/v1/latest").build();
        this.expenseService = expenseService;
        this.loanService = loanService;
        this.savingService = savingService;
        this.settingsService = settingsService;
    }

    @Override
    public Mono<ResponseEntity<JsonNode>> getCurrencyRates(@RequestParam UUID userId) {
        String apiKey = "fca_live_tIfyF8V7fLsCiEkccoJUf5vCVqNYlJiFVuKIxXZe";
        String baseCurrency = getUserCurrency(userId);
    
    
        return webClient.get()
        .uri(uriBuilder -> uriBuilder
            .queryParam("apikey", apiKey)
            .queryParam("base_currency", baseCurrency)
            .build())
            .retrieve()
            .bodyToMono(JsonNode.class).map(jsonNode -> new ResponseEntity<>(jsonNode, HttpStatus.OK));
    }

    @Override
    @Transactional
    public void convertUserFinancials(UUID userId, String newCurrency, Float exchangeRate) {
        convertLoans(userId, exchangeRate);
        convertSavings(userId, exchangeRate);
        convertExpenses(userId, exchangeRate);
        updateCurrencySettings(userId, newCurrency);
    }

    private String getUserCurrency(UUID userId) {
        Settings settings = this.settingsService.getSettingsByUserId(userId);
        if (settings != null) {
            return settings.getCurrency();
        } else {
            return "USD";
        }
    }

    private void convertLoans(UUID userId, float exchangeRate) {
        List <Loan> loans = loanService.getLoansByUserId(userId);
        for (Loan loan: loans) {
            float newAmount = loan.getAmount() / exchangeRate;
            loan.setAmount(newAmount);
            loanService.saveLoan(loan);
        }
    }

    private void convertSavings(UUID userId, float exchangeRate) {
        List <Saving> savings = savingService.getSavingsByUserId(userId);
        for (Saving saving: savings) {
            float savingsAmount = saving.getSaving_amount() / exchangeRate;
            float targetAmount = saving.getTarget_amount() / exchangeRate;
            saving.setSaving_amount(savingsAmount);
            saving.setTarget_amount(targetAmount);
            savingService.saveSaving(saving);
        }
    }

    private void convertExpenses(UUID userId, float exchangeRate) {
        List <Expenses> expenses = expenseService.getExpensesByUserId(userId);
        for (Expenses expense: expenses) {
            float newAmount = expense.getExpense() / exchangeRate;
            expense.setExpense(newAmount);
            expenseService.save(expense);
        }
    }

    private void updateCurrencySettings(UUID userId, String newCurrency) {
        Settings settings = settingsService.getSettingsByUserId(userId);
        if (settings != null) {
            settings.setCurrency(newCurrency);
            settingsService.updateCurrency(userId, newCurrency);
        }
    }
}