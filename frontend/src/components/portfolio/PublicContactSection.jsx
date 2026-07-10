import { Mail, Globe } from "lucide-react";

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function PublicContactSection({ personalInfo }) {
  if (!personalInfo) return null;

  return (
    <footer id="contact" style={{ padding: "100px 0 60px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
      <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16, color: "#fff", letterSpacing: "-1px" }}>
        Let's Work Together
      </h2>

      <p style={{ fontSize: 18, color: "var(--text-muted)", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
        Interested in collaborating or have an open role? Feel free to reach out.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {personalInfo.email && (
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn btn-primary"
            style={{ padding: "12px 24px", borderRadius: 99, fontSize: 15 }}
          >
            <Mail size={18} style={{ marginRight: 8 }} />
            Email Me
          </a>
        )}

        {personalInfo.github && (
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ padding: "12px 24px", borderRadius: 99, fontSize: 15, background: "rgba(255,255,255,0.05)" }}
          >
            <GithubIcon size={18} />
            GitHub
          </a>
        )}

        {personalInfo.linkedin && (
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ padding: "12px 24px", borderRadius: 99, fontSize: 15, background: "rgba(255,255,255,0.05)" }}
          >
            <LinkedinIcon size={18} />
            LinkedIn
          </a>
        )}
        
        {personalInfo.twitter && (
          <a
            href={personalInfo.twitter}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ padding: "12px 24px", borderRadius: 99, fontSize: 15, background: "rgba(255,255,255,0.05)" }}
          >
            <TwitterIcon size={18} />
            Twitter
          </a>
        )}
        
        {personalInfo.website && (
          <a
            href={personalInfo.website}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ padding: "12px 24px", borderRadius: 99, fontSize: 15, background: "rgba(255,255,255,0.05)" }}
          >
            <Globe size={18} />
            Website
          </a>
        )}
      </div>
      
      <div style={{ marginTop: 80, color: "var(--text-muted)", fontSize: 14 }}>
        © {new Date().getFullYear()} {personalInfo.fullName || "Portfolio"}. All rights reserved.
      </div>
    </footer>
  );
}