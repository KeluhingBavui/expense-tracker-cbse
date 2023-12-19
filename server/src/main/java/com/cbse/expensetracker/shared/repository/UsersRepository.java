/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.shared.repository;

import com.cbse.expensetracker.shared.entity.Users;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Daniel Wan
 */
public interface UsersRepository extends JpaRepository<Users, UUID> {
    
}
