import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Download, ExternalLink, Menu, X } from "lucide-react";
import PublicAboutSection from "../components/portfolio/PublicAboutSection";
import PublicSkillsSection from "../components/portfolio/PublicSkillsSection";
import PublicExperienceSection from "../components/portfolio/PublicExperienceSection";
import PublicProjectsSection from "../components/portfolio/PublicProjectsSection";
import PublicContactSection from "../components/portfolio/PublicContactSection";
import { AlertCircle } from "lucide-react";

export default function PublicPortfolio() {
  const { slug } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // API VERSION — رجعي ده لما API يشتغل
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await api.get(`/portfolio/slug/${slug}`);
        setPortfolio(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError("Failed to load portfolio.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    loadPortfolio();
  }, [slug]);

  // MOCK VERSION — مؤقت للتصميم فقط
  // useEffect(() => {
  //   if (slug !== "maivel-ashraf") {
  //     setNotFound(true);
  //     setLoading(false);
  //     return;
  //   }

  //   setPortfolio({
  //     id: "mock-portfolio-id",
  //     slug: "maivel-ashraf",
  //     isPublic: true,
  //     publicUrl: "http://localhost:5173/maivel-ashraf",
  //     personalInfo: {
  //       fullName: "Maivel Ashraf",
  //       title: "Frontend Developer",
  //       bio: "I build clean, responsive web applications using React, JavaScript, and modern UI practices.",
  //       photo: "",
  //       cvFilename: "maivel-cv.pdf",
  //       email: "maivel@example.com",
  //       github: "https://github.com",
  //       linkedin: "https://linkedin.com",
  //     },
  //     projects: [
  //       {
  //         title: "Restaurant Website",
  //         description:
  //           "A responsive restaurant website with modern UI, menu sections, and smooth navigation.",
  //         tags: ["React", "CSS", "JavaScript"],
  //       },
  //       {
  //         title: "Safari Website",
  //         description:
  //           "A travel landing page that showcases safari trips, destinations, and booking information.",
  //         tags: ["HTML", "CSS", "JavaScript"],
  //       },
  //     ],
  //     skills: ["React", "JavaScript", "CSS", "Bootstrap", "Git", "Figma"],
  //   });

  //   setLoading(false);
  // }, [slug]);


  if (loading) {
    return (
      <div className="page-loading">
        <div
          className="spinner spinner-brand"
          style={{ width: 36, height: 36 }}
        />
        <span>Loading portfolio…</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="editor-page">
        <div className="editor-section" style={{ textAlign: "center" }}>
          <h1 className="editor-title">Portfolio Not Found</h1>
          <p className="editor-subtitle">
            The portfolio link is invalid or no longer available.
          </p>
        </div>
      </div>
    );
  }

  const info = portfolio?.personalInfo || {};
  const initials = (info.fullName || "M")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#050914", color: "var(--text)" }}>
      {/* Sticky Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(5, 9, 20, 0.8)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "16px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>
            {info.fullName || "Portfolio"}
            <span style={{ color: "var(--brand)" }}>.</span>
          </div>
          
          {/* Desktop Nav */}
          <div style={{ display: "none", "@media (min-width: 768px)": { display: "flex" }, gap: 24 }} className="desktop-nav">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }} className="nav-link-hover">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none", background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#0b1220", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} style={{ color: "var(--text)", textDecoration: "none", fontSize: 16, fontWeight: 500 }}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {error && (
          <div className="msg msg-error" style={{ margin: "24px 0" }}>
            <span className="msg-icon"><AlertCircle size={16} /></span>
            <span>{error}</span>
          </div>
        )}

        {/* Hero Section */}
        <section
          style={{
            padding: "100px 0 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            minHeight: "70vh",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              overflow: "hidden",
              background: "linear-gradient(135deg, #6c63ff, #9b5cff)",
              display: "grid",
              placeItems: "center",
              fontSize: 36,
              fontWeight: 900,
              boxShadow: "0 20px 40px rgba(108, 99, 255, 0.25)",
              border: "3px solid rgba(255,255,255,0.1)",
              marginBottom: 32
            }}
          >
            {info.photo ? (
              <img src={info.photo} alt={info.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              initials
            )}
          </div>
          
          <h1 style={{ fontSize: "clamp(40px, 8vw, 64px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", color: "#fff", margin: 0 }}>
            {info.fullName || "Your Name"}
          </h1>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 600, color: "var(--brand-light)", marginTop: 16, marginBottom: 24 }}>
            {info.title || "Professional Title"}
          </h2>
          
          <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
            {info.bio || "Your professional bio will appear here."}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#projects" className="btn btn-primary" style={{ padding: "12px 28px", borderRadius: 99, fontSize: 15 }}>
              View My Work
            </a>
            {info.cvFilename && (
              <a
                href={`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/portfolio/${portfolio.id}/cv`}
                download
                className="btn btn-ghost"
                style={{ padding: "12px 28px", borderRadius: 99, fontSize: 15, background: "rgba(255,255,255,0.05)" }}
              >
                <Download size={18} style={{ marginRight: 8 }} /> Download CV
              </a>
            )}
          </div>
        </section>

        {/* Public Sections */}
        <PublicAboutSection personalInfo={info} />
        <PublicSkillsSection skills={portfolio.skills} />
        <PublicExperienceSection experience={portfolio.experience} />
        <PublicProjectsSection projects={portfolio.projects} />
        
      </main>
      
      <PublicContactSection personalInfo={info} />
    </div>
  );
}
