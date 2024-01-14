package com.cbse.expensetracker.categories;
import java.util.List;
import java.util.UUID;
import com.cbse.expensetracker.shared.entity.Categories;
import com.cbse.expensetracker.shared.entity.Expenses;

public interface CategoriesService {
    Categories getCategoryById (UUID categoryId);
    List<Categories> getCategoriesByUserId (UUID userId);
    UUID mostSpentCategory(List<Expenses> expenses);
}
