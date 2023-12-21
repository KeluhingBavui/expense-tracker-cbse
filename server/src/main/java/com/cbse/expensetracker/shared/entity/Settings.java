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
    @Column(name = "email_enbld")
    private boolean emailEnbld;
    @Column(name= "web_enbld")
    private boolean webEnbld;
    @Column(name = "notif_types")
    private List<String> notifTypes;

    private String theme;


    public Settings(UUID userId, String language, String font, String theme, boolean webEnbld, boolean emailEnbld, List<String> notifTypes) {
        this.userId = userId;
        this.language = language;
        this.font = font;
        this.theme = theme;
        this.webEnbld = webEnbld;
        this.emailEnbld = emailEnbld;
        this.notifTypes = notifTypes;
    }

    public void setLanguage(String newLanguage) {
        this.language = newLanguage;
    }

    public void setFont(String newFont) {
        this.font = newFont;
    }

    public void setTheme(String newTheme) {
        this.theme = newTheme;
    }

    public void setWebEnbld(boolean newWebEnbld) {
        this.webEnbld = newWebEnbld;
    }

    public void setEmailEnbld(boolean newEmailEnbld) {
        this.emailEnbld = newEmailEnbld;
    }

    public void setNotifTypes(List<String> newNotifTypes) {
        this.notifTypes = newNotifTypes;
    }
}
