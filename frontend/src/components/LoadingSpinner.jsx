/**
 * LoadingSpinner
 * ────────────────────────────────────────────────────────────────────────
 * Shared loading indicator. Replaces every inline `<span className="spinner">`
 * scattered across pages (buttons, editor, PrivateRoute, etc).
 *
 * Usage:
 *   <LoadingSpinner />                          // small inline spinner
 *   <LoadingSpinner size={36} />                // bigger spinner
 *   <LoadingSpinner message="Loading…" />        // inline + text
 *   <LoadingSpinner fullPage message="Checking session…" /> // full page loader
 */
export default function LoadingSpinner({
  size = 18,
  brand = false,
  message = "",
  fullPage = false,
}) {
  const spinner = (
    <span
      className={`spinner${brand ? " spinner-brand" : ""}`}
      style={{
        width: size,
        height: size,
        borderWidth: size >= 28 ? 3 : 2,
      }}
      role="status"
      aria-label={message || "Loading"}
    />
  );

  if (fullPage) {
    return (
      <div className="page-loading">
        {spinner}
        {message && <span>{message}</span>}
      </div>
    );
  }

  if (!message) return spinner;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {spinner}
      <span>{message}</span>
    </span>
  );
}
