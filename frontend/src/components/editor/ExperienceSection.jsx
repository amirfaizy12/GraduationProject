import { Clock, PlusCircle } from "lucide-react";

export default function ExperienceSection({ experience, onAdd, onChange, onRemove }) {
  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon"><Clock size={24} /></div>
        <div>
          <div className="editor-section-title">Experience & Education</div>
          <div className="editor-section-desc">Share your professional journey</div>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: "auto" }}
          onClick={onAdd}
          type="button"
        >
          + Add entry
        </button>
      </div>

      {experience.length === 0 && (
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
          <PlusCircle size={32} />
          No experience added yet. Add your work history or education.
        </div>
      )}

      {experience.map((exp, index) => (
        <div className="project-card" key={index}>
          <div className="project-card-header">
            <span className="project-number">Entry {index + 1}</span>
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
            <label className="form-label">Role or Degree</label>
            <input
              name="title"
              className="form-input"
              placeholder="e.g. Senior Frontend Developer"
              value={exp.title || ""}
              onChange={(e) => onChange(index, e)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company or Institution</label>
              <input
                name="company"
                className="form-input"
                placeholder="e.g. Google"
                value={exp.company || ""}
                onChange={(e) => onChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Period</label>
              <input
                name="period"
                className="form-input"
                placeholder="e.g. 2021 - Present"
                value={exp.period || ""}
                onChange={(e) => onChange(index, e)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="What were your responsibilities or achievements?"
              value={exp.description || ""}
              onChange={(e) => onChange(index, e)}
              rows={3}
            />
          </div>
        </div>
      ))}

      {experience.length > 0 && (
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "100%", marginTop: 4 }}
          onClick={onAdd}
        >
          + Add another entry
        </button>
      )}
    </div>
  );
}
