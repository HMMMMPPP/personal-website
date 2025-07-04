import React, { useState, useEffect } from "react";

// --- Thematic Data & Icons for the DanceSection ---
// UPDATED: Added a 'details' array to each object for the interactive dossier.
const educations = [
  {
    level: "Aeronautical Academia",
    school: "PATTS College of Aeronautics",
    course: "BS Aeronautical Engineering",
    batch: "IN PROGRESS",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M32 192L256 64l224 128-224 128L32 192z"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 240v128l144 80 144-80V240m-288 64l144 80 144-80M256 64v136"/></svg>),
    details: [
        "Specialization Track: Not Specified",
        "Key Modules: Calculus, CADD Design, Phyics",
        "Commendation: Survived Subject."
    ]
  },
  {
    level: "STEM Indoctrination",
    school: "Arellano University – Juan Sumulong Campus",
    course: "Science, Technology, Engineering, and Mathematics",
    batch: "CYCLE 2023–2024",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M448 341.37V170.63a32 32 0 00-16-27.71L264 42.29a32 32 0 00-32 0L64 142.92a32 32 0 00-16 27.71v170.74a32 32 0 0016 27.71l168 100.63a32 32 0 0032 0l168-100.63a32 32 0 0016-27.71z"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M64 143l192 112 192-112M256 464V255"/></svg>),
    details: [
        "Field of Study: Advanced Mathematics & Physics Concentration",
        "Key Project: Prototyped a functional magnetic energy generator.",
        "Achievement: Awarded 'Excellence in Applied Math/Sciences' citation."
    ]
  },
  {
    level: "Secondary Protocol Training",
    school: "Talipapa High School",
    course: "",
    batch: "CYCLE 2021–2022",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="352" rx="48" ry="48"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M336 144a80 80 0 00-160 0"/></svg>),
     details: [
        "Focus Area: Foundational Sciences and Logic.",
        "Extracurricular: President of Math 2022 and Social Studies 2022.",
        "Record: Maintained top-quartile performance metrics."
    ]
  },
  {
    level: "Primary Indoctrination",
    school: "Talipapa Elementary School",
    course: "",
    batch: "CYCLE 2016–2017",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M32 96v320h448V96M48 192h416M128 288h256"/></svg>),
    details: [
        "Core Competencies: Acquired baseline logic and language protocols.",
        "Status: All developmental milestones achieved ahead of schedule.",
        "Record: Top 1.5 overall placer",
    ]
  }
];

