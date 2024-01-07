package com.cbse.expensetracker.controller;

import java.util.List;
import java.util.UUID;

import com.cbse.expensetracker.notifications.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/savings")
public class SavingsController {
    private final SavingsService savingsService;
    private final NotificationsService notificationsService;

    @Autowired
    public SavingsController(SavingsService savingsService, NotificationsService notificationsService) {
        this.savingsService = savingsService;
        this.notificationsService = notificationsService;
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

    @GetMapping(path = "get-a-saving")
    public ResponseEntity<Saving> getUserSavingById(@RequestParam(name = "id", required = true) UUID id) {
        Saving saving;

        if (id == null) {
            return new ResponseEntity("Please provide a savingId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            saving = this.savingsService.getSavingById(id);
            return new ResponseEntity<>(saving, HttpStatus.OK);
        }
    }

    @PostMapping()
    public Saving createSaving(@RequestBody Saving newSaving) {
        return this.savingsService.saveSaving(newSaving);
    }

    @PutMapping()
    public ResponseEntity<Saving> updateSaving(@RequestBody Saving updatedSaving) {
        Saving savedSaving = this.savingsService.saveSaving(updatedSaving);
        // Check if the total to save is now zero
        float totalToSave = this.savingsService.calculateToSaveByUserId(savedSaving.getUserId());
        if (totalToSave == 0.0) {
            // Send notification
            String notificationMessage = "Congratulations! You have achieved your savings goal for " + savedSaving.getPurpose() + " totaling " + savedSaving.getTarget_amount();
            notificationsService.sendNotif(savedSaving.getUserId(), notificationMessage, "SAV_CMPLTD");
        }
        return new ResponseEntity<>(savedSaving, HttpStatus.OK);
    }

    @DeleteMapping()
    public void deleteSaving(@RequestParam(name = "id") UUID id) {
        this.savingsService.deleteSavingById(id);
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
    public ResponseEntity<Float> getToSave(@RequestParam(name = "id", required = true) UUID id) {
        float toSave;

        if (id == null) {
            return new ResponseEntity("Please provide a savingId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            toSave = this.savingsService.calculateToSaveBySavingId(id);
            return new ResponseEntity<>(toSave, HttpStatus.OK);
        }
    }
}
