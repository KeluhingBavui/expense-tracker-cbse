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

import com.cbse.expensetracker.savings.SavingsService;
import com.cbse.expensetracker.shared.entity.Saving;

@RestController
@RequestMapping(path = "api/v1/savings")
public class SavingsController {
    private final SavingsService savingsService;

    @Autowired
    public SavingsController(SavingsService savingsService) {
        this.savingsService = savingsService;
    }

    @GetMapping()
    public ResponseEntity<List<Saving>> getUserSavings(@RequestParam(name = "userId", required = true) UUID userId) {
        List<Saving> savings;

        if (userId == null) {
            return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            savings = this.savingsService.getSavingsByUserId(userId);
            return new ResponseEntity<>(savings, HttpStatus.OK);
        }
    }

    @GetMapping()
    public ResponseEntity<Saving> getUserSavingById(@RequestParam(name = "savingId", required = true) UUID savingId) {
        Saving saving;

        if (savingId == null) {
            return new ResponseEntity("Please provide a savingId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            saving = this.savingsService.getSavingById(savingId);
            return new ResponseEntity<>(saving, HttpStatus.OK);
        }
    }

    @PostMapping()
    public Saving createSaving(@RequestBody Saving newSaving) {
        return this.savingsService.saveSaving(newSaving);
    }

    @PutMapping()
    public Saving updateSaving(@RequestBody Saving updatedSaving) {
        return this.savingsService.saveSaving(updatedSaving);
    }

    @DeleteMapping()
    public void deleteSaving(@RequestParam(name = "id") UUID savingId) {
        this.savingsService.deleteSavingById(savingId);
    }

    @GetMapping(path = "total-to-save")
    public ResponseEntity<Float> getTotalToSave(@RequestParam(name = "userId", required = true) UUID userId) {
        float totalToSave;

        if (userId == null) {
            return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            totalToSave = this.savingsService.calculateToSaveByUserId(userId);
            return new ResponseEntity<>(totalToSave, HttpStatus.OK);
        }
    }

    @GetMapping(path = "to-save")
    public ResponseEntity<Float> getToSave(@RequestParam(name = "savingId", required = true) UUID savingId) {
        float toSave;

        if (savingId == null) {
            return new ResponseEntity("Please provide a savingId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            toSave = this.savingsService.calculateToSaveBySavingId(savingId);
            return new ResponseEntity<>(toSave, HttpStatus.OK);
        }
    }
}
