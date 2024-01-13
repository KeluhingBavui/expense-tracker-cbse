package com.cbse.expensetracker.shared.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
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

    @Column(name="web_enabled")
    private Boolean webEnabled;

    @Column(name="created_at")
    private Date createdAt;

    public Notifications(UUID userId, String message, String type, Boolean webEnabled) {
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.webEnabled = webEnabled;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }
}
