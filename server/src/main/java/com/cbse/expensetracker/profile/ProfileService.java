package com.cbse.expensetracker.profile;

import java.util.UUID;

import com.cbse.expensetracker.shared.entity.Profile;


/**
 * ProfileService
 */
public interface ProfileService {

    public Profile getProfile(UUID userId);
    
    public Profile updateProfile (UUID userId, Profile newProfile);

}