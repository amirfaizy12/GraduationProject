export default function PublicSkillsSection({ skills = [] }) {
  if (!skills.length) return null;

  return (
    <section id="skills" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32, color: "#fff" }}>Skills</h2>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              background: "rgba(124,92,255,0.1)",
              border: "1px solid rgba(124,92,255,0.2)",
              color: "#9b7cff",
              fontWeight: 600,
              fontSize: 15,
              transition: "transform 0.2s, background 0.2s",
              cursor: "default"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(124,92,255,0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(124,92,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}