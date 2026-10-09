import React from 'react';
import { Navigation, Compass, CheckCircle2, AlertTriangle, Bus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function DriverDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <div className="dashboard-badge role-tag ROLE_DRIVER">
          <Bus size={14} />
          <span>Captain Dispatch Terminal</span>
        </div>
        <h1 className="dashboard-title">
          Welcome, {user?.fullName || 'Captain'}!
        </h1>
        <p className="dashboard-subtitle">
          Manage your daily assigned routes, passenger manifests, and GPS dispatch telemetry.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-gold)' }}>
            <Navigation size={24} />
          </div>
          <div>
            <div className="stat-value">Standby</div>
            <div className="stat-label">Shift Status</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-gold)' }}>
            <Bus size={24} />
          </div>
          <div>
            <div className="stat-value">SB-104</div>
            <div className="stat-label">Assigned Vehicle</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-gold)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-value">Verified</div>
            <div className="stat-label">License & Fitness</div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h3 className="card-title">
          <Compass size={20} color="var(--accent-gold)" />
          <span>Active Route & Trip Details</span>
        </h3>
        <div className="placeholder-box">
          <span className="placeholder-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d' }}>
            Coming in Phase 5 & 6
          </span>
          <h4>No Active Route Dispatched</h4>
          <p style={{ marginTop: '0.5rem' }}>
            Live GPS telemetry tracking, stop-by-stop passenger check-in, and departure controls are scheduled for subsequent modules.
          </p>
        </div>
      </div>
    </div>
  );
}
