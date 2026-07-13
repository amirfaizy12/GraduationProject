export default function PublicSkillsSection({ skills = [] }) {
  if (!skills.length) return null;

  // Duplicate the array multiple times to ensure the marquee has enough content to loop seamlessly,
  // regardless of how few skills the user actually has.
  const row1Skills = [...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills];
  const row2Skills = [...skills].reverse();
  const row2Repeated = [...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills];

  return (
    <section id="skills" style={{ padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          .marquee-container {
            position: relative;
            width: 100vw;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            gap: 32px;
            /* Fade out the edges so the pills disappear smoothly */
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            padding: 20px 0;
          }
          
          .marquee-track {
            display: flex;
            width: max-content;
            gap: 32px;
          }
          
          .marquee-track.left {
            animation: marqueeLeft 120s linear infinite;
          }
          
          .marquee-track.right {
            animation: marqueeRight 120s linear infinite;
          }
          
          /* Pause animation when the user hovers over the ribbon */
          .marquee-track:hover {
            animation-play-state: paused;
          }
          
          .skill-pill {
            padding: 20px 48px;
            border-radius: 100px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.7);
            font-size: 22px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 16px;
            backdrop-filter: blur(10px);
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
            cursor: default;
            white-space: nowrap;
          }
          
          .skill-pill:hover {
            background: rgba(124, 92, 255, 0.15);
            border-color: rgba(124, 92, 255, 0.4);
            color: #fff;
            transform: scale(1.08) translateY(-4px);
            box-shadow: 0 20px 40px rgba(124, 92, 255, 0.2);
            z-index: 10;
          }
          
          .skill-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #7c5cff;
            box-shadow: 0 0 15px #7c5cff;
          }
          
          /* Alternate color for the second row's dots */
          .marquee-track.right .skill-dot {
            background: #20c997;
            box-shadow: 0 0 15px #20c997;
          }
        `}
      </style>

      <h2 style={{ fontSize: "clamp(36px, 6vw, 48px)", fontWeight: 900, marginBottom: 64, color: "#fff", letterSpacing: "-1.5px", textAlign: "center" }}>
        Expertise & Technologies
      </h2>

      <div className="marquee-container">
        {/* Row 1: Moves Left */}
        <div className="marquee-track left">
          {row1Skills.map((skill, index) => (
            <div key={`r1-${index}`} className="skill-pill">
              <div className="skill-dot" />
              {skill}
            </div>
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="marquee-track right">
          {row2Repeated.map((skill, index) => (
            <div key={`r2-${index}`} className="skill-pill">
              <div className="skill-dot" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}