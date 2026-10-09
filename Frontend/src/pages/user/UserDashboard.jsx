import React, { useEffect, useState } from 'react';
import { Ticket, MapPin, Calendar, Clock, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export function UserDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await authService.getProfile();
        setProfile(data);
      } catch (err) {
        console.warn('Could not load profile from user-service:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <div className="dashboard-badge role-tag ROLE_USER">
          <UserCheck size={14} />
          <span>Passenger Portal</span>
        </div>
        <h1 className="dashboard-title">
          Welcome, {user?.fullName || profile?.fullName || 'Traveler'}!
        </h1>
        <p className="dashboard-subtitle">
          Your smart transit hub. Book journeys, view your reservations, and track your buses in real time.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Ticket size={24} />
          </div>
          <div>
            <div className="stat-value">0</div>
            <div className="stat-label">Active Bookings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div>
            <div className="stat-value">0</div>
            <div className="stat-label">Completed Trips</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Shield size={24} />
          </div>
          <div>
            <div className="stat-value">Active</div>
            <div className="stat-label">Account Status</div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h3 className="card-title">
          <MapPin size={20} color="var(--primary-red)" />
          <span>Upcoming Trips & Reservations</span>
        </h3>
        <div className="placeholder-box">
          <span className="placeholder-badge">Coming in Phase 2 & 3</span>
          <h4>No Upcoming Journeys Scheduled</h4>
          <p style={{ marginTop: '0.5rem' }}>
            Interactive seat booking, route discovery, and payment integration will be unlocked in subsequent project phases.
          </p>
        </div>
      </div>
    </div>
  );
}
