import { Zap, X, Plus } from "lucide-react";
import { useState } from "react";

const SUGGESTED_SKILLS = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", 
  "HTML/CSS", "Next.js", "Tailwind CSS", "UI/UX Design", "Figma",
  "MongoDB", "PostgreSQL", "Docker", "Git", "AWS"
];

/**
 * SkillsSection
 * Modern token-input UX with quick-add suggestions.
 */
export default function SkillsSection({ skills, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCustomSkill();
    } else if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();
      if (skills.length > 0) {
        onChange(skills.slice(0, -1));
      }
    }
  };

  const addCustomSkill = () => {
    const val = inputValue.trim();
    if (val && !skills.includes(val)) {
      onChange([...skills, val]);
    }
    setInputValue("");
  };

  const toggleSkill = (skillName) => {
    if (skills.includes(skillName)) {
      onChange(skills.filter((s) => s !== skillName));
    } else {
      onChange([...skills, skillName]);
    }
  };

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon"><Zap size={24} /></div>
        <div>
          <div className="editor-section-title">Skills</div>
          <div className="editor-section-desc">
            Type custom skills or select from the popular list below
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Your Skills</label>
        <div className="skills-input-container">
          {skills.map((skill, i) => (
            <span className="skill-chip modern" key={i}>
              {skill}
              <button
                type="button"
                className="skill-remove-btn"
                onClick={() => toggleSkill(skill)}
                aria-label={`Remove ${skill}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <input
            className="skills-input-field"
            placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add another..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addCustomSkill}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: 24, marginBottom: 0 }}>
        <label className="form-label" style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Suggested Skills
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
          {SUGGESTED_SKILLS.map((suggestion) => {
            const isSelected = skills.includes(suggestion);
            return (
              <button
                key={suggestion}
                type="button"
                onClick={() => toggleSkill(suggestion)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: isSelected 
                    ? "1px solid var(--brand)" 
                    : "1px solid var(--border)",
                  background: isSelected 
                    ? "var(--brand)" 
                    : "transparent",
                  color: isSelected 
                    ? "#fff" 
                    : "var(--text)",
                }}
              >
                {isSelected ? <X size={14} /> : <Plus size={14} />}
                {suggestion}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
