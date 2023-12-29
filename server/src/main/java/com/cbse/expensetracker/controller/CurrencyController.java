package com.cbse.expensetracker.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cbse.expensetracker.currency.CurrencyService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/currency")
public class CurrencyController {
    private final CurrencyService currencyService;

    @Autowired
    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @GetMapping("/rates")
    public Mono < ResponseEntity < JsonNode >> getCurrencyRates(@RequestParam UUID userId) {
        if (userId == null) {
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode node = mapper.createObjectNode();
            node.put("error", "You must be authenticated to access this route");
            return Mono.just(ResponseEntity.badRequest().body(node));
        } else {
            return currencyService.getCurrencyRates(userId);
        }
    }
    @PutMapping("/convert")
    public ResponseEntity < String > convertUserFinancials(@RequestParam UUID userId, @RequestParam String newCurrency, @RequestParam Float exchangeRate) {
        if (userId == null || newCurrency == null || exchangeRate == null) {
            return ResponseEntity.badRequest().body("Please provide userId, newCurrency, and exchangeRate query parameters.");
        } else {
            currencyService.convertUserFinancials(userId, newCurrency, exchangeRate);
            return ResponseEntity.ok("Currency conversion successful.");
        }
    }

}