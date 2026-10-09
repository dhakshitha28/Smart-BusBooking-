# Service Discovery (Eureka Server)

The **Service Discovery** microservice serves as the dynamic registry and directory service for the entire SmartBus Travel platform, powered by **Spring Cloud Netflix Eureka Server**.

---

## 1. Purpose of Service Discovery
In a microservices architecture, services often run on dynamic hosts and ports. Instead of hardcoding URLs (like `http://localhost:8081` for auth or `http://localhost:8082` for user), each microservice registers its location with Eureka upon startup.

Other services (primarily the API Gateway) query Eureka to resolve where microservices are hosted in real time.

---

## 2. Package & Project Structure
```
service-discovery/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/smartbus/discovery/
│   │   │       └── ServiceDiscoveryApplication.java  # @EnableEurekaServer
│   │   └── resources/
│   │       └── application.yml                       # Eureka server config
│   └── test/
├── pom.xml                                           # Maven dependencies
└── README.md
```

---

## 3. Key Annotations & Code
- `@EnableEurekaServer`: Attached to `ServiceDiscoveryApplication.java`. It tells Spring Boot to initialize Eureka's registry engine and embedded dashboard.
- In `application.yml`:
  ```yaml
  server:
    port: 8761
  eureka:
    client:
      register-with-eureka: false  # The server does not register with itself
      fetch-registry: false        # The server does not need to fetch the registry
  ```

---

## 4. Dependencies (`pom.xml`)
- `spring-cloud-starter-netflix-eureka-server`
- `spring-boot-starter-actuator`

---

## 5. How to Run Locally

```bash
cd backend/service-discovery
mvn spring-boot:run
```

- **Port**: `8761`
- **Eureka Web Dashboard**: Open [http://localhost:8761](http://localhost:8761) in any browser to see all currently connected microservices and their health status.

---

## 6. What Happens if this Service Stops?
- Services will log reconnection warnings as they fail to send their 30-second heartbeat.
- The API Gateway will not be able to resolve service names (e.g. `lb://AUTH-SERVICE`), causing routed requests to fail with HTTP `503 Service Unavailable`.
