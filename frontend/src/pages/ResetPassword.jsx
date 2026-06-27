import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const pwScore = scorePassword(password);

  // Guard: no token in URL
  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-dot">✦</div>
            <span className="auth-brand-name">Portify</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
            <h1 className="auth-heading">Invalid link</h1>
            <p className="auth-sub" style={{ marginBottom: 24 }}>
              This password reset link is missing or malformed. Please request a
              new one.
            </p>
          </div>
          <Link
            to="/forgot-password"
            className="btn btn-primary"
            style={{ display: "flex" }}
          >
            Request new link
          </Link>
          <div className="auth-footer">
            <Link to="/login">← Back to login</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match. Please check and try again.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/resetpassword", { token, password });
      setSuccess(true);
      // Auto-redirect after 2.5s
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "This link has expired or is invalid. Please request a new one.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="success-icon">✓</div>
          <h1 className="auth-heading">Password updated!</h1>
          <p className="auth-sub" style={{ marginBottom: 24, lineHeight: 1.6 }}>
            Your password has been reset. You'll be redirected to login in a
            moment.
          </p>
          <Link
            to="/login"
            className="btn btn-primary"
            style={{ display: "flex" }}
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-dot">✦</div>
          <span className="auth-brand-name">Portify</span>
        </div>

        <h1 className="auth-heading">Set new password</h1>
        <p className="auth-sub">Choose a strong password for your account.</p>

        {error && (
          <div className="msg msg-error" style={{ marginBottom: 20 }}>
            <span className="msg-icon">⚠</span>
            <span>{error}</span>
            {error.includes("expired") && (
              <Link
                to="/forgot-password"
                style={{
                  display: "block",
                  marginTop: 6,
                  fontWeight: 500,
                  color: "var(--error)",
                }}
              >
                Request a new link →
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* New password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              New password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoFocus
                className={`form-input${error ? " error" : ""}`}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
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
                aria-label={showPw ? "Hide" : "Show"}
              >
                {showPw ? "🙈" : "👁"}
              </button>
            </div>

            {/* Strength meter */}
            {password && (
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

          {/* Confirm */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirm">
              Confirm new password
            </label>
            <input
              id="confirm"
              type={showPw ? "text" : "password"}
              className={`form-input${confirm && confirm !== password ? " error" : ""}`}
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setError("");
              }}
              required
            />
            {confirm && confirm !== password && (
              <p style={{ fontSize: 12, color: "var(--error)", marginTop: 5 }}>
                Passwords don't match yet
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary${loading ? " loading" : ""}`}
            disabled={loading || password !== confirm || !password}
          >
            {loading ? (
              <>
                <span className="spinner" /> Updating password…
              </>
            ) : (
              "Update password"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login">← Back to login</Link>
        </div>
      </div>
    </div>
  );
}
