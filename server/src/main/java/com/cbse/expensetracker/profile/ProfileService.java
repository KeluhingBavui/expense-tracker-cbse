package com.cbse.expensetracker.profile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import com.cbse.expensetracker.shared.entity.Profile;
import com.cbse.expensetracker.shared.repository.ProfileRepository;


/**
 * ProfileService
 */
@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService (ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }

    public Profile getProfile(UUID userId){
            List<Profile> toFind = profileRepository.findByUserId(userId);
            if(toFind.size() == 0)
                throw new ErrorResponseException(HttpStatus.NOT_FOUND);
            else{
                Profile foundedProfile = toFind.getFirst();
                return foundedProfile;
            }
    }
    
    public Profile createProfile (Profile newProfile) {
        return profileRepository.save(newProfile);
    }
    
    public Profile updateProfile (UUID userId, Profile newProfile) {
            List<Profile> toBeUpdated = profileRepository.findByUserId(userId);
            if(toBeUpdated.size() == 0)
                throw new ErrorResponseException(HttpStatus.NOT_FOUND);
            else{
                Profile tempProfile = toBeUpdated.getFirst();
                tempProfile.setName(newProfile.getName());
                tempProfile.setGender(newProfile.getGender());
                tempProfile.setAge(newProfile.getAge());
                return profileRepository.save(tempProfile);
            }
    }

    public void clearProfile (UUID userId) {
        this.updateProfile(userId, new Profile());
    }
}