// --- NEW: Dossier Modal Component ---
const DossierModal = ({ dossier, onClose }) => {
    if (!dossier) return null;

    const modalBackdropStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
        zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    };
    const modalContentStyle = {
        background: 'rgba(18, 27, 68, 0.9)', border: '1px solid rgba(0, 191, 255, 0.5)',
        clipPath: 'polygon(0 25px, 25px 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 0 100%)',
        padding: '2.5em 2em 2em 2em', maxWidth: 600, width: '90%',
        color: '#c0d0f0', fontFamily: "'Rajdhani', sans-serif", position: 'relative'
    };
    const closeButtonStyle = {
        position: 'absolute', top: '-1px', right: '24px', background: 'none',
        border: 'none', color: '#61dafb', fontSize: '2rem', cursor: 'pointer',
        lineHeight: '1', padding: '0.5rem'
    };

    return (
        <div style={modalBackdropStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                <button style={closeButtonStyle} onClick={onClose}>&times;</button>
                <h2 style={{ color: '#9bf8f4', margin: '0 0 0.5em 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dossier: {dossier.level}</h2>
                <p style={{ color: '#61dafb', margin: '0 0 1.5em 0', fontStyle: 'italic', borderBottom: '1px solid rgba(0,191,255,0.2)', paddingBottom: '1em' }}>{dossier.school}</p>
                <h4 style={{ color: '#e0eaff', margin: '0 0 0.5em 0', textTransform: 'uppercase' }}>Record Details:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2em', listStyleType: "'» '" }}>
                    {dossier.details.map((detail, i) => (
                        <li key={i} style={{ marginBottom: '0.7em' }}>{detail}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- NEW: StyleInjector for scroll animations ---
const ScrollAnimationStyleInjector = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .timeline-item-hidden {
                opacity: 0;
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .timeline-item-hidden.align-left {
                transform: translateX(-50px);
            }
            .timeline-item-hidden.align-right {
                transform: translateX(50px);
            }
            .timeline-item-hidden.is-visible {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);
    return null;
}

/**
 * DanceSection Component
 * Renders an educational history as a futuristic vertical timeline.
 * Features on-scroll animations and interactive pop-up dossiers.
 */
const DanceSection = React.forwardRef((props, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedDossier, setSelectedDossier] = useState(null);

  // NEW: IntersectionObserver for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.3 });

    const items = document.querySelectorAll('.timeline-item-hidden');
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const sectionStyle = {
    minHeight: '100vh', background: '#050818', overflow: 'hidden', display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", scrollMarginTop: "80px", padding: "4em 2em",
    boxSizing: "border-box", position: "relative", fontFamily: "'Rajdhani', sans-serif", borderTop: '1px solid rgba(0, 191, 255, 0.2)',
  };
  const starfieldStyle = {
    width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0,
    backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)', animation: 'space-travel 200s linear infinite',
  };
  const mainTitleStyle = {
    fontWeight: 700, fontSize: "2.5rem", letterSpacing: "0.1em", margin: "0 0 2em 0", color: '#9bf8f4',
    zIndex: 1, textTransform: 'uppercase', textShadow: "0 0 15px rgba(155, 248, 244, 0.5)",
  };
  const timelineContainerStyle = { position: 'relative', width: '100%', maxWidth: '800px', zIndex: 1 };
  const timelineTrackStyle = { position: 'absolute', left: '50%', top: 0, bottom: 0, transform: 'translateX(-50%)', width: '2px', background: 'linear-gradient(to bottom, transparent, rgba(0, 191, 255, 0.5) 10%, rgba(0, 191, 255, 0.5) 90%, transparent 100%)' };
  const getTimelineItemStyle = (index) => ({ position: 'relative', display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '3em' });
  const getTimelineContentStyle = (index) => ({ width: 'calc(50% - 40px)', background: 'rgba(18, 27, 68, 0.65)', border: '1px solid rgba(0, 191, 255, 0.3)', padding: '1.5em', borderRadius: '8px', textAlign: index % 2 === 0 ? 'right' : 'left', transition: 'transform 0.3s ease, box-shadow 0.3s ease', transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)', boxShadow: hoveredIndex === index ? '0 0 25px rgba(0, 191, 255, 0.4)' : 'none' });
  const getTimelineIconStyle = (index) => ({
    position: 'absolute', top: '50%', left: '50%', width: '50px', height: '50px', borderRadius: '50%',
    background: '#050818', border: '2px solid rgba(0, 191, 255, 0.6)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#61dafb', transition: 'all 0.3s ease', padding: '10px', cursor: 'pointer',
    boxShadow: hoveredIndex === index ? '0 0 20px #00bfff' : '0 0 10px rgba(0, 191, 255, 0.5)', transform: `translate(-50%, -50%) scale(${hoveredIndex === index ? 1.1 : 1})`
  });

  return (
    <section id="dance" ref={ref} style={sectionStyle}>
      <ScrollAnimationStyleInjector />
      <div style={starfieldStyle} />
      <h2 style={mainTitleStyle}>TRAINING RECORD</h2>
      <div style={timelineContainerStyle}>
        <div style={timelineTrackStyle}></div>
        {educations.map((edu, idx) => (
          <div
            key={idx}
            className={`timeline-item-hidden ${idx % 2 === 0 ? 'align-right' : 'align-left'}`}
            style={getTimelineItemStyle(idx)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={getTimelineContentStyle(idx)}>
              <h3 style={{ color: '#e0eaff', margin: '0 0 0.3em 0', fontSize: '1.2rem', textTransform: 'uppercase' }}>{edu.level}</h3>
              <p style={{ color: '#61dafb', margin: '0 0 0.5em 0', fontStyle: 'italic', fontSize: '1rem' }}>{edu.school}</p>
              {edu.course && <p style={{ color: '#c0d0f0', margin: '0 0 1em 0', fontSize: '0.9rem' }}>{edu.course}</p>}
              <span style={{ fontFamily: "'Roboto Mono', monospace", color: 'rgba(0, 191, 255, 0.7)', fontSize: '0.8rem', background: 'rgba(0, 191, 255, 0.1)', padding: '0.2em 0.5em', borderRadius: '4px' }}>{edu.batch}</span>
            </div>
            <div style={getTimelineIconStyle(idx)} onClick={() => setSelectedDossier(edu)}>
              {edu.icon}
            </div>
          </div>
        ))}
      </div>
      <DossierModal dossier={selectedDossier} onClose={() => setSelectedDossier(null)} />
    </section>
  );
});

export default DanceSection;
