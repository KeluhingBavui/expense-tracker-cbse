package com.cbse.expensetracker.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.cbse.expensetracker.interceptor.AuthInterceptor;

@Configuration
public class WebClientConfig implements WebMvcConfigurer{

    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> supportedPaths = new ArrayList<String>();
        supportedPaths.add("/api/v1/profile/*");
        registry.addInterceptor(new AuthInterceptor()).addPathPatterns(supportedPaths);
    }
}
