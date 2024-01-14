package com.cbse.expensetracker.categories;

import java.util.List;
import java.util.UUID;

import com.cbse.expensetracker.shared.entity.Categories;
import com.cbse.expensetracker.shared.entity.Expenses;

public interface CategoriesService {
    
    public Categories getCategoryById (UUID categoryId);

    public List<Categories> getCategoriesByUserId (UUID userId);

    public Categories assignCategoryToUser (UUID categoryId, UUID userId);

    public UUID mostSpentCategory(List<Expenses> expenses);
        
}
