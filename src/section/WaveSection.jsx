import React, { useState } from "react";

// --- Thematic Data & Icons for the WaveSection ---
// Icons are chosen for a more abstract, techy look. You can replace the SVG code with imported components if you prefer.
const skills = [
  {
    title: "Core Programming",
    // Icon from https://ionic.io/ionicons
    icon: ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320"/></svg> ),
    details: ["HTML/CSS/JS", "Python, C++", "MySQL, Git"],
    level: "Proficient"
  },
  {
    title: "Productivity Suite",
    icon: ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 240h160M176 320h160M176 400h80M256 64V48a16 16 0 0116-16h64a16 16 0 0116 16v16"/></svg> ),
    details: ["Google Workspace", "MS Office Suite", "Data Analysis"],
    level: "Advanced"
  },
  {
    title: "Design & Engineering",
    icon: ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M358.62 129.38L201.38 286.62A24 24 0 00218.62 320h174.76A24 24 0 00416 292.62V117.86A24 24 0 00393.38 96 24 24 0 00358.62 129.38zM96 218.62L253.38 375.9A24 24 0 00288 393.38H392a24 24 0 0021.38-34.62L256 128l-90.62 90.62A24 24 0 0096 218.62z"/></svg> ),
    details: ["Figma (UI/UX)", "Canva", "AutoCAD, SolidWorks"],
    level: "Intermediate"
  },
  {
    title: "Version Control",
    icon: ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="128" cy="256" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="384" cy="112" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><circle cx="384" cy="400" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M175.08 284.41l161.84 87.03M175.08 227.59l161.84-87.03"/></svg> ),
    details: ["Git", "GitHub", "Branching Strategies"],
    level: "Proficient"
  }
];

const certifications = [
  "CIIT Figma UI/UX Design",
  "Code Clash - PATTS Participation",
  "Data Analyst - Coursera (In Progress)",
];

/**
 * WaveSection Component
 * Displays a futuristic "Skill Matrix" with animated data modules.
 * It's designed to be used within the spaceship-themed portfolio.
 *
 * This component needs the following CSS to be available globally for animations:
 * @keyframes space-travel {
 * 0% { background-position: 0 0; }
 * 100% { background-position: 0 10000px; }
 * }
 * And the "Rajdhani" and "Roboto Mono" fonts.
 */
const WaveSection = React.forwardRef((props, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // --- Styles defined inside the component ---
  const sectionStyle = {
    minHeight: '100vh',
    background: '#050818',
    overflow: 'hidden',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    scrollMarginTop: "80px",
    padding: "4em 2em",
    boxSizing: "border-box",
    position: "relative",
    fontFamily: "'Rajdhani', sans-serif",
    borderTop: '1px solid rgba(0, 191, 255, 0.2)',
  };

  const starfieldStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)',
    animation: 'space-travel 200s linear infinite',
  };
  
  const mainTitleStyle = {
    fontWeight: 700,
    fontSize: "2.5rem",
    letterSpacing: "0.1em",
    margin: "0 0 1.5em 0",
    color: '#9bf8f4',
    zIndex: 1,
    textTransform: 'uppercase',
    textShadow: "0 0 15px rgba(155, 248, 244, 0.5)",
  };

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: '1200px',
    gap: "2em",
    zIndex: 1,
  };

  const getCardStyle = (index) => ({
    background: "rgba(18, 27, 68, 0.65)",
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 191, 255, 0.3)',
    clipPath: 'polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
    padding: "2em 1.5em",
    margin: "0",
    flex: "1 1 250px",
    maxWidth: '280px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)',
    boxShadow: hoveredIndex === index ? '0 0 35px rgba(0, 191, 255, 0.5)' : 'none',
  });

  const iconContainerStyle = {
    width: "60px",
    height: "60px",
    marginBottom: "1.2em",
    color: '#61dafb',
    filter: 'drop-shadow(0 0 8px rgba(97, 218, 251, 0.5))',
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 700,
    margin: "0 0 0.8em 0",
    textAlign: "center",
    color: "#e0eaff",
    letterSpacing: "0.05em",
    textTransform: 'uppercase',
  };

  const detailListStyle = {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    textAlign: "center",
    fontSize: "1rem",
    color: "#c0d0f0",
    lineHeight: 1.6,
  };
  
  const levelBadgeStyle = {
    position: "absolute",
    top: 12,
    right: 12,
    background: "rgba(0, 191, 255, 0.15)",
    color: "#9bf8f4",
    fontWeight: 600,
    fontSize: "0.75em",
    borderRadius: "4px",
    padding: "0.3em 0.7em",
    letterSpacing: "0.05em",
    border: '1px solid rgba(0, 191, 255, 0.3)',
  };

  const certsSectionStyle = {
    width: "100%",
    maxWidth: '900px',
    marginTop: "4em",
    zIndex: 1,
    background: "rgba(10, 14, 35, 0.5)",
    borderRadius: "8px",
    border: '1px solid rgba(0, 191, 255, 0.2)',
    padding: "2em",
  };

  const certsTitleStyle = {
    margin: 0,
    fontWeight: 700,
    fontSize: "1.3rem",
    marginBottom: "1em",
    color: "#9bf8f4",
    letterSpacing: "0.1em",
    textTransform: 'uppercase',
  };
  
  const certsListStyle = {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#c0d0f0",
    fontFamily: "'Roboto Mono', monospace",
  };

  return (
    <section id="wave" ref={ref} style={sectionStyle}>
      <div style={starfieldStyle} />
      
      <h2 style={mainTitleStyle}>SKILL MATRIX</h2>
      
      <div style={cardContainerStyle}>
        {skills.map((skill, idx) => (
          <div
            key={idx}
            style={getCardStyle(idx)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={levelBadgeStyle}>{skill.level}</div>
            <div style={iconContainerStyle}>{skill.icon}</div>
            <h3 style={cardTitleStyle}>{skill.title}</h3>
            <ul style={detailListStyle}>
              {skill.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={certsSectionStyle}>
        <h3 style={certsTitleStyle}>// Authorized Clearances</h3>
        <ul style={certsListStyle}>
          {certifications.map((cert, idx) => (
            <li key={idx}>&gt; {cert}</li>
          ))}
        </ul>
      </div>

    </section>
  );
});

export default WaveSection;
