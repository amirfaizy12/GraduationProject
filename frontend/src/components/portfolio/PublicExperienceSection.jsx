export default function PublicExperienceSection({ experience = [] }) {
  if (!experience.length) return null;

  return (
    <section id="experience" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 40, color: "#fff" }}>Experience & Education</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 10 }}>
        {experience.map((exp, index) => (
          <div key={index} style={{ borderLeft: "2px solid rgba(124, 92, 255, 0.3)", paddingLeft: 30, position: "relative" }}>
            {/* Timeline dot */}
            <div style={{
              position: "absolute",
              left: -8,
              top: 6,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "var(--brand)",
              boxShadow: "0 0 0 4px #050914"
            }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 20, color: "#fff", fontWeight: 700 }}>{exp.title || "Untitled Role"}</h3>
              <span style={{ fontSize: 14, color: "#9b7cff", fontWeight: 600, background: "rgba(124,92,255,0.1)", padding: "4px 12px", borderRadius: 99 }}>
                {exp.period}
              </span>
            </div>
            
            <div style={{ fontSize: 16, color: "var(--text)", fontWeight: 500, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              {exp.company}
            </div>
            
            <p style={{ margin: 0, lineHeight: 1.7, color: "var(--text-muted)", fontSize: 15, maxWidth: 800 }}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
