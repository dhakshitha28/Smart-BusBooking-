# 06 - Complete Development & Deployment Workflow

This guide details the operational workflow for developing, testing, committing, and containerizing **SmartBus Travel**.

---

## 1. Local Development Order

```
Terminal 1: Service Discovery (Eureka)    [:8761]
Terminal 2: API Gateway                   [:8080]
Terminal 3: Auth Service                  [:8081]
Terminal 4: User Service                  [:8082]
Terminal 5: React Frontend (Vite)         [:5173]
```

### Commands:
- **Terminal 1**: `cd backend/service-discovery && mvn spring-boot:run`
- **Terminal 2**: `cd backend/api-gateway && mvn spring-boot:run`
- **Terminal 3**: `cd backend/auth-service && mvn spring-boot:run`
- **Terminal 4**: `cd backend/user-service && mvn spring-boot:run`
- **Terminal 5**: `cd frontend && npm run dev`

---

## 2. Git Workflow (Run After Local Verification)
1. `git status`
2. `git add .`
3. `git commit -m "feat(auth): complete Phase 1 authentication foundation"`
4. `git push origin main`

---

## 3. Docker Containerization Workflow
Only execute after local tests pass and code is committed:
1. `docker compose build`
2. `docker compose up -d`
3. `docker compose ps`
