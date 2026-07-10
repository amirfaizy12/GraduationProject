import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Sparkles, AlertCircle, EyeOff, Eye } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      // Same message for both wrong email and wrong password (security best practice)
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-dot"><Sparkles size={18} /></div>
          <span className="auth-brand-name">Portify</span>
        </div>

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-sub">Log in to manage your portfolio.</p>

        {error && (
          <div className="msg msg-error" style={{ marginBottom: 20 }}>
            <span className="msg-icon"><AlertCircle size={16} /></span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              className={`form-input${error ? " error" : ""}`}
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <label
                className="form-label"
                htmlFor="password"
                style={{ marginBottom: 0 }}
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: 12.5,
                  color: "var(--brand-light)",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                className={`form-input${error ? " error" : ""}`}
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="btn btn-ghost btn-sm"
                style={{
                  position: "absolute",
                  right: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "6px 8px",
                  fontSize: 15,
                  color: "var(--text-muted)",
                }}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary${loading ? " loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Logging in…
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Sign up free</Link>
        </div>
      </div>
    </div>
  );
}
