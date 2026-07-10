import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post("/auth/logout");
    } catch {
      // Proceed with client-side logout even if the request fails
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  // Derive initials for the avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav className="navbar">
      <Link to={user ? "/dashboard" : "/"} className="navbar-brand">
        <div className="navbar-dot"><Sparkles size={16} /></div>
        <span className="navbar-name">Portify</span>
      </Link>

      {user ? (
        <div className="navbar-user">
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
            {user.name || user.email}
          </span>
          <div className="navbar-avatar" title={user.name}>
            {initials}
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <span className="spinner" style={{ width: 14, height: 14 }} />{" "}
                Logging out
              </>
            ) : (
              "Log out"
            )}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/login" className="btn btn-ghost btn-sm">
            Log in
          </Link>
          <Link
            to="/register"
            className="btn btn-primary btn-sm"
            style={{ width: "auto" }}
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
