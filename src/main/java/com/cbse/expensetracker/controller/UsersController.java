/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cbse.expensetracker.controller;

import com.cbse.expensetracker.shared.entity.Users;
import com.cbse.expensetracker.users.UsersService;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Daniel Wan
 */

@RestController
@RequestMapping(path = "api/v1/users")
public class UsersController {
    
    private final UsersService usersService;
    
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }
    
    @GetMapping()
    public Users getUserById(@RequestParam("id") UUID id) {
        return usersService.getUserById(id);
    }
    
    @GetMapping("/all")
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }
}
