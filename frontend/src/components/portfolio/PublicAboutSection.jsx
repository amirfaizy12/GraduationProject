export default function PublicAboutSection({ personalInfo }) {
  if (!personalInfo?.bio) return null;

  return (
    <section id="about" style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, color: "#fff" }}>About Me</h2>
      <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--text-muted)", maxWidth: 800 }}>
        {personalInfo.bio}
      </p>
    </section>
  );
}