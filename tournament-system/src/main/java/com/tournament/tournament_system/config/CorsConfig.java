package com.tournament.tournament_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Allow all API endpoints to be accessed
                .allowedOrigins(
                        "http://localhost:5173",   // Allow React frontend URL
                        "http://localhost:8081",
                        "exp://192.168.1.2:19000",
                        "exp://192.168.1.2:8081"// Allow Expo development URL
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow specific methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);  // Allow sending cookies (if needed)
    }
}
