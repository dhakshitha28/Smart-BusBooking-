# SmartBus Travel - Frontend Application

This directory houses the modern, responsive web application for **SmartBus Travel**, built with React, Vite, and custom CSS styling with a Crimson Red transit theme.

---

## 1. Why React?
- **Component-Based Architecture**: UI elements like input cards, navigation bars, and stats widgets are reusable and encapsulated.
- **Fast Client-Side Routing**: Provides seamless page transitions without full-page browser reloads, mimicking a native mobile/desktop application.
- **Declarative State Management**: React automatically updates UI elements whenever user state (such as login tokens or profile data) changes.
- **Rich Ecosystem**: Enables rapid integration of icon packs (`lucide-react`), form validators, and REST API clients.

---

## 2. Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header with logo, user chip, and logout
│   │   └── ProtectedRoute.jsx  # Route guard checking JWT & role authorization
│   ├── context/
│   │   └── AuthContext.jsx     # Global authentication state & persistence
│   ├── pages/
│   │   ├── SplashScreen.jsx    # Hero splash (2.8s timer -> /login)
│   │   ├── Login.jsx           # Clean login (email & password only)
│   │   ├── Register.jsx        # Passenger signup (enforcing ROLE_USER)
│   │   ├── user/
│   │   │   └── UserDashboard.jsx    # Passenger dashboard (ROLE_USER)
│   │   ├── driver/
│   │   │   └── DriverDashboard.jsx  # Driver captain terminal (ROLE_DRIVER)
│   │   └── admin/
│   │       └── AdminDashboard.jsx   # Fleet management headquarters (ROLE_ADMIN)
│   ├── services/
│   │   ├── api.js              # Fetch wrapper injecting Bearer token
│   │   └── authService.js      # login, register, and profile API calls
│   ├── App.jsx                 # Route definitions & layout wrapper
│   ├── index.css               # SmartBus Red Travel Theme & glassmorphism
│   └── main.jsx                # React DOM entrypoint
├── .env                        # VITE_API_BASE_URL=http://localhost:8080
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 3. Pages & Features

### A. Splash Screen (`/`)
- Displays the SmartBus Travel brand, tagline *"Travel Smart. Track Live."*, and progress indicator for 2.8 seconds.
- Automatically routes to `/login` (or dashboard if already authenticated).

### B. Login Page (`/login`)
- Fields: **Email Address** and **Password**.
- **No Role Dropdown**: Users do not select their role. The backend detects whether the credentials belong to a Passenger (`ROLE_USER`), Driver (`ROLE_DRIVER`), or Admin (`ROLE_ADMIN`).
- Upon success, saves token to `localStorage` and routes dynamically:
  - `ROLE_USER` -> `/user/dashboard`
  - `ROLE_DRIVER` -> `/driver/dashboard`
  - `ROLE_ADMIN` -> `/admin/dashboard`

### C. Register Page (`/signup`)
- Fields: **Full Name**, **Email**, **Phone**, **Password**, **Confirm Password**.
- Strictly registers passengers (`ROLE_USER`).
- Performs client-side password matching and length validation.

### D. Protected Dashboards
- `/user/dashboard`: Restricted to passengers (`ROLE_USER`).
- `/driver/dashboard`: Restricted to drivers (`ROLE_DRIVER`).
- `/admin/dashboard`: Restricted to admins (`ROLE_ADMIN`).

---

## 4. API Communication & Gateway Routing
All HTTP calls are directed to the API Gateway at `http://localhost:8080` (configured in `.env` via `VITE_API_BASE_URL`).

---

## 5. How to Run Locally

```bash
cd frontend
npm install
npm run dev
```

Visit the application at: `http://localhost:5173`
