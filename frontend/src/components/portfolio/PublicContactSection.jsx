export default function PublicContactSection({ personalInfo }) {
    if (!personalInfo) return null;
  
    return (
      <div className="editor-section" id="contact">
        <h2 className="editor-section-title">Contact</h2>
  
        <p className="editor-subtitle" style={{ marginBottom: 18 }}>
          Interested in working together? Use the contact information below.
        </p>
  
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>✉</span>
              Gmail
            </a>
          )}
  
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>⌘</span>
              GitHub
            </a>
          )}
  
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span>in</span>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    );
  }