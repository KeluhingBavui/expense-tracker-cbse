package com.cbse.expensetracker.shared.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notifications {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(name="user_id")
    private UUID userId;

    private String message;
    private String type;

    public Notifications(UUID userId, String message, String type) {
        this.userId = userId;
        this.message = message;
        this.type = type;
    }
}
