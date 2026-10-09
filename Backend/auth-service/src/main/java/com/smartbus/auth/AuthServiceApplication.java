package com.smartbus.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * AuthServiceApplication entry point for the authentication microservice.
 *
 * Annotations:
 * - @SpringBootApplication: Triggers Spring Boot component scanning across com.smartbus.auth.
 * - @EnableDiscoveryClient: Registers this service with Netflix Eureka under the name AUTH-SERVICE.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
