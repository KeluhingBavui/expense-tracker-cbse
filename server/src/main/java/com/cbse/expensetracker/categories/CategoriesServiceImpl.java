package com.cbse.expensetracker.categories;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import com.cbse.expensetracker.shared.entity.Categories;
import com.cbse.expensetracker.shared.entity.Expenses;
import com.cbse.expensetracker.shared.repository.CategoriesRepository;

@Service
public class CategoriesServiceImpl {
    private final CategoriesRepository categoriesRepository;

    @Autowired
    public CategoriesServiceImpl (CategoriesRepository categoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    private Categories checkExist (UUID categoryId) {
        Optional<Categories> toSaveCategory = categoriesRepository.findById(categoryId);
        if(toSaveCategory.isEmpty())
            throw new ErrorResponseException(HttpStatus.NOT_FOUND);
        return toSaveCategory.get();
    }
    
    public Categories getCategoryById (UUID categoryId) {
        Categories foundCategory = checkExist(categoryId);
        return foundCategory;
    }
    public List<Categories> getCategoriesByUserId (UUID userId){

            List<Categories> toFind = categoriesRepository.findByUserId(userId);
            if(toFind.size() == 0)
                throw new ErrorResponseException(HttpStatus.NOT_FOUND);
            else
                return toFind;
    }

    public Categories assignCategoryToUser (UUID categoryId, UUID userId) {
        Categories foundCategory = checkExist(categoryId);
        foundCategory.setUserId(userId);
        return categoriesRepository.save(foundCategory);
    }

    public UUID mostSpentCategory(List<Expenses> expenses) {
        if (expenses.isEmpty()) {
           throw new ErrorResponseException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        // Mapping categoryName to total expenses
        Map<UUID, Double> categoryTotals = expenses.stream()
            .collect(Collectors.groupingBy(
                Expenses::getCategoryId,
                Collectors.summingDouble(Expenses::getExpense)));

        // Find the category with the maximum total expense
        return Collections.max(categoryTotals.entrySet(), Map.Entry.comparingByValue())
                          .getKey();
    }
    // public Categories saveExpenseToCategory (UUID categoryId, UUID expensesId){
    //     Categories foundCategory = checkExist(categoryId);
    //     List<UUID> existingExpensesId = foundCategory.getExpensesId();
    //     // Append new expensesId into pre existing list of expensesId
    //     existingExpensesId.add(expensesId);
    //     foundCategory.setExpensesId(existingExpensesId);
    //     return categoriesRepository.save(foundCategory);

    // }
    // public Categories saveSavingToCategory (UUID categoryId, UUID savingsId){
    //     Categories foundCategory = checkExist(categoryId);
    //     List<UUID> existingSavingsId = foundCategory.getSavingsId();
    //     existingSavingsId.add(savingsId);
    //     foundCategory.setSavingsId(existingSavingsId);
    //     return categoriesRepository.save(foundCategory);
    // }
}
