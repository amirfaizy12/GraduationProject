import { Link } from "react-router-dom";
import laptopImg from "../assets/images/laptop.png";
import { Edit3, Sparkles, CloudUpload, TrendingUp, Star, Zap, Diamond, Rocket, Check, ArrowRight, Play } from "lucide-react";

export default function Landing() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Edit3 size={28} />,
      title: "Easy to Build",
      text: "Create your portfolio in minutes with our intuitive editor.",
      action: "/portfolio/edit",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Beautiful Templates",
      text: "Choose from modern templates that make you stand out.",
    },
    {
      icon: <CloudUpload size={28} />,
      title: "Upload & Showcase",
      text: "Upload your projects, CV, and skills with ease.",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Get More Views",
      text: "Share your portfolio and get noticed by companies.",
    },
  ];

  return (
    <div className="editor-page" style={{ maxWidth: 1500, width: "100%" }}>
     <nav
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: 70,
    width: "100%",
  }}
>
  <div
    style={{
      display: "flex",
      gap: 34,
      alignItems: "center",
    }}
  >
    {[
      ["Home", "hero"],
      ["Features", "features"],
      ["How it Works", "how"],
      ["Pricing", "pricing"],
      ["About", "about"],
    ].map(([label, id]) => (
      <button
        key={id}
        onClick={() => scrollTo(id)}
        style={{
          background: "transparent",
          border: 0,
          color: label === "Home" ? "#9b7cff" : "var(--text)",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 17,
        }}
      >
        {label}
      </button>
    ))}
  </div>
</nav>

      {/* Hero */}
      <section
        id="hero"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "center",
          marginBottom: 80,
        }}
      >
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 999,
              background: "rgba(124,92,255,.12)",
              border: "1px solid rgba(124,92,255,.2)",
              color: "#b59cff",
              marginBottom: 26,
              fontWeight: 700,
            }}
          >
            <Sparkles size={16} /> Build. Showcase. Get Hired.
          </span>

          <h1 style={{ fontSize: 58, lineHeight: 1.08, margin: "0 0 24px" }}>
            Create Your Portfolio.
            <br />
            Show Your{" "}
            <span style={{ color: "#8b5cff" }}>Best Work.</span>
          </h1>

          <p
            className="editor-subtitle"
            style={{ fontSize: 20, lineHeight: 1.7, maxWidth: 560 }}
          >
            Portify helps you build a stunning portfolio in minutes. Stand out,
            get noticed, and land your dream job.
          </p>

          <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ width: 230, justifyContent: "center" }}
            >
              Get Started Now <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => scrollTo("how")}
              className="btn btn-ghost"
              style={{ width: 220, justifyContent: "center", display: "flex", alignItems: "center", gap: 6 }}
            >
              See How It Works <Play size={16} />
            </button>
          </div>

          <div style={{ marginTop: 34, color: "var(--text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 4, color: "#fbbf24" }}>
              <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              <strong style={{ color: "var(--text)", marginLeft: 6 }}>4.9/5</strong>
            </div>
            Trusted by 1,000+ developers
          </div>
        </div>

        <div>
          <img
            src={laptopImg}
            alt="Portify portfolio laptop preview"
            style={{
              width: "100%",
              maxHeight: 520,
              objectFit: "contain",
              filter: "drop-shadow(0 35px 55px rgba(124,92,255,.25))",
            }}
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ marginBottom: 60 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ color: "#9b7cff", fontWeight: 800 }}>FEATURES</p>
          <h2 className="editor-title">Everything You Need to Shine</h2>
          <p className="editor-subtitle">
            Powerful tools to build your portfolio and accelerate your career.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((item) => {
            const content = (
              <div className="editor-section" style={{ height: "100%" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(124,92,255,.16)",
                    color: "#9b7cff",
                    fontSize: 28,
                    marginBottom: 18,
                  }}
                >
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p className="editor-subtitle">{item.text}</p>
              </div>
            );

            return item.action ? (
              <Link
                key={item.title}
                to={item.action}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>
      </section>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 22,
    marginBottom: 28,
    alignItems: "stretch",
  }}
>
  {/* How it Works */}
  <section id="how" className="editor-section">
    <h2 className="editor-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Zap size={24} color="#8b5cff" /> How it Works</h2>

    <p className="editor-subtitle" style={{ marginBottom: 26 }}>
      Building your portfolio with <strong>Portify</strong> takes only a few
      minutes. Follow these simple steps to create a professional portfolio
      that you can instantly share with recruiters and clients.
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 18,
      }}
    >
      {[
        {
          step: "01",
          title: "Create Account",
          text: "Register using your email and access your personal dashboard.",
        },
        {
          step: "02",
          title: "Build Portfolio",
          text: "Add your personal information, projects, technical skills and upload your CV.",
        },
        {
          step: "03",
          title: "Publish",
          text: "Publish your portfolio to generate a unique public URL that anyone can visit.",
        },
        {
          step: "04",
          title: "Share",
          text: "Share your portfolio with recruiters, companies or clients and keep updating it anytime.",
        },
      ].map((item) => (
        <div
          key={item.step}
          style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 18,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(124,92,255,.18)",
              color: "#9b7cff",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            {item.step}
          </div>

          <h4 style={{ marginBottom: 10 }}>{item.title}</h4>

          <p
            className="editor-subtitle"
            style={{ lineHeight: 1.7 }}
          >
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </section>

  {/* Pricing */}
  <section id="pricing" className="editor-section">
    <h2 className="editor-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Diamond size={24} color="#8b5cff" /> Pricing</h2>

    <p
      className="editor-subtitle"
      style={{
        marginBottom: 22,
        lineHeight: 1.8,
      }}
    >
      Start building your portfolio for free. More premium features will be
      available soon to help professionals showcase their work even better.
    </p>

    <div
      style={{
        border: "1px solid rgba(124,92,255,.25)",
        borderRadius: 18,
        padding: 24,
        textAlign: "center",
        background: "rgba(124,92,255,.05)",
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "#8b5cff",
          marginBottom: 10,
        }}
      >
        Free
      </div>

      <p className="editor-subtitle" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Check size={16} color="var(--success)" /> Portfolio Builder
      </p>

      <p className="editor-subtitle" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Check size={16} color="var(--success)" /> Public Portfolio
      </p>

      <p className="editor-subtitle" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Check size={16} color="var(--success)" /> CV Upload
      </p>

      <p className="editor-subtitle" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Check size={16} color="var(--success)" /> Projects & Skills
      </p>

      {/* <button
        className="btn btn-primary"
        style={{
          width: "100%",
          marginTop: 18,
        }}
      >
        Get Started
      </button> */}
    </div>
  </section>
</div>

      {/* CTA */}
      <section
        className="editor-section"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 18,
          marginBottom: 30,
        }}
      >
        <div>
          <h2 className="editor-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Rocket size={24} color="#8b5cff" /> Ready to build your future?
          </h2>
          <p className="editor-subtitle">
            Join thousands of developers who are showcasing their work with
            Portify.
          </p>
        </div>

        <Link
          to="/register"
          className="btn btn-primary"
          style={{ width: 210, justifyContent: "center" }}
        >
          Get Started Now <ArrowRight size={16} />
        </Link>
      </section>

      {/* Footer */}
      <footer
        id="about"
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span>© 2026 Portify. All rights reserved.</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:team@portify.com">Email</a>
        </div>
      </footer>
    </div>
  );
}