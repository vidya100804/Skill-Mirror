import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthForm.css";

export default function SignInForm({ onSuccess }) {
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Authentication failed");
        setLoading(false);
        return;
      }

      login(data);
      onSuccess();
    } catch {
      setError("AI system unreachable");
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      {/* Username / Email */}
      <div className="input-group">
        <input
          className="auth-input"
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div className="input-group">
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Error */}
      {error && <div className="auth-error">⚠ {error}</div>}

      {/* Primary Action */}
      <button
        className={`auth-btn ${loading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "AUTHENTICATING…" : "Authenticate"}
      </button>
    </div>
  );
}
