export default function PublicProjectsSection({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>     
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 40, color: "#fff" }}>Projects</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {projects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="public-project-card"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              background: "rgba(255,255,255,.02)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
              e.currentTarget.style.borderColor = "rgba(124,92,255,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {project.imageUrl ? (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                style={{ width: "100%", height: 200, objectFit: "cover", borderBottom: "1px solid rgba(255,255,255,0.05)" }} 
              />
            ) : (
              <div style={{ width: "100%", height: 200, background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "grid", placeItems: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>No Image</span>
              </div>
            )}
            
            <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, color: "#fff" }}>{project.title || "Untitled Project"}</h3>
  
              <p style={{ margin: "0 0 20px", color: "var(--text-muted)", lineHeight: 1.6, flex: 1, fontSize: 15 }}>
                {project.description || "No description added yet."}
              </p>
  
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 13,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: "rgba(124,92,255,0.15)",
                      color: "#9b7cff",
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}