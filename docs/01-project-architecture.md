# 01 - SmartBus Travel Project Architecture

This document breaks down the overarching system architecture of **SmartBus Travel**, explaining why each component was chosen and how the system functions as a coherent whole.

---

## 1. High-Level System Architecture

SmartBus Travel is built following the **Microservices Pattern** combined with an **API Gateway & Service Registry**.

```
[ Web Browser / Client Devices ]
             │
             ▼ (HTTP / JSON)
     ┌────────────────┐
     │ React Frontend │ (Port 5173 / Port 80)
     └───────┬────────┘
             │
             ▼ (REST API via Base URL: http://localhost:8080)
     ┌────────────────┐
     │  API Gateway   │ (Spring Cloud Gateway :8080)
     └───────┬────────┘
             ├──────────────────────────────────────────┐
             ▼                                          ▼
   ┌───────────────────┐                     ┌───────────────────┐
   │   Auth Service    │ (Port 8081)         │   User Service    │ (Port 8082)
   └─────────┬─────────┘                     └─────────┬─────────┘
             │                                         │
             └───────────────────┬─────────────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Service Discovery     │ (Netflix Eureka :8761)
                     └───────────────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │   MongoDB Database    │ (Port 27017)
                     │  (Database: smartbus) │
                     └───────────────────────┘
```

---

## 2. Core Architectural Components

### A. React Single Page Application (Frontend)
- **Role**: Presents an interactive, responsive user interface.
- **Port**: `5173` (Vite local dev) or `80` (production Nginx).
- **Key Characteristics**:
  - Communicates *exclusively* with the API Gateway.
  - Never accesses individual microservices directly. This isolates the client from internal network topology.
  - Stores the JWT token in memory / client storage and attaches it to outbound HTTP request headers.

### B. API Gateway (Spring Cloud Gateway)
- **Role**: Single entry point for all client requests.
- **Port**: `8080`.
- **Responsibilities**:
  - **Reverse Proxy**: Routes incoming paths (e.g., `/api/auth/**` to `auth-service`, `/api/users/**` to `user-service`).
  - **CORS Handling**: Centrally manages Cross-Origin Resource Sharing so browser clients can communicate without browser security blocks.
  - **Load Balancing**: Works in conjunction with Service Discovery to balance traffic across multiple instances of a service.

### C. Service Discovery (Spring Cloud Netflix Eureka)
- **Role**: Dynamic phonebook/registry of all backend microservice instances.
- **Port**: `8761`.
- **Responsibilities**:
  - Microservices register themselves upon boot (providing their IP, port, and health status).
  - Constantly monitors service heartbeats. If a microservice crashes, Eureka removes it.
  - Allows services to talk to each other by name (e.g., `http://auth-service/`) rather than hardcoded IP addresses.

### D. Authentication Service (Auth Service)
- **Role**: Handles credential validation, password hashing, and token issuance.
- **Port**: `8081`.
- **Responsibilities**:
  - User signup (validation, BCrypt hashing, assigning `ROLE_USER`).
  - User login (email verification, BCrypt match, token generation).
  - Admin account seeding on first boot.
  - Token validation endpoint for downstream services.

### E. User Service
- **Role**: Manages passenger, driver, and administrator profile data.
- **Port**: `8082`.
- **Responsibilities**:
  - Retrieves profile details for authenticated users.
  - Updates contact info, profile photos, or passenger preferences.

### F. MongoDB Database
- **Role**: Primary document store.
- **Port**: `27017`.
- **Why MongoDB?**
  - Flexible schema makes handling polymorphic trip data, dynamic seat matrices, and user profiles fast and natural.
  - High read/write throughput ideal for real-time transit systems.
