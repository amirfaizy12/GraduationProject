import { Link } from "react-router-dom";

/**
 * NotFound (404)
 * Shown for:
 *  - any unmatched route (wildcard "*" in App.jsx)
 *  - a public portfolio slug that the API couldn't find (404 from
 *    GET /api/portfolio/slug/:slug) — Maivel's Public Portfolio page
 *    should redirect here on a 404 response.
 */
export default function NotFound() {
  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="auth-brand" style={{ justifyContent: "center" }}>
          <div className="auth-brand-dot">✦</div>
          <span className="auth-brand-name">Portify</span>
        </div>

        <div style={{ fontSize: 56, margin: "12px 0" }}>☹</div>

        <h1 className="auth-heading">Page not found</h1>
        <p className="auth-sub">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
          style={{
            display: "inline-flex",
            marginTop: 24,
            textDecoration: "none",
          }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
