package com.smartbus.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * ApiGatewayApplication serves as the reverse proxy router for the SmartBus platform.
 *
 * Annotations:
 * - @SpringBootApplication: Initializes Spring Boot application context.
 * - @EnableDiscoveryClient: Registers this Gateway with Netflix Eureka to dynamically resolve microservice instances.
 */
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
