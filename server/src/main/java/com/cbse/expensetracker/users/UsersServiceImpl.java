/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.users;

import com.cbse.expensetracker.shared.repository.UsersRepository;
import com.cbse.expensetracker.shared.entity.Users;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel Wan
 */

@Service
public class UsersServiceImpl implements UsersService {
    private final UsersRepository usersRepository;
    
    @Autowired
    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
    
    public Users getUserById(UUID userId) {
        return usersRepository.getById(userId);
    }
}
