import { Link } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // The response was successful
        setUsername('');
        setPassword('');
        setError(null);
        window.location.href = '/api/posts';
      } else {
        // The response was not successful
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login">
      <h1>Sign in to your account </h1>
      <h5>
        or
        <Link to="/api/users/signup" className="signupLoginLink">
          Sign up for a new account
        </Link>
      </h5>
      <label htmlFor="username">Email, not username :)</label>
      <form onSubmit={handleSubmit} className="loginForm">
        <input
          type="text"
          className="loginInput"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="loginInput"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginButton">
          Sign In
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
