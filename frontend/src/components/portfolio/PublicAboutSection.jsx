export default function PublicAboutSection({ personalInfo }) {
  if (!personalInfo?.bio) return null;

  return (
    <section id="about" style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <h2 style={{ fontSize: "clamp(32px, 5vw, 40px)", fontWeight: 900, marginBottom: 40, color: "#fff", letterSpacing: "-1px" }}>
        About Me
      </h2>
      
      <div className="public-glass-card public-hover-lift" style={{ 
        padding: "40px 48px", 
        borderLeft: "4px solid #9b7cff",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle glow effect behind text */}
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-10%",
          width: "50%",
          height: "200%",
          background: "radial-gradient(ellipse at left, rgba(124,92,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <p style={{ 
          fontSize: 20, 
          lineHeight: 1.8, 
          color: "rgba(255,255,255,0.85)", 
          maxWidth: 900,
          margin: 0,
          position: "relative",
          zIndex: 1,
          fontWeight: 400
        }}>
          {personalInfo.bio}
        </p>
      </div>
    </section>
  );
}