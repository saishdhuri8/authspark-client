import { useState, useContext } from 'react';
import './AuthsparkAuth.css';
import UserContext from './UserContext';

const AuthsparkAuth = ({ theme = "dark", apiKey }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, signup } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    let response;
    if (mode === "login") {
      response = await login(email, password, apiKey);
    } else {
      response = await signup(email, password, apiKey);
    }

    if (!response) {
      setErrorMessage("Something went wrong. Please check your credentials and try again.");
      setTimeout(() => setErrorMessage(''), 4000);
    }

    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className={`authspark-auth-container ${theme === "light" ? "light" : "dark"}`}>
      <div className="authspark-auth-card">
        <div className="authspark-auth-header">
          <div className="authspark-auth-logo">
            <svg viewBox="0 0 24 24" className="authspark-auth-logo-icon">
              <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.2V15.7C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.8V12.3C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
            </svg>
            <h1 className="authspark-auth-title">Authspark</h1>
          </div>
          <p className="authspark-auth-subtitle">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        <div className="authspark-auth-toggle">
          <button
            className={`authspark-auth-toggle-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`authspark-auth-toggle-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="authspark-auth-form">
          <div className="authspark-auth-input-group">
            <label htmlFor="email" className="authspark-auth-input-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="authspark-auth-input"
              autoComplete="username"
              style={{ width: 'auto' }}
            />
          </div>

          <div className="authspark-auth-input-group">
            <label htmlFor="password" className="authspark-auth-input-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="authspark-auth-input"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength="8"
              style={{ width: 'auto' }}
            />
            {mode === "signup" && (
              <p className="authspark-auth-hint">Use at least 8 characters</p>
            )}
          </div>

          {errorMessage && (
            <p className="authspark-auth-error">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="authspark-auth-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="authspark-auth-spinner"></span>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </button>

          <p className="authspark-auth-switch">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="authspark-auth-switch-btn"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthsparkAuth;
