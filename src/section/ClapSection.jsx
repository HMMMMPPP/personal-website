import React, { useState, useEffect } from "react";

// --- Thematic Data & Icons for the ClapSection (with added details for debriefs) ---
const workExperiences = [
  {
    position: "Tech Representative",
    company: "LEGGO Information Technology Solutions",
    dates: "Dec 2023 – Jan 2025",
    address: "Unit 205 Cabrera Bldg, Quezon City",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" d="M256 32v448M352 256H160"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 192v256M400 288v128M112 288v128M192 112a64 64 0 00-128 0v336a64 64 0 00128 0V112zM320 112a64 64 0 01128 0v336a64 64 0 01-128 0V112z"/></svg>),
    debrief: [
        "Primary Objective: Streamline inter-departmental data flow and resource allocation.",
        "Performance Metric: Increased operational efficiency by 15% through automation scripts.",
        "Field Note: Managed logistics for three successful off-world marketing campaigns.",
    ]
  },
  {
    position: "Legal Office Staff",
    company: "TNC / TFF Documentation Services",
    dates: "Dec 2022 – Dec 2023",
    address: "26 B Makatig St, Quezon City",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>),
    debrief: [
        "Primary Objective: Ensure all outgoing transmissions and contracts adhered to local sector regulations.",
        "Performance Metric: Achieved a 99.8% compliance rate on all audited documents.",
        "Field Note: Specialized in the notarization and verification of high-stakes corporate treaties.",
        "Commendation: Praised for meticulous attention to detail and data integrity."
    ]
  }
];

const references = [
  { name: "Ms. Mary Grace V. Bautista", role: "CEO, TFF Documentation Services", contact: "+63 909 006 5171", icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" d="M432 112V96a48.14 48.14 0 00-48-48H128a48.14 48.14 0 00-48 48v320a48.14 48.14 0 0048 48h256a48.14 48.14 0 0048-48v-16"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 160l144 112 144-112"/></svg>) },
  { name: "Mr. Emman Macaranas", role: "Operations Manager, LEGGO IT Solutions", contact: "+63 929 817 6404", icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" d="M432 112V96a48.14 48.14 0 00-48-48H128a48.14 48.14 0 00-48 48v320a48.14 48.14 0 0048 48h256a48.14 48.14 0 0048-48v-16"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 160l144 112 144-112"/></svg>) }
];

// --- NEW Components for Ultimate Design ---

