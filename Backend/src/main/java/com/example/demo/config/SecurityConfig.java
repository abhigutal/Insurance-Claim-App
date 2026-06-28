package com.example.demo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
public class SecurityConfig {

    // BCrypt password encryption bean
    @Bean
    public PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();

    }
    // Enable CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){


        CorsConfiguration config =
                new CorsConfiguration();

        // React URL
        config.setAllowedOrigins(
                List.of("http://localhost:5174")
        );

        // Allowed HTTP methods
        config.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        // Allow headers from React
        config.setAllowedHeaders(
                List.of("*")
        );

        // Allow cookies/auth headers
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return source;

    }

    // Spring Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // allow signup and login
                        .requestMatchers(
                                "/insurances",
                                "/login"
                        )
                        .permitAll()


                        // other APIs need authentication
                        .anyRequest()
                        .permitAll()
                );

        return http.build();

    }

}