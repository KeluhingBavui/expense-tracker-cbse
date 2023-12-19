/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.users;

import com.cbse.expensetracker.shared.entity.Users;
import java.util.List;
import java.util.UUID;

/**
 *
 * @author Daniel Wan
 */
public interface UsersService {
    public List<Users> getAllUsers();
    
    public Users getUserById(UUID userId);
}
