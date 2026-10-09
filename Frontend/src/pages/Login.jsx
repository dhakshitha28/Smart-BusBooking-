import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email address and password');
      return;
    }

    setLoading(true);
    try {
      // Dispatch authentication request to API Gateway -> Auth Service
      const response = await login({ email, password });

      // Role-based routing based SOLELY on backend-assigned role
      if (response.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else if (response.role === 'ROLE_DRIVER') {
        navigate('/driver/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <LogIn size={26} />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your SmartBus Travel account</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-container">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-container">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn size={18} />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account yet?
          <Link to="/signup" className="auth-link">Create Passenger Account</Link>
        </p>

        {/* Demo Credentials Quick-Filler */}
        <div className="test-accounts-box">
          <div className="test-accounts-title">
            <ShieldCheck size={14} color="var(--primary-red)" />
            <span>Default Test Accounts:</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
            <div>
              <strong>Admin: </strong>
              <button
                type="button"
                onClick={() => fillQuickCredentials('admin@smartbus.com', 'Admin@123')}
                className="account-pill"
                style={{ cursor: 'pointer', border: 'none' }}
              >
                admin@smartbus.com / Admin@123
              </button>
            </div>
            <div>
              <strong>Driver: </strong>
              <button
                type="button"
                onClick={() => fillQuickCredentials('driver@smartbus.com', 'Driver@123')}
                className="account-pill"
                style={{ cursor: 'pointer', border: 'none' }}
              >
                driver@smartbus.com / Driver@123
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
