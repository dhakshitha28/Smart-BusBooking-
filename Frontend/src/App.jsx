import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { SplashScreen } from './pages/SplashScreen';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserDashboard } from './pages/user/UserDashboard';
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppLayout({ children }) {
  const location = useLocation();
  // Don't display standard navbar on the full-screen splash screen
  const isSplash = location.pathname === '/';

  return (
    <div className="app-layout">
      {!isSplash && <Navbar />}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {/* Phase 1 Routes */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Protected Passenger Route */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Driver Route */}
            <Route
              path="/driver/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_DRIVER', 'ROLE_ADMIN']}>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Route */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
