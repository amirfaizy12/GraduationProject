export default function PublicSkillsSection({ skills = [] }) {
    if (!skills.length) return null;
  
    return (
        <div className="editor-section" id="skills">
        <h2 className="editor-section-title">Skills</h2>
  
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: "rgba(124,92,255,.14)",
                border: "1px solid rgba(124,92,255,.25)",
                fontWeight: 700,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }