import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/UserMenu.css";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="user-menu">
      <div className="avatar" onClick={() => setOpen(!open)}>
        {user.username[0]}
      </div>

      {open && (
        <div className="menu">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
