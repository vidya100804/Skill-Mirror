 import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthForm.css";

export default function SignUpForm({ onSuccess }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Account creation failed");
        return;
      }

      login(data);
      onSuccess();
    } catch {
      setError("AI system unreachable");
    }
  };

  return (
    <div className="auth-form">
      {/* Username */}
      <div className="input-group">
        <input
          type="text"
          className="auth-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="input-group">
        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="input-group">
        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && <div className="auth-error">⚠ {error}</div>}

      {/* Primary Action */}
      <button className="auth-btn" onClick={handleSubmit}>
        Create Account
      </button>
    </div>
  );
}
