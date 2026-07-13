export default function PublicExperienceSection({ experience = [] }) {
  if (!experience.length) return null;

  return (
    <section id="experience" style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <h2 style={{ fontSize: "clamp(32px, 5vw, 40px)", fontWeight: 900, marginBottom: 60, color: "#fff", letterSpacing: "-1px" }}>
        Experience & Education
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, paddingLeft: 12, position: "relative" }}>
        {/* Glowing vertical line */}
        <div style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 17,
          width: 2,
          background: "linear-gradient(to bottom, rgba(124,92,255,0.8), rgba(32,201,151,0.2) 80%, transparent)",
          boxShadow: "0 0 15px rgba(124,92,255,0.5)"
        }} />

        {experience.map((exp, index) => (
          <div key={index} style={{ paddingLeft: 48, position: "relative" }}>
            {/* Premium Timeline dot */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 24,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#03060d",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 0 0 4px #03060d",
              zIndex: 2
            }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a5b4fc, #7c5cff)",
                boxShadow: "0 0 20px #7c5cff"
              }} />
            </div>
            
            <div className="public-glass-card public-hover-lift" style={{ padding: "32px 40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 24, color: "#fff", fontWeight: 800, letterSpacing: "-0.5px" }}>
                    {exp.title || "Untitled Role"}
                  </h3>
                  <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#20c997" }} />
                    {exp.company}
                  </div>
                </div>
                <span style={{ 
                  fontSize: 14, 
                  color: "#e2e8f0", 
                  fontWeight: 600, 
                  background: "rgba(255,255,255,0.08)", 
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "6px 16px", 
                  borderRadius: 99,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  backdropFilter: "blur(10px)"
                }}>
                  {exp.period}
                </span>
              </div>
              
              <p style={{ margin: 0, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", fontSize: 16, maxWidth: 850 }}>
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
