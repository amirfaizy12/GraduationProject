import { Link } from "react-router-dom";
import laptopImg from "../../assets/images/laptop-preview.png";
import { User, Code, Clock, Briefcase, ExternalLink } from "lucide-react";

export default function PortfolioPreviewCard({
  portfolio,
  showOpenButton = true,
}) {
  if (!portfolio) return null;

  const info = portfolio.personalInfo || {};
  const initials = (info.fullName || "M")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const navLinkStyle = {
    color: "rgba(226,232,240,.75)",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "color 0.2s ease"
  };

  return (
    <>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          background: "var(--surface)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        className="portfolio-preview-card"
      >
        <div
          style={{
            minHeight: 255,
            padding: "24px 32px",
            background:
              "radial-gradient(circle at 86% 25%, rgba(124,92,255,.18), transparent 40%), linear-gradient(135deg, #050914, #0b1220 68%, #111827)",
            position: "relative",
          }}
        >
          {/* Header Nav */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <a href="#home" style={{ ...navLinkStyle, color: "#9b7cff" }}>
              Home
            </a>
            <a href="#about" style={navLinkStyle}>
              About
            </a>
            <a href="#experience" style={navLinkStyle}>
              Experience
            </a>
            <a href="#projects" style={navLinkStyle}>
              Projects
            </a>
            <a href="#contact" style={navLinkStyle}>
              Contact
            </a>
          </div>

          <div
            id="home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                overflow: "hidden",
                background: "linear-gradient(135deg, #6c63ff, #9b5cff)",
                display: "grid",
                placeItems: "center",
                fontSize: 32,
                fontWeight: 900,
                flexShrink: 0,
                boxShadow: "0 12px 28px rgba(155, 124, 255, 0.3)",
                border: "2px solid rgba(255,255,255,0.1)"
              }}
            >
              {info.photo ? (
                <img
                  src={info.photo}
                  alt={info.fullName || "Profile"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                initials
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ margin: 0, fontSize: 32, fontWeight: 900, letterSpacing: "-0.5px" }}>
                {info.fullName || "Your Name"}
              </h2>

              <p
                style={{
                  margin: "4px 0 12px",
                  color: "#9b7cff",
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                {info.title || "Professional Title"}
              </p>

              <p
                style={{
                  color: "rgba(226,232,240,.72)",
                  margin: 0,
                  maxWidth: 420,
                  lineHeight: 1.6,
                  fontSize: 14,
                }}
              >
                {info.bio || "Your professional bio will appear here."}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#projects"
                  className="btn btn-primary btn-sm"
                  style={{ width: "140px", justifyContent: "center", borderRadius: "99px" }}
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="btn btn-ghost btn-sm"
                  style={{ width: "120px", justifyContent: "center", borderRadius: "99px" }}
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Graphic */}
            <img
              src={laptopImg}
              alt="Laptop preview"
              style={{
                width: 200,
                height: 120,
                objectFit: "contain",
                filter: "drop-shadow(0 15px 25px rgba(0,0,0,.5))",
                opacity: 0.9
              }}
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 12,
            padding: "20px 32px",
            background: "rgba(255,255,255,.02)",
            borderTop: "1px solid rgba(255,255,255,.05)",
          }}
        >
          {[
            { icon: <User size={18} />, label: "About Me", href: "#about" },
            { icon: <Code size={18} />, label: "Skills", href: "#skills" },
            { icon: <Clock size={18} />, label: "Experience", href: "#experience" },
            { icon: <Briefcase size={18} />, label: "Projects", href: "#projects" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="preview-feature-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.04)",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--text)",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(124,92,255,.12)",
                  color: "#9b7cff",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {showOpenButton && portfolio.slug && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            to={`/${portfolio.slug}`}
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