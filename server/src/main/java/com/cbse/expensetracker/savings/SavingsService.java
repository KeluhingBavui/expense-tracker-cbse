package com.cbse.expensetracker.savings;

import java.util.List;
import java.util.UUID;

import com.cbse.expensetracker.shared.entity.Saving;

public interface SavingsService {
    List<Saving> getSavingsByUserId(UUID userId);

    Saving getSavingById(UUID id);

    Saving saveSaving(Saving saving);

    void deleteSavingById(UUID id);

    float calculateToSaveByUserId(UUID userId);

    float calculateToSaveBySavingId(UUID id);
}
