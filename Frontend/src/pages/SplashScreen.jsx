import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        if (user.role === 'ROLE_ADMIN') navigate('/admin/dashboard');
        else if (user.role === 'ROLE_DRIVER') navigate('/driver/dashboard');
        else navigate('/user/dashboard');
      } else {
        navigate('/login');
      }
    }, 2800); // 2.8 seconds splash timer

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, user]);

  const handleSkip = () => {
    if (isAuthenticated && user) {
      if (user.role === 'ROLE_ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'ROLE_DRIVER') navigate('/driver/dashboard');
      else navigate('/user/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="splash-container">
      <div className="splash-bus-icon">
        <Bus size={54} />
      </div>

      <h1 className="splash-title">
        SmartBus <span>Travel</span>
      </h1>

      <p className="splash-tagline">
        Travel Smart. Track Live.
      </p>

      <div className="splash-progress-track">
        <div className="splash-progress-bar"></div>
      </div>

      <button onClick={handleSkip} className="splash-skip-btn">
        Enter Transit Portal <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
      </button>
    </div>
  );
}
