import React from "react";

const educations = [
  {
    level: "Bachelor’s Degree (In Progress)",
    school: "PATTS College of Aeronautics",
    course: "BS in Aeronautical Engineering",
    batch: ""
  },
  {
    level: "Senior High School (STEM)",
    school: "Arellano University – Juan Sumulong Campus",
    course: "Science, Technology, Engineering, and Mathematics",
    batch: "Batch 2023–2024"
  },
  {
    level: "Junior High School",
    school: "Talipapa High School",
    course: "",
    batch: "Batch 2021–2022"
  },
  {
    level: "Elementary School",
    school: "Talipapa Elementary School",
    course: "",
    batch: "Batch 2016–2017"
  }
];

// Example icons for each level (replace with your own or use SVGs)
const icons = [
  "https://img.icons8.com/color/96/000000/graduation-cap.png", // Bachelor's
  "https://img.icons8.com/color/96/000000/school-building.png", // Senior High
  "https://img.icons8.com/color/96/000000/school.png", // Junior High
  "https://img.icons8.com/color/96/000000/open-book--v2.png", // Elementary
];

const cardGradient = [
  "linear-gradient(135deg, #8fd3f4 0%, #84fab0 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
  "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)"
];

const cardStyleBase = {
  border: "none",
  borderRadius: "1.4em",
  boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
  padding: "2em 1.5em 1.5em 1.5em",
  margin: "1.5em 1em",
  minWidth: 210,
  maxWidth: 300,
  flex: "1 1 230px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
  overflow: "hidden",
};

// Responsive container for the cards
const DanceSection = React.forwardRef((props, ref) => (
  <section
    id="dance"
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
    }}>
      Education
    </h2>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        gap: "1.5em",
        boxSizing: "border-box",
        flex: 1,
        overflowY: "auto",
        marginBottom: "1.5em"
      }}
    >
      {educations.map((edu, idx) => (
        <div
          key={idx}
          style={{
            ...cardStyleBase,
            background: cardGradient[idx % cardGradient.length],
            boxShadow: "0 6px 32px 0 rgba(80,140,255,0.13)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 8px 36px 0 rgba(80,140,255,0.20)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1.0)";
            e.currentTarget.style.boxShadow = "0 6px 32px 0 rgba(80,140,255,0.13)";
          }}
        >
          <img
            src={icons[idx]}
            alt="level icon"
            style={{
              width: 54,
              height: 54,
              marginBottom: "1em",
              background: "#fff8",
              borderRadius: "50%",
              boxShadow: "0 2px 8px #0002"
            }}
          />
          <h3 style={{
            fontSize: "1.12rem",
            fontWeight: 700,
            margin: "0 0 0.3em 0",
            textAlign: "center",
            color: "#284476",
            letterSpacing: "0.02em"
          }}>{edu.level}</h3>
          <div style={{
            fontWeight: 500,
            marginBottom: "0.32em",
            color: "#2e2e2e",
            textAlign: "center"
          }}>{edu.school}</div>
          {edu.course && (
            <div style={{
              fontStyle: "italic",
              color: "#404080",
              marginBottom: "0.38em",
              textAlign: "center"
            }}>{edu.course}</div>
          )}
          {edu.batch && (
            <div style={{
              color: "#4f4f4faa",
              fontSize: "0.97em",
              marginTop: "0.44em"
            }}>{edu.batch}</div>
          )}
        </div>
      ))}
    </div>
    <div style={{
      position: "absolute",
      left: 0, right: 0, bottom: 12,
      textAlign: "center",
      fontSize: "1.02em",
      color: "#888b",
      letterSpacing: ".01em"
    }}>
      ✨ Lifelong learning is a journey! ✨
    </div>
  </section>
));

export default DanceSection;