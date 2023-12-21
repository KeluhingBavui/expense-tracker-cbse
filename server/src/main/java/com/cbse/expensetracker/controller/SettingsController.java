package com.cbse.expensetracker.controller;

import com.cbse.expensetracker.shared.entity.Settings;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cbse.expensetracker.settings.SettingsService;

import java.util.Map;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/settings")
public class SettingsController {
    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public ResponseEntity<Settings> getSettings(
            @RequestParam(name = "userId", required = true) UUID userId) {
        if (userId == null) {
            return new ResponseEntity("Please provide a userId query parameter", HttpStatus.BAD_REQUEST);
        } else {
            Settings settings = this.settingsService.getSettingsByUserId(userId);
            if (settings != null) {
                return new ResponseEntity<>(settings, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }

    @PutMapping("/updateLanguage")
    public Settings updateLanguage(@RequestParam UUID userId, @RequestParam String newLanguage) {
        return settingsService.updateLanguage(userId, newLanguage);
    }

    @PutMapping("/updateFont")
    public Settings updateFont(@RequestParam UUID userId, @RequestParam String newFont) {
        return settingsService.updateFont(userId, newFont);
    }

    @PutMapping("/updateTheme")
    public Settings updateTheme(@RequestParam UUID userId, @RequestParam String newTheme) {
        return settingsService.updateTheme(userId, newTheme);
    }

    @PutMapping("/updateEmailEnbld")
    public Settings updateEmailEnbld(@RequestParam UUID userId, @RequestParam boolean newEmailEnbld) {
        return settingsService.updateEmailEnbld(userId, newEmailEnbld);
    }

    @PutMapping("/updateWebEnbld")
    public Settings updateWebEnbld(@RequestParam UUID userId, @RequestParam boolean newWebEnbld) {
        return settingsService.updateWebEnbld(userId, newWebEnbld);
    }

    @PutMapping("/updateNotifTypes")
    public Settings updateNotifTypes(@RequestBody Map<String, Object> payload) {
        UUID userId = UUID.fromString((String) payload.get("userId"));
        List<String> newNotifTypes = (List<String>) payload.get("newNotifTypes");

        return settingsService.updateNotifTypes(userId, newNotifTypes);
    }


}
