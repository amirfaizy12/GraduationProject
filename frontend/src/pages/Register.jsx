import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Password strength scorer (0 = empty, 1 = weak, 2 = medium, 3 = strong)
function scorePassword(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) || /[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  return score;
}

const strengthLabel = ["", "Weak", "Fair", "Strong"];
const strengthClass = ["", "weak", "medium", "strong"];

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const pwScore = scorePassword(form.password);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (form.name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });
      setUser(res.data);

      navigate("/dashboard");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
    
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-dot">✦</div>
          <span className="auth-brand-name">Portify</span>
        </div>

        <h1 className="auth-heading">Create your account</h1>
        <p className="auth-sub">Build and share your portfolio in minutes.</p>

        {error && (
          <div className="msg msg-error" style={{ marginBottom: 20 }}>
            <span className="msg-icon">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              autoFocus
              className={`form-input${error && form.name.trim().length < 2 ? " error" : ""}`}
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
              className="form-input"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                className="form-input"
                placeholder="At least 8 characters"
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
                {showPw ? "🙈" : "👁"}
              </button>
            </div>

            {/* Strength meter */}
            {form.password && (
              <>
                <div className="pw-strength">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`pw-bar ${pwScore >= i ? strengthClass[pwScore] : ""}`}
                    />
                  ))}
                </div>
                <div className="pw-label">
                  Strength:{" "}
                  <strong
                    style={{
                      color:
                        pwScore === 1
                          ? "var(--error)"
                          : pwScore === 2
                            ? "var(--warning)"
                            : "var(--success)",
                    }}
                  >
                    {strengthLabel[pwScore]}
                  </strong>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary${loading ? " loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
