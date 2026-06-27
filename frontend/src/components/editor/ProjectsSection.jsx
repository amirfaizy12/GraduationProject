/**
 * ProjectsSection
 * Dynamic list of projects: title, description, tags
 * Immutable updates only (no array mutation)
 */
export default function ProjectsSection({
  projects,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon">🚀</div>
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
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🗂</div>
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
