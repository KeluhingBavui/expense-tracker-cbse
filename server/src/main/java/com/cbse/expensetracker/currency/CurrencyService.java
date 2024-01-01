package com.cbse.expensetracker.currency;

import java.util.UUID;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.JsonNode;

import reactor.core.publisher.Mono;

public interface CurrencyService {

    Mono <ResponseEntity<JsonNode>> getCurrencyRates(UUID userId);

    void convertUserFinancials(UUID userId, String newCurrency, Float exchangeRate);
}