# 05 - Microservices Architecture: Principles & Mechanics

This guide explains the foundational principles of the microservices architecture utilized in **SmartBus Travel**, comparing it with monolithic architectures and detailing the role of Service Discovery and API Gateways.

---

## 1. Monolith vs. Microservices Architecture
- **Fault Isolation**: A failure in one microservice does not crash the entire platform.
- **Independent Scaling**: High-demand services can be scaled horizontally without duplicating the entire system.
- **Clear Domain Boundaries**: Authentication, Users, Bookings, and Trips exist as isolated bounded contexts.

---

## 2. Service Discovery (Netflix Eureka)
- Runs on port `8761`.
- Services register their hostname, port, and health.
- API Gateway resolves backend services dynamically using `lb://SERVICE-NAME`.

---

## 3. Spring Cloud Gateway
- Runs on port `8080`.
- Acts as reverse proxy, routing incoming client traffic.
- Manages CORS headers centrally for the React frontend.
