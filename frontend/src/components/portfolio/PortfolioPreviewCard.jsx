import { Link } from "react-router-dom";
import laptopImg from "../../assets/images/laptop-preview.png";

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
  };

  return (
    <>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            minHeight: 255,
            padding: "22px 28px",
            background:
              "radial-gradient(circle at 86% 25%, rgba(124,92,255,.22), transparent 32%), linear-gradient(135deg, #050914, #0b1220 68%, #111827)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 26,
              fontSize: 12,
              marginBottom: 28,
            }}
          >
            <a href="#home" style={{ ...navLinkStyle, color: "#9b7cff" }}>
              Home
            </a>
            <a href="#about" style={navLinkStyle}>
              About
            </a>
            <a href="#skills" style={navLinkStyle}>
              Skills
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
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                overflow: "hidden",
                background: "linear-gradient(135deg, #6c63ff, #9b5cff)",
                display: "grid",
                placeItems: "center",
                fontSize: 30,
                fontWeight: 900,
                flexShrink: 0,
                boxShadow: "0 16px 34px rgba(0,0,0,.28)",
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

            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900 }}>
                {info.fullName || "Your Name"}
              </h2>

              <p
                style={{
                  margin: "6px 0 10px",
                  color: "#9b7cff",
                  fontWeight: 800,
                }}
              >
                {info.title || "Professional Title"}
              </p>

              <p
                style={{
                  color: "rgba(226,232,240,.72)",
                  margin: 0,
                  maxWidth: 390,
                  lineHeight: 1.6,
                  fontSize: 14,
                }}
              >
                {info.bio || "Your professional bio will appear here."}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#projects"
                  className="btn btn-primary btn-sm"
                  style={{ width: "150px", justifyContent: "center" }}
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="btn btn-ghost btn-sm"
                  style={{ width: "130px", justifyContent: "center" }}
                >
                  Contact Me
                </a>
              </div>
            </div>

            <img
              src={laptopImg}
              alt="Laptop preview"
              style={{
                width: 220,
                height: 135,
                objectFit: "contain",
                filter: "drop-shadow(0 22px 35px rgba(0,0,0,.45))",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            padding: 18,
            background: "rgba(255,255,255,.02)",
          }}
        >
          {[
            { icon: "♙", label: "About Me", href: "#about" },
            { icon: "</>", label: "Skills", href: "#skills" },
            { icon: "▣", label: "Projects", href: "#projects" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 16px",
                borderRadius: 12,
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.05)",
                fontWeight: 800,
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(124,92,255,.16)",
                  color: "#9b7cff",
                  fontSize: 15,
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
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <Link
            to={`/${portfolio.slug}`}
            target="_blank"
            className="btn btn-ghost"
          >
            Open Full Preview ↗
          </Link>
        </div>
      )}
    </>
  );
}