package com.cbse.expensetracker.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import com.cbse.expensetracker.settings.SettingsService;
import com.cbse.expensetracker.shared.entity.Settings;
import com.fasterxml.jackson.databind.JsonNode;

import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api/v1/currency")
public class CurrencyController {
    private final WebClient webClient;
    private final SettingsService settingsService;

    public CurrencyController(WebClient.Builder webClientBuilder, SettingsService settingsService) {
        this.webClient = webClientBuilder.baseUrl("https://api.freecurrencyapi.com").build();
        this.settingsService = settingsService;
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

}
