/**
 * PersonalInfoSection
 * Handles: Full Name, Title, Bio
 */
export default function PersonalInfoSection({ personalInfo, onChange }) {
  const bioLen = (personalInfo.bio || "").length;

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon">👤</div>
        <div>
          <div className="editor-section-title">Personal info</div>
          <div className="editor-section-desc">
            Your name, role, and a short bio
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
        <div className="char-counter">
          <span style={{ color: bioLen > 450 ? "var(--warning)" : undefined }}>
            {bioLen}
          </span>{" "}
          / 500
        </div>
      </div>
    </div>
  );
}
