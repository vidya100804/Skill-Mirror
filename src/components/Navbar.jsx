import { useState } from "react";
import AuthModal from "./AuthModal";
import "../styles/Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useAuth } from "../context/AuthContext";
import AINotification from "./AINotification";

export default function Navbar() {
  const { user, logout } = useAuth(); // ✅ SINGLE SOURCE

  const [authType, setAuthType] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutNotice, setLogoutNotice] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    setLogoutNotice(true);

    setTimeout(() => {
      logout();
    }, 1200); // graceful AI-style exit
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <AutoGraphIcon className="brand-icon" />
          <span className="brand-text">
            <span className="brand-skill">SKILL</span>
            <span className="brand-mirror">MIRROR</span>
          </span>
        </div>

        <div className="nav-actions">
          {!user ? (
            <>
              <button onClick={() => setAuthType("signin")}>Sign In</button>
              <button onClick={() => setAuthType("signup")}>Sign Up</button>
            </>
          ) : (
            <div className="profile-wrapper">
              <span className="hi-text">Hi, {user.username}</span>

              <AccountCircleIcon
                className="profile-icon"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div className="profile-menu">
                  <p className="name">{user.username}</p>
                  <p className="email">{user.email}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* AUTH MODAL */}
      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          onSuccess={() => setAuthType(null)}
        />
      )}

      {/* 🤖 AI LOGOUT NOTIFICATION */}
      {logoutNotice && (
        <AINotification
          message="Session terminated. See you soon."
          type="info"
          duration={2000}
          onClose={() => setLogoutNotice(false)}
        />
      )}
    </>
  );
}
