import { ExternalLink } from "lucide-react";

export default function PublicProjectsSection({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" style={{ padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>     
      <style>
        {`
          .project-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }
          .project-row:nth-child(even) .project-image-col {
            order: 2;
          }
          .project-row:nth-child(even) .project-text-col {
            order: 1;
          }
          
          .project-image-wrap {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            aspect-ratio: 16 / 10;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.05);
            transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease;
            cursor: pointer;
          }
          .project-image-wrap:hover {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px rgba(124, 92, 255, 0.2);
            border-color: rgba(124, 92, 255, 0.3);
          }
          .project-image-wrap:hover img {
            transform: scale(1.05) translateZ(0);
          }
          .project-image-wrap:hover .project-overlay {
            opacity: 1;
          }

          @media (max-width: 800px) {
            .project-row {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .project-row:nth-child(even) .project-image-col,
            .project-row:nth-child(odd) .project-image-col {
              order: 1 !important;
            }
            .project-row:nth-child(even) .project-text-col,
            .project-row:nth-child(odd) .project-text-col {
              order: 2 !important;
            }
          }
        `}
      </style>

      <h2 style={{ fontSize: "clamp(36px, 6vw, 48px)", fontWeight: 900, marginBottom: 80, color: "#fff", letterSpacing: "-1.5px", textAlign: "center" }}>
        Selected Work
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 120 }}>
        {projects.map((project, index) => (
          <div key={`${project.title}-${index}`} className="project-row">
            
            {/* Image Column */}
            <div className="project-image-col">
              <div className="project-image-wrap">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: "100%", 
                    height: "100%", 
                    background: "linear-gradient(135deg, rgba(124,92,255,0.1), rgba(32,201,151,0.05))", 
                    display: "grid", 
                    placeItems: "center"
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "2px" }}>NO IMAGE</span>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div 
                  className="project-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(5, 9, 20, 0.4)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div style={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: "50%", 
                    background: "rgba(255,255,255,0.1)", 
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "#fff"
                  }}>
                    <ExternalLink size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="project-text-col">
              <h3 style={{ margin: "0 0 20px", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>
                {project.title || "Untitled Project"}
              </h3>
  
              <p style={{ 
                margin: "0 0 32px", 
                color: "rgba(255,255,255,0.7)", 
                lineHeight: 1.8, 
                fontSize: 18,
                fontWeight: 400
              }}>
                {project.description || "No description added yet."}
              </p>
  
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 14,
                      padding: "8px 16px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#e2e8f0",
                      fontWeight: 500,
                      letterSpacing: "0.5px"
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