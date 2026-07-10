import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { Sparkles, Mail, Info } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgotpassword", {
        email: email.toLowerCase().trim(),
      });
    } catch {
      // Per spec: always show success — don't leak whether the email exists
    } finally {
      setLoading(false);
      setSubmitted(true);
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

        {submitted ? (
          /* ── Success screen ── */
          <>
            <div className="success-icon"><Mail size={32} /></div>
            <h1 className="auth-heading" style={{ textAlign: "center" }}>
              Check your inbox
            </h1>
            <p
              className="auth-sub"
              style={{ textAlign: "center", marginBottom: 28, lineHeight: 1.6 }}
            >
              If{" "}
              <strong style={{ color: "var(--text-secondary)" }}>
                {email}
              </strong>{" "}
              is registered, you'll receive a password reset link shortly.
            </p>
            <div className="msg msg-info" style={{ marginBottom: 24 }}>
              <span className="msg-icon"><Info size={16} /></span>
              <span>
                Didn't get an email? Check your spam folder or try again in a
                few minutes.
              </span>
            </div>
            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={() => {
                setSubmitted(false);
                setEmail("");
              }}
            >
              Try a different email
            </button>
          </>
        ) : (
          /* ── Form ── */
          <>
            <h1 className="auth-heading">Forgot password?</h1>
            <p className="auth-sub">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoFocus
                  className="form-input"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary${loading ? " loading" : ""}`}
                disabled={loading || !email}
              >
                {loading ? (
                  <>
                    <span className="spinner" /> Sending link…
                  </>
                ) : (
                  "Send reset link"
                )}
              </button>
            </form>
          </>
        )}

        <div className="auth-footer" style={{ marginTop: submitted ? 16 : 24 }}>
          <Link to="/login">← Back to login</Link>
        </div>
      </div>
    </div>
  );
}
