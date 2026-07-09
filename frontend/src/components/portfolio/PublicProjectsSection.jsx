export default function PublicProjectsSection({ projects = [] }) {
    if (!projects.length) return null;
  
    return (
<div className="editor-section" id="projects">     
       <h2 className="editor-section-title">Projects</h2>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: 18,
                background: "rgba(255,255,255,.02)",
              }}
            >
              <h3 style={{ marginTop: 0 }}>{project.title || "Untitled Project"}</h3>
  
              <p className="editor-subtitle">
                {project.description || "No description added yet."}
              </p>
  
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,.06)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }