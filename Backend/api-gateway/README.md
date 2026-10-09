# API Gateway Microservice

The **API Gateway** acts as the single reverse proxy and traffic router for the entire SmartBus Travel platform, built using **Spring Cloud Gateway**.

---

## 1. Purpose of API Gateway
- **Single Public Entrypoint**: Outside clients (such as the React frontend) only ever connect to port `8080`.
- **Dynamic Routing**: Automatically routes `/api/auth/**` requests to `auth-service` and `/api/users/**` to `user-service`.
- **Centralized Cross-Origin Resource Sharing (CORS)**: Manages allowed origins (`http://localhost:5173`, `http://localhost:3000`), methods (`GET`, `POST`, `PUT`, `DELETE`), and headers centrally.
- **Load Balancing**: Uses Eureka service discovery (`lb://SERVICE-NAME`) to balance traffic if multiple instances of a service are running.

---

## 2. Package & Project Structure
```
api-gateway/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/smartbus/gateway/
│   │   │       ├── ApiGatewayApplication.java
│   │   │       └── config/
│   │   │           └── CorsConfig.java       # Global WebFlux CORS Filter
│   │   └── resources/
│   │       └── application.yml               # Route definitions & Eureka client
│   └── test/
├── pom.xml
└── README.md
```

---

## 3. Route Configuration
In `application.yml`:
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: auth-service-route
          uri: lb://AUTH-SERVICE
          predicates:
            - Path=/api/auth/**

        - id: user-service-route
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
```

---

## 4. Dependencies (`pom.xml`)
- `spring-cloud-starter-gateway` (reactive WebFlux-based)
- `spring-cloud-starter-netflix-eureka-client`
- `spring-boot-starter-actuator`

---

## 5. How to Run Locally

```bash
cd backend/api-gateway
mvn spring-boot:run
```

- **Port**: `8080`
- **Prerequisite**: Service Discovery (Eureka) should be running first on port `8761`.
