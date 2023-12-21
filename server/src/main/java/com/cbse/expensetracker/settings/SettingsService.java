package com.cbse.expensetracker.settings;

import com.cbse.expensetracker.shared.entity.Settings;

import java.util.UUID;
import java.util.List;

public interface SettingsService {
    Settings getSettingsByUserId(UUID userId);

    Settings updateLanguage(UUID userId, String newLanguage);

    Settings updateFont(UUID userId, String newFont);

    Settings updateTheme(UUID userId, String newTheme);

    Settings updateEmailEnbld(UUID userId, boolean newEmailEnbld);

    Settings updateWebEnbld(UUID userId, boolean newWebEnbld);

    Settings updateNotifTypes(UUID userId, List<String> newNotifTypes);

    void deleteById(UUID id);
}
