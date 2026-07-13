import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Download, ExternalLink, Menu, X, Mail } from "lucide-react";
import PublicAboutSection from "../components/portfolio/PublicAboutSection";
import PublicSkillsSection from "../components/portfolio/PublicSkillsSection";
import PublicExperienceSection from "../components/portfolio/PublicExperienceSection";
import PublicProjectsSection from "../components/portfolio/PublicProjectsSection";
import PublicContactSection, { GithubIcon, LinkedinIcon, TwitterIcon } from "../components/portfolio/PublicContactSection";
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
    <div className="public-mesh-bg" style={{ width: "100%", minHeight: "100vh", color: "var(--text)" }}>
      {/* Background Mesh */}
      <div className="public-mesh-blob-1" />
      <div className="public-mesh-blob-2" />

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
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
        {error && (
          <div className="msg msg-error" style={{ margin: "24px 0" }}>
            <span className="msg-icon"><AlertCircle size={16} /></span>
            <span>{error}</span>
          </div>
        )}

        <style>
          {`
            .hero-social-link {
              color: rgba(255,255,255,0.6);
              transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
              display: flex;
              align-items: center;
              justify-content: center;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.05);
            }
            .hero-social-link:hover {
              color: #fff;
              background: rgba(124, 92, 255, 0.15);
              border-color: rgba(124, 92, 255, 0.4);
              transform: translateY(-4px) scale(1.05);
              box-shadow: 0 10px 20px rgba(124, 92, 255, 0.2);
            }
            
            /* Animations */
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes blobFloat {
              0% { transform: translate(-50%, -50%) scale(1); }
              100% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
            }
            @keyframes floatAvatar {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
              100% { transform: translateY(0px); }
            }
            
            .animate-fade-up {
              animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              opacity: 0;
            }
            
            .hero-section {
              padding: 60px 0 80px;
              display: grid;
              grid-template-columns: 1fr;
              gap: 60px;
              align-items: center;
              min-height: calc(100vh - 80px);
            }
            
            .hero-content {
              display: flex;
              flex-direction: column;
              gap: 24px;
              align-items: center;
              text-align: center;
              animation-delay: 0.1s;
            }
            
            .hero-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(32, 201, 151, 0.05);
              border: 1px solid rgba(32, 201, 151, 0.2);
              color: #20c997;
              padding: 8px 16px;
              border-radius: 99px;
              font-size: 14px;
              font-weight: 600;
              box-shadow: 0 0 20px rgba(32, 201, 151, 0.05);
              backdrop-filter: blur(10px);
            }
            
            .hero-badge-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #20c997;
              box-shadow: 0 0 10px #20c997;
              animation: pulse 2s infinite;
            }
            
            .hero-avatar-wrapper {
              width: 200px;
              height: 200px;
              border-radius: 50%;
              overflow: hidden;
              background: linear-gradient(135deg, #7c5cff, #c084fc);
              display: grid;
              place-items: center;
              font-size: 56px;
              font-weight: 900;
              box-shadow: 0 20px 40px rgba(124, 92, 255, 0.3);
              border: 6px solid rgba(255,255,255,0.1);
              position: relative;
              z-index: 1;
            }
            
            @media (min-width: 900px) {
              .hero-section {
                grid-template-columns: 1.2fr 0.8fr;
                padding: 100px 0 120px;
              }
              .hero-content {
                align-items: flex-start;
                text-align: left;
              }
              .hero-avatar-wrapper {
                width: 260px;
                height: 260px;
                font-size: 80px;
                border-width: 8px;
              }
            }
          `}
        </style>

        <section className="hero-section">
          {/* Left Column: Text & Content */}
          <div className="hero-content animate-fade-up">
            {/* Top Badge */}
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              Available for work
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h1 className="public-gradient-text" style={{ fontSize: "clamp(48px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2.5px", margin: 0 }}>
                {info.fullName || "Your Name"}
              </h1>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, color: "#c084fc", margin: 0, letterSpacing: "-0.5px" }}>
                {info.title || "Professional Title"}
              </h2>
            </div>
            
            {info.bio && (
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 560, marginTop: 8 }}>
                {info.bio}
              </p>
            )}

            {/* Social Links Row */}
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              {info.email && (
                <a href={`mailto:${info.email}`} className="hero-social-link" title="Email">
                  <Mail size={20} />
                </a>
              )}
              {info.github && (
                <a href={info.github} target="_blank" rel="noreferrer" className="hero-social-link" title="GitHub">
                  <GithubIcon size={20} />
                </a>
              )}
              {info.linkedin && (
                <a href={info.linkedin} target="_blank" rel="noreferrer" className="hero-social-link" title="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
              )}
              {info.twitter && (
                <a href={info.twitter} target="_blank" rel="noreferrer" className="hero-social-link" title="Twitter">
                  <TwitterIcon size={20} />
                </a>
              )}
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 24 }}>
              <a href="#projects" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 54, width: "max-content", padding: "0 36px", borderRadius: 99, fontSize: 16, fontWeight: 600, boxShadow: "0 10px 25px rgba(124, 92, 255, 0.3)", textDecoration: "none", boxSizing: "border-box", transition: "all 0.2s" }}>
                View My Work
              </a>
              {info.cvFilename && (
                <a
                  href={`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/portfolio/${portfolio.id}/cv`}
                  download
                  className="btn btn-ghost"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 54, width: "max-content", padding: "0 36px", borderRadius: 99, fontSize: 16, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", textDecoration: "none", boxSizing: "border-box", transition: "all 0.2s" }}
                >
                  <Download size={20} /> Download CV
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Avatar Glass Card */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s", display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{
              position: "relative",
              padding: "clamp(24px, 5vw, 48px)",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 40,
              backdropFilter: "blur(20px)",
              animation: "floatAvatar 8s ease-in-out infinite",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
              zIndex: 2,
            }}>
              {/* Ambient glow inside card */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "80%",
                background: "radial-gradient(circle, rgba(124,92,255,0.4) 0%, rgba(0,0,0,0) 70%)",
                zIndex: 0,
                filter: "blur(40px)",
                animation: "blobFloat 6s infinite alternate"
              }} />

              <div className="hero-avatar-wrapper">
                {info.photo ? (
                  <img src={info.photo} alt={info.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  initials
                )}
              </div>
            </div>
            
            {/* Background Blob behind card */}
            <div style={{
              position: "absolute",
              top: "10%",
              right: "-20%",
              width: "clamp(200px, 40vw, 350px)",
              height: "clamp(200px, 40vw, 350px)",
              background: "radial-gradient(circle, rgba(32, 201, 151, 0.15) 0%, transparent 70%)",
              filter: "blur(50px)",
              zIndex: 0,
              animation: "blobFloat 10s infinite alternate-reverse"
            }} />
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
