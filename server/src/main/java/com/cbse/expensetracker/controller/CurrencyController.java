package com.cbse.expensetracker.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cbse.expensetracker.controller.dto.CurrencyConversionRequest;
import com.cbse.expensetracker.currency.CurrencyService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/currency")
public class CurrencyController {
    private final CurrencyService currencyService;

    @Autowired
    public CurrencyController(CurrencyService currencyService) {
        this.currencyService = currencyService;
    }

    @GetMapping("/rates")
    public Mono<ResponseEntity<JsonNode>> getCurrencyRates(@RequestParam UUID userId) {
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
     public ResponseEntity<String> convertUserFinancials(@RequestParam UUID userId, @RequestBody CurrencyConversionRequest request) {
        String currency = request.getCurrency();
        Float rate = request.getRate();
        if (userId == null || currency == null || rate == null) {            
            return ResponseEntity.badRequest().body("Please provide userId, newCurrency, and exchangeRate in the request body.");
        } else {
            currencyService.convertUserFinancials(userId, currency, rate);
            return ResponseEntity.ok("Currency conversion successful.");
        }
    }

}