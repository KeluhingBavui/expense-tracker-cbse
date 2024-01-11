package com.cbse.expensetracker.shared.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbse.expensetracker.shared.entity.Categories;
import java.util.List;


public interface CategoriesRepository extends JpaRepository<Categories, UUID>{
    List<Categories> findByUserId(UUID userId);
}
