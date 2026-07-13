import { Link } from "react-router-dom";
import laptopImg from "../../assets/images/laptop-preview.png";
import { User, Code, Clock, Briefcase, ExternalLink } from "lucide-react";

export default function PortfolioPreviewCard({
  portfolio,
  showOpenButton = true,
}) {
  if (!portfolio) return null;

  const previewUrl = portfolio.slug ? `/${portfolio.slug}` : "#";

  return (
    <>
      <div
        className="portfolio-preview-card"
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--surface)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Fake Browser Header */}
        <div
          style={{
            height: 36,
            background: "rgba(255, 255, 255, 0.03)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <div
            style={{
              marginLeft: 16,
              background: "rgba(0,0,0,0.2)",
              padding: "4px 16px",
              borderRadius: 6,
              fontSize: 12,
              color: "var(--text-muted)",
              flex: 1,
              textAlign: "center",
              fontFamily: "var(--mono)",
            }}
          >
            {window.location.origin}{previewUrl}
          </div>
        </div>

        {/* Live Iframe Preview */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "60%", /* Aspect ratio 16:9ish */
            background: "var(--bg)",
          }}
        >
          <iframe
            src={previewUrl}
            title="Portfolio Live Preview"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>

      {showOpenButton && portfolio.slug && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            to={previewUrl}
            target="_blank"
            className="btn btn-secondary"
            style={{ borderRadius: "99px", padding: "8px 24px" }}
          >
            Open Full Preview <ExternalLink size={16} style={{ marginLeft: 6 }} />
          </Link>
        </div>
      )}
    </>
  );
}