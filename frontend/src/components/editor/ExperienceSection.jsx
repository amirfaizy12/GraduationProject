import { Clock, PlusCircle, Wand2 } from "lucide-react";

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
            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 12 }}>
              <button
                type="button"
                style={{ 
                  fontSize: 13, 
                  padding: "6px 14px", 
                  borderRadius: 99, 
                  background: "linear-gradient(135deg, rgba(124, 92, 255, 0.1), rgba(192, 132, 252, 0.1))",
                  color: "#c084fc",
                  border: "1px solid rgba(192, 132, 252, 0.2)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(124, 92, 255, 0.1)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(124, 92, 255, 0.2), rgba(192, 132, 252, 0.2))";
                  e.currentTarget.style.borderColor = "rgba(192, 132, 252, 0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(124, 92, 255, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(124, 92, 255, 0.1), rgba(192, 132, 252, 0.1))";
                  e.currentTarget.style.borderColor = "rgba(192, 132, 252, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(124, 92, 255, 0.1)";
                }}
                onClick={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                  setTimeout(() => {
                    if (e.target) e.target.style.transform = "translateY(0)";
                  }, 150);

                  const role = exp.title || "team member";
                  const comp = exp.company || "the company";
                  const templates = [
                    `Spearheaded key initiatives as a ${role} at ${comp}, driving significant improvements in performance and user satisfaction. Collaborated cross-functionally to deliver high-impact projects on time.`,
                    `Contributed to core product development at ${comp} as a ${role}. Focused on optimizing existing workflows, implementing new features, and ensuring best practices were maintained across the engineering team.`,
                    `Served as a ${role} at ${comp}, where I took ownership of complex tasks and consistently delivered results. Mentored junior team members and participated actively in architectural discussions.`,
                  ];
                  const randomDesc = templates[Math.floor(Math.random() * templates.length)];
                  onChange(index, { target: { name: "description", value: randomDesc } });
                }}
              >
                <Wand2 size={14} />
                Auto-write Description
              </button>
            </div>
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
