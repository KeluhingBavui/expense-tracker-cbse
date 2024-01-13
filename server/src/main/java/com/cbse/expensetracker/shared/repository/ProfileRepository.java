package com.cbse.expensetracker.shared.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbse.expensetracker.shared.entity.Profile;
import java.util.List;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, UUID>{
    List<Profile> findByUserId(UUID userId);
}
