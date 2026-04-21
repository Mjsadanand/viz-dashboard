// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === 'admin' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use admin / admin123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-form-container">
            <div className="brand">
              <div className="brand-icon">📊</div>
              <span className="brand-name">Blackcoffer</span>
            </div>

            <div className="login-header">
              <h1>Hola, Welcome Back</h1>
              <p>Hey, welcome back to your special place</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-button">
                Sign In
              </button>

              <div className="signup-link">
                Don't have an account? <a href="#">Sign Up</a>
              </div>
            </form>
          </div>
        </div>

        <div className="login-right">
          <div className="illustration-container">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
            
            <div className="main-illustration">
              <div className="phone-frame">
                <div className="fingerprint-icon">👆</div>
                <div className="security-check">✓</div>
              </div>
              <div className="person-illustration">👤</div>
              <div className="lock-icon">🔒</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
