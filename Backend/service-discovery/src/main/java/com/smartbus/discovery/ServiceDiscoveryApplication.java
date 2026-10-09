package com.smartbus.discovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * ServiceDiscoveryApplication serves as the Eureka Service Registry.
 *
 * Annotations:
 * - @SpringBootApplication: Triggers component scanning, autoconfiguration, and property support.
 * - @EnableEurekaServer: Activates the Netflix Eureka Server registry engine and web dashboard.
 */
@SpringBootApplication
@EnableEurekaServer
public class ServiceDiscoveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceDiscoveryApplication.class, args);
    }
}
