import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PortfolioPreviewCard from "../components/portfolio/PortfolioPreviewCard";
function formatDate(value) {
  if (!value) return "Not available";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatIcon({ type }) {
  const icons = {
    views: { icon: "👁", bg: "linear-gradient(135deg,#6d5cff,#8b3dff)" },
    status: { icon: "🌐", bg: "linear-gradient(135deg,#20c997,#11995e)" },
    slug: { icon: "🔗", bg: "linear-gradient(135deg,#4f7cff,#3455ff)" },
    date: { icon: "📅", bg: "linear-gradient(135deg,#f2c94c,#c8910c)" },
  };

  return (
    <span
      style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        display: "grid",
        placeItems: "center",
        background: icons[type].bg,
        fontSize: 20,
        boxShadow: "0 12px 28px rgba(0,0,0,.25)",
      }}
    >
      {icons[type].icon}
    </span>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const publicUrl = portfolio?.publicUrl || portfolio?.shareableLink || "";

  // API VERSION — رجعي ده لما MongoDB URL يشتغل
  // useEffect(() => {
  //   const loadPortfolio = async () => {
  //     try {
  //       const res = await api.get("/portfolio/mine");
  //       setPortfolio(res.data);
  //     } catch {
  //       setError("Failed to load your portfolio.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadPortfolio();
  // }, []);

  // MOCK VERSION — مؤقت للتصميم
  useEffect(() => {
    setPortfolio({
      id: "mock-portfolio-id",
      slug: "maivel-ashraf",
      isPublic: true,
      publicUrl: "http://localhost:5173/maivel-ashraf",
      shareableLink: "http://localhost:5173/maivel-ashraf",
      viewCount: 248,
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: "Maivel Ashraf",
        title: "Frontend Developer",
        bio: "I build clean, responsive web applications using React, JavaScript, and modern UI practices.",
        photo: "",
      },
      projects: [
        { title: "Restaurant Website", tags: ["React", "CSS"] },
        { title: "Safari Website", tags: ["HTML", "JavaScript"] },
      ],
      skills: ["React", "JavaScript", "CSS", "Bootstrap"],
    });
    setLoading(false);
  }, []);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // API VERSION
  // const handlePublish = async () => {
  //   if (!portfolio?.id) return;
  //   clearMessages();
  //   setActionLoading("publish");
  //   try {
  //     const res = await api.post(`/portfolio/${portfolio.id}/publish`);
  //     setPortfolio((prev) => ({
  //       ...prev,
  //       isPublic: true,
  //       slug: res.data.slug || prev.slug,
  //       publicUrl: res.data.publicUrl || prev.publicUrl || prev.shareableLink,
  //       shareableLink: res.data.publicUrl || prev.shareableLink || prev.publicUrl,
  //     }));
  //     setSuccess("Portfolio published successfully.");
  //   } catch {
  //     setError("Failed to publish portfolio.");
  //   } finally {
  //     setActionLoading("");
  //   }
  // };

  const handlePublish = async () => {
    clearMessages();
    setActionLoading("publish");

    setTimeout(() => {
      setPortfolio((prev) => ({
        ...prev,
        isPublic: true,
        slug: prev.slug || "maivel-ashraf",
        publicUrl: prev.publicUrl || "http://localhost:5173/maivel-ashraf",
        shareableLink: prev.shareableLink || "http://localhost:5173/maivel-ashraf",
      }));
      setSuccess("Portfolio published successfully.");
      setActionLoading("");
    }, 500);
  };

  // API VERSION
  // const handleUnpublish = async () => {
  //   if (!portfolio?.id) return;
  //   const confirmed = window.confirm("Are you sure you want to unpublish your portfolio?");
  //   if (!confirmed) return;
  //   clearMessages();
  //   setActionLoading("unpublish");
  //   try {
  //     await api.post(`/portfolio/${portfolio.id}/unpublish`);
  //     setPortfolio((prev) => ({ ...prev, isPublic: false }));
  //     setSuccess("Portfolio unpublished successfully.");
  //   } catch {
  //     setError("Failed to unpublish portfolio.");
  //   } finally {
  //     setActionLoading("");
  //   }
  // };

  const handleUnpublish = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to unpublish your portfolio?"
    );
    if (!confirmed) return;

    clearMessages();
    setActionLoading("unpublish");

    setTimeout(() => {
      setPortfolio((prev) => ({ ...prev, isPublic: false }));
      setSuccess("Portfolio unpublished successfully.");
      setActionLoading("");
    }, 500);
  };

  // API VERSION
  // const handleDelete = async () => {
  //   if (!portfolio?.id) return;
  //   const confirmed = window.confirm("Delete this portfolio? This action cannot be undone.");
  //   if (!confirmed) return;
  //   clearMessages();
  //   setActionLoading("delete");
  //   try {
  //     await api.delete(`/portfolio/${portfolio.id}`);
  //     setPortfolio(null);
  //   } catch {
  //     setError("Failed to delete portfolio.");
  //   } finally {
  //     setActionLoading("");
  //   }
  // };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this portfolio? This action cannot be undone."
    );
    if (!confirmed) return;

    clearMessages();
    setActionLoading("delete");

    setTimeout(() => {
      setPortfolio(null);
      setSuccess("Portfolio deleted.");
      setActionLoading("");
    }, 500);
  };

  const handleCopyLink = async () => {
    if (!publicUrl) return;

    try {
      await navigator.clipboard.writeText(publicUrl);
      setSuccess("Portfolio link copied.");
    } catch {
      setError("Failed to copy link.");
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner spinner-brand" style={{ width: 36, height: 36 }} />
        <span>Loading dashboard…</span>
      </div>
    );
  }

  return (
    <div
  className="editor-page"
  style={{
    maxWidth: "1200px",
    width: "100%",
  }}
>
      <div className="editor-header" style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div>
            <h1 className="editor-title" style={{ marginBottom: 6 }}>
              Welcome back,{" "}
              {user?.name || portfolio?.personalInfo?.fullName || "there"} 👋
            </h1>
            <p className="editor-subtitle">
              Manage your portfolio status, link, and visibility.
            </p>
          </div>

          <Link
            to="/portfolio/edit"
            className="btn btn-primary btn-sm"
            style={{
              width: "auto",
              padding: "10px 18px",
              whiteSpace: "nowrap",
              boxShadow: "0 12px 30px rgba(124,92,255,.35)",
              position: "relative",
              // left: "50px",
            }}
          >
            ✎ Edit Portfolio
          </Link>
        </div>
      </div>

      {error && (
        <div className="msg msg-error" style={{ marginBottom: 16 }}>
          <span className="msg-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          className="msg"
          style={{
            marginBottom: 20,
            background: "rgba(16,185,129,.12)",
            border: "1px solid rgba(16,185,129,.35)",
            color: "var(--text)",
          }}
        >
          <span
            className="msg-icon"
            style={{
              color: "var(--success)",
              border: "1px solid var(--success)",
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "inline-grid",
              placeItems: "center",
              fontSize: 12,
            }}
          >
            ✓
          </span>
          <span>{success}</span>
          <button
            type="button"
            onClick={() => setSuccess("")}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: 0,
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            ×
          </button>
        </div>
      )}

      {!portfolio ? (
        <div className="editor-section">
          <h2 className="editor-section-title">No portfolio yet</h2>
          <p className="editor-subtitle">
            Start creating your portfolio, then come back here to publish it.
          </p>
          <Link to="/portfolio/edit" className="btn btn-primary">
            Create Portfolio
          </Link>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 22,
            }}
          >
            <div className="editor-section" style={{ minHeight: 136 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <StatIcon type="views" />
                <h3 className="editor-section-title" style={{ margin: 0 }}>
                  Portfolio Views
                </h3>
              </div>
              <p
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  margin: "18px 0 8px",
                  color: "#8b5cff",
                }}
              >
                {portfolio.viewCount ?? 0}
              </p>
              <p className="editor-subtitle">Total public page visits.</p>
            </div>

            <div className="editor-section" style={{ minHeight: 136 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <StatIcon type="status" />
                <h3 className="editor-section-title" style={{ margin: 0 }}>
                  Publish Status
                </h3>
              </div>
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  margin: "18px 0 8px",
                  color: portfolio.isPublic ? "var(--success)" : "var(--warning)",
                }}
              >
                {portfolio.isPublic ? "Published" : "Draft"}
              </p>
              <p className="editor-subtitle">
                {portfolio.isPublic
                  ? "Your portfolio is visible to visitors."
                  : "Not visible yet."}
              </p>
            </div>

            <div className="editor-section" style={{ minHeight: 136 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <StatIcon type="slug" />
                <h3 className="editor-section-title" style={{ margin: 0 }}>
                  Slug
                </h3>
              </div>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  margin: "18px 0 8px",
                  color: "#5b7cfa",
                }}
              >
                {portfolio.slug || "Not published yet"}
              </p>
              <p className="editor-subtitle">Generated after publishing.</p>
            </div>

            <div className="editor-section" style={{ minHeight: 136 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <StatIcon type="date" />
                <h3 className="editor-section-title" style={{ margin: 0 }}>
                  Last Updated
                </h3>
              </div>
              <p
                style={{
                  fontSize: 21,
                  fontWeight: 900,
                  margin: "18px 0 8px",
                  color: "#f4c35d",
                  lineHeight: 1.25,
                }}
              >
                {formatDate(portfolio.updatedAt)}
              </p>
              <p className="editor-subtitle">Latest saved changes.</p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr",
                            gap: 22,
              alignItems: "start",
            }}
          >
          <div className="editor-section">
  <h2 className="editor-section-title">▣ Portfolio Preview</h2>

  <p
    className="editor-subtitle"
    style={{ marginBottom: 20 }}
  >
    This is how your portfolio appears to visitors.
  </p>

  <PortfolioPreviewCard
    portfolio={portfolio}
    showOpenButton={true}
  />
</div>

            <div className="editor-section">
              <h2 className="editor-section-title">⚙ Portfolio Management</h2>
              <p className="editor-subtitle" style={{ marginBottom: 18 }}>
                Manage your portfolio visibility and settings.
              </p>

              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: 18,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <strong>Publish Status</strong>
                  <span
                    style={{
                      color: portfolio.isPublic ? "var(--success)" : "var(--warning)",
                      fontWeight: 800,
                    }}
                  >
                    {portfolio.isPublic ? "Published" : "Draft"}
                  </span>
                </div>

                {portfolio.isPublic ? (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleUnpublish}
                    disabled={actionLoading === "unpublish"}
                    style={{ width: "100%" }}
                  >
                    {actionLoading === "unpublish"
                      ? "Unpublishing…"
                      : "Unpublish Portfolio"}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handlePublish}
                    disabled={actionLoading === "publish"}
                    style={{ width: "100%" }}
                  >
                    {actionLoading === "publish"
                      ? "Publishing…"
                      : "Publish Portfolio"}
                  </button>
                )}
              </div>

              {portfolio.isPublic && publicUrl && (
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: 18,
                    marginBottom: 14,
                  }}
                >
                  <strong>Share Your Portfolio</strong>
                  <p className="editor-subtitle" style={{ marginTop: 6 }}>
                    Share your portfolio link with anyone.
                  </p>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input
                      className="form-input"
                      value={publicUrl}
                      readOnly
                      style={{ flex: "1 1 220px" }}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleCopyLink}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              )}

              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <strong>Danger Zone</strong>
                <p className="editor-subtitle" style={{ marginTop: 6 }}>
                  Once you delete your portfolio, there is no going back.
                </p>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleDelete}
                  disabled={actionLoading === "delete"}
                  style={{ color: "var(--error)" }}
                >
                  {actionLoading === "delete" ? "Deleting…" : "Delete Portfolio"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}