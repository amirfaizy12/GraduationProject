/**
 * ErrorMessage
 * ────────────────────────────────────────────────────────────────────────
 * Shared feedback banner. Replaces every manually-typed
 * `<div className="msg msg-error">...</div>` block copy-pasted across
 * Register/Login/ForgotPassword/ResetPassword/PortfolioEditor.
 *
 * Usage:
 *   <ErrorMessage message={error} />
 *   <ErrorMessage message="Saved!" type="success" />
 *   <ErrorMessage message={error} onDismiss={() => setError("")} />
 */
const ICONS = {
  error: "⚠",
  success: "✓",
  warning: "⚠",
  info: "ℹ",
};

export default function ErrorMessage({ message, type = "error", onDismiss }) {
  if (!message) return null;

  return (
    <div className={`msg msg-${type}`} role="alert">
      <span className="msg-icon">{ICONS[type] || ICONS.error}</span>
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