const DebriefModal = ({ experience, onClose }) => {
    if (!experience) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
            <div style={{ background: 'rgba(18, 27, 68, 0.9)', border: '1px solid rgba(0, 191, 255, 0.5)', clipPath: 'polygon(0 25px, 25px 0, 100% 0, 100% 100%, 0 100%)', padding: '2.5em 2em 2em 2em', maxWidth: 600, width: '90%', color: '#c0d0f0', fontFamily: "'Rajdhani', sans-serif", position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button style={{ position: 'absolute', top: '0px', right: '0px', background: 'none', border: 'none', color: '#61dafb', fontSize: '2rem', cursor: 'pointer', lineHeight: '1', padding: '0.5rem' }} onClick={onClose}>&times;</button>
                <h2 style={{ color: '#9bf8f4', margin: '0 0 0.5em 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mission Debrief</h2>
                <p style={{ color: '#61dafb', margin: '0 0 1.5em 0', fontStyle: 'italic', borderBottom: '1px solid rgba(0,191,255,0.2)', paddingBottom: '1em' }}>{experience.position} at {experience.company}</p>
                <ul style={{ margin: 0, paddingLeft: '1.2em', listStyleType: "'» '" }}>
                    {experience.debrief.map((detail, i) => (
                        <li key={i} style={{ marginBottom: '0.7em' }}>{detail}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const CommsMessage = ({ message, onEnd }) => {
    useEffect(() => {
        const timer = setTimeout(onEnd, 2000);
        return () => clearTimeout(timer);
    }, [onEnd]);
    return (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0, 191, 255, 0.9)', color: '#050818', fontFamily: "'Roboto Mono', monospace", padding: '0.8em 1.5em', borderRadius: '4px', zIndex: 3000, boxShadow: '0 0 20px #00bfff' }}>
            {message}
        </div>
    );
};

const ScrollAnimationStyleInjector = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .service-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.5s ease-out, transform 0.5s ease-out;
            }
            .service-card.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);
    return null;
}


const ClapSection = React.forwardRef((props, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedDebrief, setSelectedDebrief] = useState(null);
  const [commsMessage, setCommsMessage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => { // Stagger the animation
            entry.target.classList.add('is-visible');
          }, index * 150);
        }
      });
    }, { threshold: 0.2 });
    const items = document.querySelectorAll('.service-card');
    items.forEach(item => observer.observe(item));
    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  const handleReferenceClick = () => {
    setCommsMessage("// SECURE COMMS CHANNEL REQUESTED...");
  };
  
  const sectionStyle = { minHeight: '100vh', background: '#050818', overflow: 'hidden', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", scrollMarginTop: "80px", padding: "4em 2em", boxSizing: "border-box", position: "relative", fontFamily: "'Rajdhani', sans-serif", borderTop: '1px solid rgba(0, 191, 255, 0.2)' };
  const starfieldStyle = { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)', animation: 'space-travel 200s linear infinite' };
  const mainTitleStyle = { fontWeight: 700, fontSize: "2.5rem", letterSpacing: "0.1em", margin: "0 0 1.5em 0", color: '#9bf8f4', zIndex: 1, textTransform: 'uppercase', textShadow: "0 0 15px rgba(155, 248, 244, 0.5)" };
  const cardContainerStyle = { display: "flex", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: '1000px', gap: "2em", zIndex: 1, marginBottom: "4em" };
  const getCardStyle = (index) => ({ background: "rgba(18, 27, 68, 0.65)", backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 191, 255, 0.3)', clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))', padding: "2em 1.5em", margin: "0", flex: "1 1 300px", maxWidth: '380px', display: "flex", flexDirection: "column", alignItems: "center", position: "relative", transition: 'transform 0.3s ease, box-shadow 0.3s ease', transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)', boxShadow: hoveredIndex === index ? '0 0 35px rgba(0, 191, 255, 0.5)' : 'none', cursor: 'pointer' });
  const iconContainerStyle = { width: "50px", height: "50px", marginBottom: "1.2em", color: '#61dafb', filter: 'drop-shadow(0 0 8px rgba(97, 218, 251, 0.5))' };
  const referencesContainerStyle = { width: "100%", maxWidth: '900px', zIndex: 1, background: "rgba(10, 14, 35, 0.5)", borderRadius: "8px", border: '1px solid rgba(0, 191, 255, 0.2)', padding: "2em" };

  return (
    <section id="clap" ref={ref} style={sectionStyle}>
      <ScrollAnimationStyleInjector />
      <div style={starfieldStyle} />
      <h2 style={mainTitleStyle}>SERVICE RECORD</h2>
      
      <div style={cardContainerStyle}>
        {workExperiences.map((exp, idx) => (
          <div
            key={idx}
            className="service-card"
            style={getCardStyle(`exp-${idx}`)}
            onMouseEnter={() => setHoveredIndex(`exp-${idx}`)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedDebrief(exp)}
          >
            <div style={iconContainerStyle}>{exp.icon}</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.4em 0", color: "#e0eaff", textTransform: 'uppercase' }}>{exp.position}</h3>
            <p style={{ fontSize: "1.1rem", fontStyle: 'italic', margin: "0 0 0.8em 0", color: "#61dafb" }}>{exp.company}</p>
            <p style={{ fontSize: "0.9rem", margin: "0", color: "#c0d0f0", fontFamily: "'Roboto Mono', monospace" }}>{exp.dates}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2em 0 0 0", color: "rgba(192, 208, 240, 0.7)" }}>{exp.address}</p>
          </div>
        ))}
      </div>

      <div style={referencesContainerStyle}>
        <h3 style={{ margin: "0 0 1em 0", fontWeight: 700, fontSize: "1.3rem", color: "#9bf8f4", letterSpacing: "0.1em", textTransform: 'uppercase' }}>// CHARACTER VOUCHING</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2em' }}>
            {references.map((ref, idx) => (
                <div key={idx} style={{ flex: '1 1 300px', maxWidth: '350px', textAlign: 'center', cursor: 'pointer', padding: '1em', borderRadius: '8px', transition: 'background-color 0.3s' }} onClick={handleReferenceClick} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,191,255,0.1)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div style={{ width: "40px", height: "40px", margin: '0 auto 0.5em auto', color: '#61dafb' }}>{ref.icon}</div>
                    <h4 style={{ color: "#e0eaff", margin: '0 0 0.2em 0', fontSize: '1.1rem' }}>{ref.name}</h4>
                    <p style={{ color: "rgba(192, 208, 240, 0.8)", margin: '0 0 0.4em 0', fontSize: '1rem', fontStyle: 'italic' }}>{ref.role}</p>
                    <p style={{ color: "#61dafb", margin: 0, fontFamily: "'Roboto Mono', monospace" }}>{ref.contact}</p>
                </div>
            ))}
        </div>
      </div>
      
      <DebriefModal experience={selectedDebrief} onClose={() => setSelectedDebrief(null)} />
      {commsMessage && <CommsMessage message={commsMessage} onEnd={() => setCommsMessage(null)} />}
    </section>
  );
});

export default ClapSection;
