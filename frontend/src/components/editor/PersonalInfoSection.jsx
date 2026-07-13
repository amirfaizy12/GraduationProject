import { User, Wand2 } from "lucide-react";

/**
 * PersonalInfoSection
 * Handles: Full Name, Title, Bio
 */
export default function PersonalInfoSection({ personalInfo, onChange }) {
  const bioLen = (personalInfo.bio || "").length;

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon"><User size={24} /></div>
        <div>
          <div className="editor-section-title">Personal info</div>
          <div className="editor-section-desc">
            Your name, role, bio, and social links
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            className="form-input"
            placeholder="Jane Smith"
            value={personalInfo.fullName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Job title
          </label>
          <input
            id="title"
            name="title"
            className="form-input"
            placeholder="Frontend Developer"
            value={personalInfo.title}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          className="form-textarea"
          placeholder="A short paragraph about yourself, your background, and what you're passionate about…"
          value={personalInfo.bio}
          onChange={onChange}
          maxLength={500}
          rows={4}
        />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
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
              // Add a quick click animation
              e.currentTarget.style.transform = "scale(0.95)";
              setTimeout(() => {
                if (e.target) e.target.style.transform = "translateY(0)";
              }, 150);

              const name = personalInfo.fullName || "A passionate professional";
              const title = personalInfo.title || "developer";
              const templates = [
                `Hello! I'm ${name}, a dedicated ${title} with a strong passion for building innovative and user-friendly digital experiences. I thrive on solving complex problems and turning creative ideas into reality.`,
                `I am a results-driven ${title} focused on delivering high-quality solutions. My name is ${name}, and I specialize in crafting elegant, scalable, and efficient products that make an impact.`,
                `Welcome! I'm ${name}, an experienced ${title}. I love bridging the gap between design and technology, continuously learning new skills, and collaborating with others to create meaningful projects.`,
              ];
              const randomBio = templates[Math.floor(Math.random() * templates.length)];
              onChange({ target: { name: "bio", value: randomBio } });
            }}
          >
            <Wand2 size={14} />
            Auto-write Bio
          </button>

          <div className="char-counter" style={{ marginTop: 0 }}>
            <span style={{ color: bioLen > 450 ? "var(--warning)" : undefined }}>
              {bioLen}
            </span>{" "}
            / 500
          </div>
        </div>
      </div>

      <div className="editor-section-title" style={{ marginTop: 32, marginBottom: 16, fontSize: 18 }}>Social Links</div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="github">GitHub</label>
          <input
            id="github"
            name="github"
            type="url"
            className="form-input"
            placeholder="https://github.com/janesmith"
            value={personalInfo.github || ""}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="linkedin">LinkedIn</label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            className="form-input"
            placeholder="https://linkedin.com/in/janesmith"
            value={personalInfo.linkedin || ""}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="twitter">Twitter</label>
          <input
            id="twitter"
            name="twitter"
            type="url"
            className="form-input"
            placeholder="https://twitter.com/janesmith"
            value={personalInfo.twitter || ""}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="url"
            className="form-input"
            placeholder="https://janesmith.com"
            value={personalInfo.website || ""}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
