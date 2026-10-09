import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ROLE_ADMIN': return 'Administrator';
      case 'ROLE_DRIVER': return 'Driver Captain';
      case 'ROLE_USER': return 'Passenger';
      default: return 'User';
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <div className="brand-badge">
          <Bus size={22} />
        </div>
        <div className="brand-text">
          SmartBus <span>Travel</span>
        </div>
      </Link>

      <div className="nav-links">
        {isAuthenticated && user ? (
          <>
            <div className="nav-user-chip">
              <UserIcon size={16} color="var(--primary-red)" />
              <span>{user.fullName || user.email}</span>
              <span className={`role-tag ${user.role}`}>
                {getRoleDisplayName(user.role)}
              </span>
            </div>
            <button onClick={handleLogout} className="btn-logout" title="Sign Out">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-logout">Sign In</Link>
            <Link to="/signup" className="btn-primary" style={{ padding: '0.45rem 1.15rem', fontSize: '0.9rem', width: 'auto', marginTop: 0 }}>
              Create Account
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
