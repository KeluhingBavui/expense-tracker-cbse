package com.cbse.expensetracker.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.cbse.expensetracker.categories.CategoriesService;
import com.cbse.expensetracker.shared.entity.Categories;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/v1/categories")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CategoriesController {
    private final CategoriesService categoriesService;

    @GetMapping("/{userId}")
    public List<Categories> getCategoriesByUserId(@PathVariable UUID userId) {
        return categoriesService.getCategoriesByUserId(userId);

    }

    @PutMapping("/{id}")
    public Categories assignCategoryToUser(@PathVariable UUID id, @RequestBody UUID userId) {
        return categoriesService.assignCategoryToUser(id, userId);
    }

    @PutMapping("/expenses/{id}")
    public Categories saveExpenseToCategory(@PathVariable UUID id, @RequestBody UUID expensesId) {
        return categoriesService.saveExpenseToCategory(id, expensesId);
    }
    @PutMapping("/savings/{id}")
    public Categories saveSavingToCategory(@PathVariable UUID id, @RequestBody UUID savingsId) {
        return categoriesService.saveSavingToCategory(id, savingsId);
    }
}