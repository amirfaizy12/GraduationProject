import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PortfolioPreviewCard from "../components/portfolio/PortfolioPreviewCard";
import PublicAboutSection from "../components/portfolio/PublicAboutSection";
import PublicSkillsSection from "../components/portfolio/PublicSkillsSection";
import PublicProjectsSection from "../components/portfolio/PublicProjectsSection";
import PublicContactSection from "../components/portfolio/PublicContactSection";

export default function PublicPortfolio() {
  const { slug } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div
      className="editor-page"
      style={{
        maxWidth: "1300px",
        width: "100%",
      }}
    >
      {error && (
        <div className="msg msg-error" style={{ marginBottom: 20 }}>
          <span className="msg-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div className="editor-section">
        <PortfolioPreviewCard portfolio={portfolio} showOpenButton={false} />

        {info.cvFilename && (
          <div style={{ textAlign: "center", marginTop: 22 }}>
            {/* API VERSION — رجعي ده لما API يشتغل */}
            
            <a
              href={`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/portfolio/${portfolio.id}/cv`}
              download
              className="btn btn-primary"
              style={{ width: "170px", justifyContent: "center" }}
            >
              Download CV
            </a>
           

            {/* MOCK VERSION */}
            {/* <a
              href="#"
              className="btn btn-primary"
              style={{ width: "170px", justifyContent: "center" }}
            >
              Download CV
            </a> */}
          </div>
        )}
      </div>

      <PublicAboutSection personalInfo={info} />

      <PublicSkillsSection skills={portfolio.skills} />

      <PublicProjectsSection projects={portfolio.projects} />

      <PublicContactSection personalInfo={info} />
    </div>
  );
}
