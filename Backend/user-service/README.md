# User Service (User Profile & Account Management Microservice)

The **User Service** manages profile data, contact details, and user lookups for passengers, drivers, and administrators across the SmartBus Travel network.

---

## 1. Purpose of User Service
- **Profile Queries**: Returns user profile details for authenticated sessions via JWT Bearer tokens.
- **Data Boundary**: Separates user profile management and future driver fleet assignment data from authentication logic.
- **Scalability**: Can scale independently when passengers or drivers frequently view or update profile preferences.

---

## 2. Package & Layer Structure
```
user-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/smartbus/user/
│   │   │       ├── UserServiceApplication.java
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       │   └── UserController.java     # Endpoints: /api/users/profile, /api/users/{id}
│   │   │       ├── dto/
│   │   │       │   └── UserProfileDto.java     # Sanitized profile payload
│   │   │       ├── model/
│   │   │       │   └── User.java               # Reads from 'users' collection in MongoDB
│   │   │       ├── repository/
│   │   │       │   └── UserRepository.java     # MongoRepository interface
│   │   │       ├── security/
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   ├── JwtService.java         # Verifies token signature & extracts claims
│   │   │       │   └── SecurityConfig.java     # Configures stateless JWT validation
│   │   │       └── service/
│   │   │           └── UserService.java        # Profile retrieval & update logic
│   │   └── resources/
│   │       └── application.yml                 # Database URI, port 8082, Eureka client
│   └── test/
├── pom.xml
└── README.md
```

---

## 3. API Endpoints

### 1. Get Authenticated User Profile
- **URL**: `GET /api/users/profile`
- **Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK)**:
  ```json
  {
    "id": "6705ab...",
    "fullName": "Jane Passenger",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "role": "ROLE_USER",
    "accountStatus": "ACTIVE",
    "createdAt": "2026-10-08T10:00:00Z"
  }
  ```

---

## 4. How to Run Locally

```bash
cd backend/user-service
mvn spring-boot:run
```

- **Port**: `8082`
- **Prerequisites**:
  - MongoDB running on `mongodb://localhost:27017`
  - Service Discovery running on `http://localhost:8761`
