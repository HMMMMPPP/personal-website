import React from "react";

const workExperiences = [
  {
    position: "Legal Office Staff",
    company: "TNC / TFF Documentation Services",
    dates: "Dec 30, 2022 – Dec 21, 2023",
    address: "26 B Makatig St, Quezon City",
    icon: "https://img.icons8.com/color/96/briefcase.png"
  },
  {
    position: "Admin Officer",
    company: "LEGGO Information Technology Solutions",
    dates: "Dec 26, 2023 – Jan 31, 2025",
    address: "Unit 205 Cabrera Bldg, Quezon City",
    icon: "https://img.icons8.com/color/96/office.png"
  }
];

const references = [
  {
    name: "Ms. Mary Grace Valmoria Bautista",
    role: "CEO, TFF Documentation Services",
    contact: "+63 909 006 5171",
    icon: "https://img.icons8.com/color/96/administrator-female.png"
  },
  {
    name: "Mr. Enman Macaranas",
    role: "Operations Manager, LEGGO IT Solutions",
    contact: "+63 929 817 6404",
    icon: "https://img.icons8.com/color/96/administrator-male.png"
  }
];

const cardGradients = [
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
];

const cardStyleBase = {
  border: "none",
  borderRadius: "1.2em",
  boxShadow: "0 6px 24px rgba(90,140,255,0.08)",
  padding: "2.2em 1.5em 1.5em 1.5em",
  margin: "1.5em 1em",
  minWidth: 220,
  maxWidth: 310,
  flex: "1 1 260px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
  overflow: "hidden"
};

const ClapSection = React.forwardRef((props, ref) => (
  <section
    id="clap"
    ref={ref}
    className="page-section"
    style={{
      height: "90vh",
      minHeight: 400,
      marginBottom: "5vh",
      border: "2px solid #b3c6e0",
      borderRadius: "1.4em",
      background: "linear-gradient(120deg, #fcf6f6 70%, #e2ebff 100%)",
      backdropFilter: "blur(8px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontSize: "1.15rem",
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
      background: "linear-gradient(90deg, #f5576c 0%, #8ec5fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      alignSelf: "center",
      textShadow: "0 4px 16px #f8e8fa"
    }}>
      Work Experience
    </h2>
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
      {workExperiences.map((exp, idx) => (
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
          <img
            src={exp.icon}
            alt="Work Icon"
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
            fontSize: "1.13rem",
            fontWeight: 700,
            margin: "0 0 0.4em 0",
            textAlign: "center",
            color: "#7a3b69",
            letterSpacing: "0.01em"
          }}>{exp.position}</h3>
          <div style={{
            fontWeight: 500,
            marginBottom: "0.32em",
            color: "#33384a",
            textAlign: "center"
          }}>{exp.company}</div>
          <div style={{
            fontSize: "0.98em",
            fontStyle: "italic",
            color: "#5a5a8c",
            marginBottom: ".3em",
            textAlign: "center"
          }}>{exp.dates}</div>
          <div style={{
            color: "#4f4f4faa",
            fontSize: "0.97em",
            marginTop: "0.24em",
            textAlign: "center"
          }}>{exp.address}</div>
        </div>
      ))}
    </div>

    <div style={{
      width: "100%",
      marginTop: "2em",
      marginBottom: "1em",
      background: "linear-gradient(90deg, #ffe6fa 60%, #e0e7ff 100%)",
      borderRadius: "0.9em",
      boxShadow: "0 1px 8px rgba(33,230,193,0.05)",
      padding: "1.8em 2vw",
      boxSizing: "border-box",
      alignSelf: "center",
      border: "1.2px solid #e0c3fc"
    }}>
      <h2 style={{
        margin: 0,
        fontWeight: 700,
        fontSize: "1.28rem",
        marginBottom: "0.7em",
        color: "#d72660",
        letterSpacing: "0.02em"
      }}>
        <span role="img" aria-label="reference">🤝</span> References
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2em",
        alignItems: "stretch",
        justifyContent: "center"
      }}>
        {references.map((ref, idx) => (
          <div key={idx} style={{
            background: "rgba(255,255,255,0.86)",
            borderRadius: ".85em",
            boxShadow: "0 1px 6px #e0c3fc55",
            padding: "1em 1.2em",
            minWidth: 210,
            maxWidth: 260,
            marginBottom: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "1 1 160px"
          }}>
            <img src={ref.icon} alt="Ref Icon" style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginBottom: ".5em",
              background: "#fff9",
              boxShadow: "0 1px 4px #e0c3fc44"
            }}/>
            <div style={{ fontWeight: 700, color: "#7a3b69", marginBottom: ".2em", textAlign: "center" }}>{ref.name}</div>
            <div style={{ fontWeight: 500, color: "#444", fontSize: ".98em", textAlign: "center" }}>{ref.role}</div>
            <div style={{ color: "#d72660", fontSize: ".98em", marginTop: ".4em", wordBreak: "break-all" }}>{ref.contact}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{
      position: "absolute",
      left: 0, right: 0, bottom: 16,
      textAlign: "center",
      fontSize: "1.04em",
      color: "#d72660bb",
      fontWeight: 600,
      letterSpacing: ".01em"
    }}>
      <span role="img" aria-label="clap">👏</span> Experience shapes excellence! <span role="img" aria-label="star">🌟</span>
    </div>
  </section>
));

export default ClapSection;