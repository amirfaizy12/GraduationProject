export default function PublicAboutSection({ personalInfo }) {
    if (!personalInfo?.bio) return null;
  
    return (
        <div className="editor-section" id="about">
        <h2 className="editor-section-title">About Me</h2>
        <p className="editor-subtitle" style={{ lineHeight: 1.8 }}>
          {personalInfo.bio}
        </p>
      </div>
    );
  }