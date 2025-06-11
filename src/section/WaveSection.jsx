import React from "react";

// Example images: replace with your own image URLs or import statements if local images
const skills = [
  {
    title: "Programming & Development",
    image: "https://img.icons8.com/color/96/000000/source-code.png",
    details: [
      "HTML, CSS, JavaScript, Python, C++, MySQL, Git"
    ]
  },
  {
    title: "Productivity Tools",
    image: "https://img.icons8.com/color/96/000000/ms-excel.png",
    details: [
      "Google Sheets, Microsoft Excel, Word, PowerPoint"
    ]
  },
  {
    title: "Design & UI/UX",
    image: "https://img.icons8.com/color/96/000000/figma--v1.png",
    details: [
      "Canva, Figma (UI/UX Design), AutoCAD, SolidWorks"
    ]
  },
  {
    title: "Version Control & Collaboration",
    image: "https://img.icons8.com/color/96/000000/github--v1.png",
    details: [
      "Git, GitHub"
    ]
  }
];

const certifications = [
  "Google Workspace (Sheets, Docs, Slides)",
  "Canva Design for Social Media & Presentations",
  "Figma UI/UX Interface Design",
  "AutoCAD & SolidWorks for Engineering Design"
];

const cardGradients = [
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
];

const cardStyleBase = {
  border: "none",
  borderRadius: "1.2em",
  boxShadow: "0 6px 24px rgba(90,140,255,0.08)",
  padding: "2.2em 1.5em 1.5em 1.5em",
  margin: "1.5em 1em",
  minWidth: 200,
  maxWidth: 270,
  flex: "1 1 230px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
  overflow: "hidden",
};

const imageStyle = {
  width: "64px",
  height: "64px",
  marginBottom: "1em",
  background: "#fff9",
  borderRadius: "50%",
  boxShadow: "0 2px 8px #0001",
  objectFit: "contain"
};

const badgeStyle = {
  position: "absolute",
  top: 18,
  right: 18,
  background: "rgba(255,255,255,0.7)",
  color: "#6d5acf",
  fontWeight: 700,
  fontSize: "0.84em",
  borderRadius: "0.5em",
  padding: "0.3em 0.9em",
  boxShadow: "0 1px 6px #0001",
  letterSpacing: "0.05em"
};

const WaveSection = React.forwardRef((props, ref) => (
  <section
    id="wave"
    ref={ref}
    className="page-section"
    style={{
      height: "90vh",
      minHeight: 400,
      marginBottom: "5vh",
      border: "2px solid #b3c6e0",
      borderRadius: "1.4em",
      background: "linear-gradient(120deg, #f8fafc 70%, #e0e7ff 100%)",
      backdropFilter: "blur(8px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontSize: "1.2rem",
      fontWeight: "normal",
      scrollMarginTop: "80px",
      padding: "3em 1.5vw 3em 1.5vw",
      boxSizing: "border-box",
      width: "100%",
      maxWidth: "100%",
      marginLeft: 0,
      marginRight: 0,
      overflow: "auto",
      position: "relative"
    }}
  >
    <h2 style={{
      margin: "0 0 1.5em 0",
      fontWeight: 800,
      fontSize: "2.3rem",
      letterSpacing: "0.04em",
      background: "linear-gradient(90deg, #4f8cff 0%, #21e6c1 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      alignSelf: "center",
      textShadow: "0 4px 16px #d8f8fa"
    }}>Technical Skills</h2>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        gap: "1.5em",
        boxSizing: "border-box",
        flex: 1,
        overflowY: "auto",
        alignItems: "stretch",
        marginBottom: "1.5em"
      }}
    >
      {skills.map((skill, idx) => (
        <div
          key={idx}
          style={{
            ...cardStyleBase,
            background: cardGradients[idx % cardGradients.length],
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 10px 32px 0 rgba(90,140,255,0.18)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1.0)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(90,140,255,0.08)";
          }}
        >
          <span style={badgeStyle}>{skill.title.split(" ")[0]}</span>
          {skill.image && (
            <img src={skill.image} alt={skill.title + " icon"} style={imageStyle} />
          )}
          <h3 style={{
            fontSize: "1.13rem",
            fontWeight: 700,
            margin: "0 0 0.7em 0",
            textAlign: "center",
            color: "#284476",
            letterSpacing: "0.01em"
          }}>{skill.title}</h3>
          <ul style={{
            margin: 0,
            paddingLeft: "1.1em",
            textAlign: "left",
            fontSize: "1.04em",
            color: "#333"
          }}>
            {skill.details.map((detail, i) => (
              <li key={i} style={{ marginBottom: "0.5em" }}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{
      width: "100%",
      marginTop: "2em",
      marginBottom: "1em",
      background: "linear-gradient(90deg, #fff6 60%, #e0e7ff 100%)",
      borderRadius: "0.9em",
      boxShadow: "0 1px 8px rgba(33,230,193,0.05)",
      padding: "1.8em 2vw",
      boxSizing: "border-box",
      alignSelf: "center",
      border: "1.2px solid #d6e6fa"
    }}>
      <h2 style={{
        margin: 0,
        fontWeight: 700,
        fontSize: "1.28rem",
        marginBottom: "0.7em",
        color: "#1f7a8c",
        letterSpacing: "0.02em"
      }}>
        <span role="img" aria-label="certificate">🎓</span> Certifications &amp; Tools Mastery
      </h2>
      <ul style={{
        margin: 0,
        paddingLeft: "1.3em",
        fontSize: "1.08em",
        lineHeight: "1.7",
        color: "#23334a"
      }}>
        {certifications.map((cert, idx) => (
          <li key={idx}>{cert}</li>
        ))}
      </ul>
    </div>
    <div style={{
      position: "absolute",
      left: 0, right: 0, bottom: 16,
      textAlign: "center",
      fontSize: "1.01em",
      color: "#7ed6dfcc",
      fontWeight: 600,
      letterSpacing: ".01em"
    }}>
      <span role="img" aria-label="sparkles">✨</span> Always learning, always growing! <span role="img" aria-label="rocket">🚀</span>
    </div>
  </section>
));

export default WaveSection;