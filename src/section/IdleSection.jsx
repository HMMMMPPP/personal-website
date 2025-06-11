import React from "react";

const IdleSection = React.forwardRef((props, ref) => (
  <section
    id="idle"
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
    <div
      style={{
        background: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
        borderRadius: "1.35em",
        boxShadow: "0 6px 32px 0 rgba(80,140,255,0.10)",
        padding: "2.5em 1.5em 2em 1.5em",
        maxWidth: 430,
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}
    >
      <img
        src="./public/ID picture.png"
        alt="Avatar"
        style={{
          width: 78,
          height: 78,
          borderRadius: "50%",
          boxShadow: "0 2px 16px #8fd3f477",
          objectFit: "cover",
          marginBottom: "1em",
          border: "3px solid #e0e7ff"
        }}
      />
      <h1
        style={{
          fontWeight: 800,
          fontSize: "1.7rem",
          letterSpacing: "0.06em",
          margin: 0,
          background: "linear-gradient(90deg, #4f8cff 0%, #21e6c1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center"
        }}
      >
        DEL REY L. VALMORIA
      </h1>
      <span
        style={{
          fontWeight: 600,
          color: "#78C2FF",
          fontSize: "1.1rem",
          letterSpacing: "0.02em",
          margin: "0.2em 0 1em 0"
        }}
      >
        STUDENT
      </span>
      <div style={{
        width: "100%",
        borderTop: "1.5px dashed #b3c6e099",
        margin: "1em 0 1.3em 0"
      }} />

      <div style={{ width: "100%", marginBottom: "1.1em" }}>
        <h3 style={{ margin: "0 0 0.3em 0", fontWeight: 700, color: "#2b4865" }}>Personal Information</h3>
        <ul style={{ margin: 0, paddingLeft: "1.15em", color: "#555", lineHeight: 1.7 }}>
          <li><span style={{ fontWeight: 600 }}>Age:</span> 18 years old</li>
          <li><span style={{ fontWeight: 600 }}>Gender:</span> Male</li>
          <li><span style={{ fontWeight: 600 }}>Birthday:</span> 06/27/2006</li>
          <li><span style={{ fontWeight: 600 }}>Address:</span></li>
        </ul>
      </div>
      <div style={{ width: "100%", marginBottom: "1.1em" }}>
        <h3 style={{ margin: "0 0 0.3em 0", fontWeight: 700, color: "#2b4865" }}>Contact</h3>
        <ul style={{ margin: 0, paddingLeft: "1.15em", color: "#555", lineHeight: 1.7 }}>
          <li><span style={{ fontWeight: 600 }}>📱</span> 09934299197</li>
          <li><span style={{ fontWeight: 600 }}>✉️</span> delvalmoria@gmail.com</li>
          <li><span style={{ fontWeight: 600 }}>🌐</span> facebook.com/delreyvalmoria7</li>
        </ul>
      </div>
      <div style={{ width: "100%" }}>
        <h3 style={{ margin: "0 0 0.3em 0", fontWeight: 700, color: "#2b4865" }}>Objective</h3>
        <div style={{
          fontStyle: "italic",
          color: "#345",
          background: "rgba(255,255,255,0.65)",
          borderRadius: "0.6em",
          padding: "0.8em 1em",
          boxShadow: "0 1px 8px #b3c6e022",
          marginBottom: "0.5em"
        }}>
          To obtain a challenging position in a dynamic organization where I can utilize my technical and creative skills to contribute effectively to the company's growth and success.
        </div>
      </div>
    </div>
    <div style={{
      position: "absolute",
      left: 0, right: 0, bottom: 16,
      textAlign: "center",
      fontSize: "1.05em",
      color: "#7ed6dfcc",
      fontWeight: 600,
      letterSpacing: ".01em"
    }}>
      <span role="img" aria-label="sparkles">✨</span> Striving for growth and excellence! <span role="img" aria-label="rocket">🚀</span>
    </div>
  </section>
));

export default IdleSection;