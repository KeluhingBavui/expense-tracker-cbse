package com.cbse.expensetracker.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cbse.expensetracker.profile.ProfileService;
import com.cbse.expensetracker.shared.entity.Profile;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("api/v1/profile")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;
    
    @GetMapping("/{userId}")
    public Profile getProfile(@PathVariable UUID userId) {
        return profileService.getProfile(userId);
    }
    
    @PatchMapping("/{userId}")
    public Profile updateProfile(@PathVariable UUID userId, @RequestBody Profile newProfile) {
        return profileService.updateProfile(userId, newProfile);
    }

}
