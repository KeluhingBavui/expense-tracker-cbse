package com.cbse.expensetracker.controller.dto;

public class CurrencyConversionRequest {
    private String currency;
    private Float rate;

    public CurrencyConversionRequest(String currency, Float rate) {
        this.currency = currency;
        this.rate = rate;
    }

    public String getCurrency() {
        return this.currency;
    }

    public Float getRate() {
        return this.rate;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }
}
