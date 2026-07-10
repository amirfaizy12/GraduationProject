import { Briefcase, FolderPlus, Loader2, Image as ImageIcon, Camera } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";

/**
 * ProjectsSection
 * Dynamic list of projects: title, description, imageUrl
 * Immutable updates only (no array mutation)
 */
export default function ProjectsSection({
  projects,
  onAdd,
  onChange,
  onRemove,
}) {
  const [uploading, setUploading] = useState({});

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG, PNG, WebP, etc.).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5 MB.");
      return;
    }

    setUploading((prev) => ({ ...prev, [index]: true }));
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await api.post("/upload", data);

      const imageUrl = res.data.url.startsWith("http")
        ? res.data.url
        : `http://localhost:3000${res.data.url}`;

      // Mock event to pass to onChange
      const fakeEvent = {
        target: { name: "imageUrl", value: imageUrl },
      };
      onChange(index, fakeEvent);
    } catch (err) {
      alert("Upload failed — please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon"><Briefcase size={24} /></div>
        <div>
          <div className="editor-section-title">Projects</div>
          <div className="editor-section-desc">Showcase your best work</div>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: "auto" }}
          onClick={onAdd}
          type="button"
        >
          + Add project
        </button>
      </div>

      {projects.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "32px 16px",
            color: "var(--text-muted)",
            background: "var(--bg-base)",
            borderRadius: "var(--radius-md)",
            border: "1px dashed var(--border)",
            fontSize: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FolderPlus size={32} />
          No projects yet. Add your first one to get started.
        </div>
      )}

      {projects.map((project, index) => (
        <div className="project-card" key={index}>
          <div className="project-card-header">
            <span className="project-number">Project {index + 1}</span>
            <div className="project-card-header-actions">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Image</label>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {project.imageUrl ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={project.imageUrl}
                    alt="Project preview"
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "8px",
                    background: "var(--bg-base)",
                    border: "1px dashed var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  <ImageIcon size={24} />
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label className="btn btn-secondary btn-sm" style={{ cursor: "pointer", width: "fit-content" }}>
                  {uploading[index] ? (
                    <><Loader2 size={14} className="lucide-spin" /> Uploading...</>
                  ) : (
                    <><Camera size={14} style={{ marginRight: "4px" }} /> {project.imageUrl ? "Change image" : "Upload image"}</>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(index, e)}
                    disabled={uploading[index]}
                  />
                </label>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>JPG, PNG, WebP — max 5 MB</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`project-title-${index}`}>
              Project title
            </label>
            <input
              id={`project-title-${index}`}
              name="title"
              className="form-input"
              placeholder="e.g. E-commerce Platform"
              value={project.title}
              onChange={(e) => onChange(index, e)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor={`project-desc-${index}`}>
              Description
            </label>
            <input
              id={`project-desc-${index}`}
              name="description"
              className="form-input"
              placeholder="What did you build? What problem did it solve?"
              value={project.description}
              onChange={(e) => onChange(index, e)}
            />
          </div>
        </div>
      ))}

      {projects.length > 0 && (
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "100%", marginTop: 4 }}
          onClick={onAdd}
        >
          + Add another project
        </button>
      )}
    </div>
  );
}
