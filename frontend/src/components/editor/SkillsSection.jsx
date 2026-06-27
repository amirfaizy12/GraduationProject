/**
 * SkillsSection
 * Comma-separated input that live-previews as chips
 */
export default function SkillsSection({ skills, onChange }) {
  // Convert the skills array back to comma-separated string for the input
  const displayValue = skills.join(", ");

  const handleChange = (e) => {
    // Split by comma, trim each entry, filter blanks
    const raw = e.target.value;
    const arr = raw.split(",").map((s) => s.trimStart()); // trimStart so cursor feels natural
    onChange(arr);
  };

  // Rendered chips: exclude empty or whitespace-only strings
  const chips = skills.filter((s) => s.trim().length > 0);

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon">⚡</div>
        <div>
          <div className="editor-section-title">Skills</div>
          <div className="editor-section-desc">
            Separate each skill with a comma
          </div>
        </div>
      </div>

      <div
        className="form-group"
        style={{ marginBottom: chips.length ? 12 : 0 }}
      >
        <input
          className="form-input"
          placeholder="React, Node.js, TypeScript, Figma…"
          value={displayValue}
          onChange={handleChange}
        />
      </div>

      {chips.length > 0 && (
        <div className="skills-preview">
          {chips.map((skill, i) => (
            <span className="skill-chip" key={i}>
              {skill.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
