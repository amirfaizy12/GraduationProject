import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import PersonalInfoSection from "../components/editor/PersonalInfoSection";
import PhotoUploadSection from "../components/editor/PhotoUploadSection";
import CVUploadSection from "../components/editor/CVUploadSection";
import ProjectsSection from "../components/editor/ProjectsSection";
import SkillsSection from "../components/editor/SkillsSection";

// ─── Autosave badge ───────────────────────────────────────────────────────────
function AutosaveBadge({ status }) {
  if (!status) return null;
  const map = {
    saving: { label: "Saving…", cls: "saving", icon: "⏳" },
    saved: { label: "All saved", cls: "saved", icon: "✓" },
    error: { label: "Save failed", cls: "error", icon: "⚠" },
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
    if (form.projects.length > 0) score += 10;
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
    },
    projects: [],
    skills: [],
  });

  // ─── Load or create portfolio ──────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/portfolio/mine");
        setForm(res.data);
        setPortfolioId(res.data.id);
        setSlug(res.data.slug || "");
      } catch {
        const res = await api.post("/portfolio");
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

  return (
    <div className="editor-page">
      {/* ── Header ── */}
      <div className="editor-header">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div>
            <h1 className="editor-title">Portfolio editor</h1>
            <p className="editor-subtitle">
              Changes save automatically as you type.
            </p>
          </div>
          <AutosaveBadge status={status} />
        </div>
        <ProgressBar form={form} />
      </div>

      {/* ── Upload error banner ── */}
      {uploadError && (
        <div className="msg msg-error" style={{ marginBottom: 20 }}>
          <span className="msg-icon">⚠</span>
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError("")}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "var(--error)",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* ── Sections ── */}
      <PersonalInfoSection
        personalInfo={form.personalInfo}
        onChange={handlePersonalInfo}
      />

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

      <ProjectsSection
        projects={form.projects}
        onAdd={handleAddProject}
        onChange={handleProjectChange}
        onRemove={handleRemoveProject}
      />

      <SkillsSection skills={form.skills} onChange={handleSkillsChange} />

      {/* ── View My Portfolio Button ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        <button
  className="btn btn-primary"
  style={{ width: "200px", justifyContent: "center" }}
  onClick={handleViewDashboard}
  disabled={status === "saving"}
>
  {status === "saving" ? "Saving..." : "🚀 View My Portfolio"}
</button>
      </div>

      {/* ── Bottom error ── */}
      {status === "error" && (
        <div className="msg msg-error" style={{ marginTop: 12 }}>
          <span className="msg-icon">⚠</span>
          <span>
            Auto-save failed. Check your connection — changes will retry
            automatically.
          </span>
        </div>
      )}
    </div>
  );
}
