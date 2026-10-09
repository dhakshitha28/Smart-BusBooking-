import React from 'react';
import { ShieldAlert, Users, Layers, Activity, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <div className="dashboard-badge role-tag ROLE_ADMIN">
          <ShieldAlert size={14} />
          <span>Fleet Administration Headquarters</span>
        </div>
        <h1 className="dashboard-title">
          Welcome, {user?.fullName || 'Administrator'}!
        </h1>
        <p className="dashboard-subtitle">
          Supervise transit networks, onboard authorized driver personnel, configure schedules, and view system metrics.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div>
            <div className="stat-value">System</div>
            <div className="stat-label">User Management</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Layers size={24} />
          </div>
          <div>
            <div className="stat-value">0</div>
            <div className="stat-label">Active Bus Fleets</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div>
            <div className="stat-value">Online</div>
            <div className="stat-label">System Health</div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h3 className="card-title">
          <PlusCircle size={20} color="var(--primary-red)" />
          <span>Driver Provisioning & Fleet Management</span>
        </h3>
        <div className="placeholder-box">
          <span className="placeholder-badge">Coming in Phase 2 & 4</span>
          <h4>Fleet and Driver Onboarding Modules</h4>
          <p style={{ marginTop: '0.5rem' }}>
            As part of Phase 1, only passengers can register publicly. Administrative interfaces to enroll drivers and deploy transit routes will be implemented in the fleet management module.
          </p>
        </div>
      </div>
    </div>
  );
}
