package com.cbse.expensetracker.savings;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbse.expensetracker.shared.entity.Saving;
import com.cbse.expensetracker.shared.repository.SavingsRepository;

@Service
public class SavingsServiceImpl implements SavingsService {
    private final SavingsRepository savingsRepository;

    @Autowired
    public SavingsServiceImpl(SavingsRepository savingsRepository) {
        this.savingsRepository = savingsRepository;
    }

    @Override
    public List<Saving> getSavingsByUserId(UUID userId) {
        return this.savingsRepository.findByUserId(userId);
    }

    @Override
    public Saving getSavingById(UUID id) {
        return this.savingsRepository.findById(id).orElse(null);
    }

    @Override
    public Saving saveSaving(Saving saving) {
        return this.savingsRepository.save(saving);
    }

    @Override
    public void deleteSavingById(UUID id) {
        this.savingsRepository.deleteById(id);
    }

    @Override
    public float calculateToSaveByUserId(UUID userId) {
        List<Saving> savingsList = this.savingsRepository.findByUserId(userId);
        if (savingsList != null) {
            float sum = 0;
            for (Saving saving : savingsList) {
                sum += saving.getTarget_amount() - saving.getSaving_amount();
            }
            return sum;
        }
        return 0;
    }

    @Override
    public float calculateToSaveBySavingId(UUID id) {
        Saving saving = this.savingsRepository.findById(id).orElse(null);
        if (saving != null) {
            return saving.getTarget_amount() - saving.getSaving_amount();
        }
        return 0;
    }

}
