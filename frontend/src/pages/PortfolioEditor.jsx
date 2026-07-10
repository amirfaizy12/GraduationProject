import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import PersonalInfoSection from "../components/editor/PersonalInfoSection";
import PhotoUploadSection from "../components/editor/PhotoUploadSection";
import CVUploadSection from "../components/editor/CVUploadSection";
import ProjectsSection from "../components/editor/ProjectsSection";
import ExperienceSection from "../components/editor/ExperienceSection";
import SkillsSection from "../components/editor/SkillsSection";
import { Loader2, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

// ─── Autosave badge ───────────────────────────────────────────────────────────
function AutosaveBadge({ status }) {
  if (!status) return null;
  const map = {
    saving: { label: "Saving…", cls: "saving", icon: <Loader2 size={14} className="lucide-spin" /> },
    saved: { label: "All saved", cls: "saved", icon: <CheckCircle2 size={14} /> },
    error: { label: "Save failed", cls: "error", icon: <AlertCircle size={14} /> },
  };
  const { label, cls, icon } = map[status] || {};
  return (
    <span className={`editor-autosave ${cls}`}>
      {icon} {label}
    </span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ form }) {
  const pct = useMemo(() => {
    let score = 0;
    if (form.personalInfo.fullName.trim()) score += 20;
    if (form.personalInfo.title.trim()) score += 15;
    if (form.personalInfo.bio.trim()) score += 15;
    if (form.personalInfo.photo) score += 20;
    if (form.personalInfo.cvFilename) score += 10;
    if (form.projects.length > 0) score += 5;
    if (form.experience.length > 0) score += 5;
    if (form.skills.filter((s) => s.trim()).length > 0) score += 10;
    return Math.min(score, 100);
  }, [form]);

  return (
    <div className="editor-progress">
      <div className="editor-progress-label">
        <span>Profile completion</span>
        <span className="editor-progress-pct">{pct}%</span>
      </div>
      <div className="editor-progress-track">
        <div className="editor-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PortfolioEditor() {
  const [portfolioId, setPortfolioId] = useState(null);
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState({ photo: false, cv: false });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    personalInfo: {
      fullName: "",
      title: "",
      bio: "",
      cvFilename: "",
      photo: "",
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
    projects: [],
    experience: [],
    skills: [],
  });

  // ─── Load or create portfolio ──────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const defaultForm = {
        personalInfo: { fullName: "", title: "", bio: "", cvFilename: "", photo: "", github: "", linkedin: "", twitter: "", website: "" },
        projects: [],
        experience: [],
        skills: [],
      };

      const mergeData = (data) => ({
        ...data,
        personalInfo: { ...defaultForm.personalInfo, ...(data.personalInfo || {}) },
        projects: data.projects || defaultForm.projects,
        experience: data.experience || defaultForm.experience,
        skills: data.skills || defaultForm.skills,
      });

      try {
        const res = await api.get("/portfolio/mine");
        setForm(mergeData(res.data));
        setPortfolioId(res.data.id);
        setSlug(res.data.slug || "");
      } catch {
        const res = await api.post("/portfolio");
        setForm(mergeData(res.data));
        setPortfolioId(res.data.id);
        setSlug(res.data.slug || "");
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    };
    load();
  }, []);

  // ─── Autosave ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || !portfolioId) return;
    const timer = setTimeout(async () => {
      setStatus("saving");
      try {
        await api.put(`/portfolio/${portfolioId}`, form);
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [form, portfolioId, isLoaded]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handlePersonalInfo = (e) =>
    setForm((p) => ({
      ...p,
      personalInfo: { ...p.personalInfo, [e.target.name]: e.target.value },
    }));

  const handleAddProject = () =>
    setForm((p) => ({
      ...p,
      projects: [...p.projects, { title: "", description: "", tags: [] }],
    }));

  const handleProjectChange = (i, e) =>
    setForm((p) => ({
      ...p,
      projects: p.projects.map((proj, idx) =>
        idx === i ? { ...proj, [e.target.name]: e.target.value } : proj,
      ),
    }));

  const handleRemoveProject = (i) =>
    setForm((p) => ({
      ...p,
      projects: p.projects.filter((_, idx) => idx !== i),
    }));

  const handleAddExperience = () =>
    setForm((p) => ({
      ...p,
      experience: [...p.experience, { title: "", company: "", period: "", description: "" }],
    }));

  const handleExperienceChange = (i, e) =>
    setForm((p) => ({
      ...p,
      experience: p.experience.map((exp, idx) =>
        idx === i ? { ...exp, [e.target.name]: e.target.value } : exp,
      ),
    }));

  const handleRemoveExperience = (i) =>
    setForm((p) => ({
      ...p,
      experience: p.experience.filter((_, idx) => idx !== i),
    }));

  const handleSkillsChange = (arr) => setForm((p) => ({ ...p, skills: arr }));

  // Photo
  const handlePhotoUploadStart = () => {
    setUploading((p) => ({ ...p, photo: true }));
    setUploadError("");
  };
  const handlePhotoUploadDone = (url) => {
    setUploading((p) => ({ ...p, photo: false }));
    setForm((p) => ({ ...p, personalInfo: { ...p.personalInfo, photo: url } }));
  };
  const handlePhotoUploadError = (msg) => {
    setUploading((p) => ({ ...p, photo: false }));
    setUploadError(msg);
  };

  // CV
  const handleCVUploadStart = () => {
    setUploading((p) => ({ ...p, cv: true }));
    setUploadError("");
  };
  const handleCVUploadDone = (filename) => {
    setUploading((p) => ({ ...p, cv: false }));
    setForm((p) => ({
      ...p,
      personalInfo: { ...p.personalInfo, cvFilename: filename },
    }));
  };
  const handleCVUploadError = (msg) => {
    setUploading((p) => ({ ...p, cv: false }));
    setUploadError(msg);
  };
  const handleViewDashboard = async () => {
    if (!portfolioId) return;
  
    setStatus("saving");
  
    try {
      await api.put(`/portfolio/${portfolioId}`, form);
      setStatus("saved");
      navigate("/dashboard");
    } catch {
      setStatus("error");
    }
  };
  const [activeTab, setActiveTab] = useState("general");

  if (loading) {
    return (
      <div className="page-loading">
        <div
          className="spinner spinner-brand"
          style={{ width: 36, height: 36, borderWidth: 3 }}
        />
        <span>Loading your portfolio…</span>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General" },
    { id: "media", label: "Media & CV" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div className="editor-page" style={{ maxWidth: 1100 }}>
      {/* ── Sticky Header ── */}
      <div className="editor-header" style={{ position: "sticky", top: 58, zIndex: 10, background: "rgba(8, 12, 20, 0.8)", backdropFilter: "blur(12px)", padding: "20px 0", borderBottom: "1px solid var(--border-mid)", marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 className="editor-title" style={{ fontSize: 28, marginBottom: 4 }}>Portfolio Editor</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <p className="editor-subtitle">Changes save automatically.</p>
              <AutosaveBadge status={status} />
            </div>
          </div>
          
          <button
            className="btn btn-primary"
            style={{ width: "auto", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px" }}
            onClick={handleViewDashboard}
            disabled={status === "saving"}
          >
            {status === "saving" ? "Saving..." : <><ExternalLink size={16} /> View Dashboard</>}
          </button>
        </div>
      </div>

      <div className="editor-layout" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 32, alignItems: "start" }}>
        {/* ── Sidebar ── */}
        <aside className="editor-sidebar" style={{ position: "sticky", top: 180 }}>
          <ProgressBar form={form} />
          
          <nav className="editor-nav" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`editor-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main className="editor-content" style={{ minWidth: 0 }}>
          {/* Upload error banner */}
          {uploadError && (
            <div className="msg msg-error" style={{ marginBottom: 20 }}>
              <span className="msg-icon"><AlertCircle size={16} /></span>
              <span>{uploadError}</span>
              <button
                type="button"
                onClick={() => setUploadError("")}
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
            </div>
          )}

          <div className="tab-content" style={{ animation: "cardIn 0.3s ease" }}>
            {activeTab === "general" && (
              <PersonalInfoSection
                personalInfo={form.personalInfo}
                onChange={handlePersonalInfo}
              />
            )}

            {activeTab === "media" && (
              <>
                <PhotoUploadSection
                  photo={form.personalInfo.photo}
                  uploading={uploading.photo}
                  onUploadStart={handlePhotoUploadStart}
                  onUploadDone={handlePhotoUploadDone}
                  onUploadError={handlePhotoUploadError}
                />
                <CVUploadSection
                  cvFilename={form.personalInfo.cvFilename}
                  uploading={uploading.cv}
                  onUploadStart={handleCVUploadStart}
                  onUploadDone={handleCVUploadDone}
                  onUploadError={handleCVUploadError}
                />
              </>
            )}

            {activeTab === "experience" && (
              <ExperienceSection
                experience={form.experience}
                onAdd={handleAddExperience}
                onChange={handleExperienceChange}
                onRemove={handleRemoveExperience}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsSection
                projects={form.projects}
                onAdd={handleAddProject}
                onChange={handleProjectChange}
                onRemove={handleRemoveProject}
              />
            )}

            {activeTab === "skills" && (
              <SkillsSection skills={form.skills} onChange={handleSkillsChange} />
            )}
          </div>

          {/* Bottom error */}
          {status === "error" && (
            <div className="msg msg-error" style={{ marginTop: 24 }}>
              <span className="msg-icon"><AlertCircle size={16} /></span>
              <span>
                Auto-save failed. Check your connection — changes will retry
                automatically.
              </span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
