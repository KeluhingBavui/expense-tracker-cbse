package com.cbse.expensetracker.settings;

import com.cbse.expensetracker.shared.entity.Settings;
import com.cbse.expensetracker.shared.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SettingsServiceImpl implements SettingsService {
    private final SettingsRepository settingsRepository;

    @Autowired
    public SettingsServiceImpl(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public Settings getSettingsByUserId(UUID userId) {
        return this.settingsRepository.findByUserId(userId);
    }

    @Override
    public Settings updateLanguage(UUID userId, String newLanguage) {
        Settings existingSettings =  settingsRepository.findByUserId(userId);

        if (existingSettings != null) {
            existingSettings.setLanguage(newLanguage);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override
    public Settings updateFont(UUID userId, String newFont) {
        Settings existingSettings = settingsRepository.findByUserId(userId);

        if (existingSettings != null) {
            existingSettings.setFont(newFont);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override
    public Settings updateTheme(UUID userId, String newTheme) {
        Settings existingSettings = settingsRepository.findByUserId(userId);

        if (existingSettings != null) {
            existingSettings.setTheme(newTheme);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override 
    public Settings updateCurrency(UUID userId, String newCurrency) {
        Settings existingSettings = settingsRepository.findByUserId(userId);
        if (existingSettings != null) {
            existingSettings.setCurrency(newCurrency);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override
    public Settings updateEmailEnbld(UUID userId, boolean newEmailEnbld) {
        Settings existingSettings = settingsRepository.findByUserId(userId);

        if (existingSettings != null) {
            existingSettings.setEmailEnbld(newEmailEnbld);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override
    public Settings updateWebEnbld(UUID userId, boolean newWebEnbld) {
        Settings existingSettings = settingsRepository.findByUserId(userId);

        if (existingSettings != null) {
            existingSettings.setWebEnbld(newWebEnbld);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override
    public Settings updateNotifTypes(UUID userId, List<String> newNotifTypes) {
        Settings existingSettings = settingsRepository.findByUserId(userId);

        if (existingSettings != null) {
            existingSettings.setNotifTypes(newNotifTypes);
            return settingsRepository.save(existingSettings);
        }
        return null;
    }

    @Override
    public void deleteById(UUID id) {
        settingsRepository.deleteById(id);
    }

}
