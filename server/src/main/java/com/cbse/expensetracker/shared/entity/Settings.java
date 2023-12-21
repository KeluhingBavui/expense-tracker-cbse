package com.cbse.expensetracker.shared.entity;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Settings {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    private String language;
    private String font;
    private String theme;
    @Column(name = "email_enbld")
    private boolean emailEnbld;
    @Column(name= "web_enbld")
    private boolean webEnbld;
    @Column(name = "notif_types")
    private List<String> notifTypes;

    public Settings(UUID userId, String language, String font, String theme, boolean webEnbld, boolean emailEnbld, List<String> notifTypes) {
        this.userId = userId;
        this.language = language;
        this.font = font;
        this.theme = theme;
        this.webEnbld = webEnbld;
        this.emailEnbld = emailEnbld;
        this.notifTypes = notifTypes;
    }

}
