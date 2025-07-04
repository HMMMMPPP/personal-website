import React, { useState, useEffect } from "react";

// --- SVG Icons (No changes needed) ---
const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.5em', flexShrink: 0, filter: 'drop-shadow(0 0 3px #61dafb)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.5em', flexShrink: 0, filter: 'drop-shadow(0 0 3px #61dafb)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const GlobeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.5em', flexShrink: 0, filter: 'drop-shadow(0 0 3px #61dafb)' }}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);

// --- Component to inject CSS for new animations and styles ---
const StyleInjector = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 25px rgba(0, 191, 255, 0.2), inset 0 0 15px rgba(0, 191, 255, 0.1); }
                50% { box-shadow: 0 0 35px rgba(0, 191, 255, 0.4), inset 0 0 20px rgba(0, 191, 255, 0.2); }
            }
            @keyframes pulse-avatar-glow {
                0%, 100% { box-shadow: 0 0 15px #00bfff99, inset 0 0 5px #00bfff44; }
                50% { box-shadow: 0 0 25px #00bfff, inset 0 0 8px #00bfff77; }
            }
            @keyframes space-travel {
                0% { background-position: 0 0; }
                100% { background-position: 0 10000px; }
            }
            @keyframes scanline {
                0% { transform: translateY(0); }
                100% { transform: translateY(100%); }
            }
            @keyframes flicker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    return null;
};


// --- Live Clock Component (Enhanced) ---
const LiveClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    
    const formattedDate = '2025-06-22';
    const formattedTime = time.toLocaleTimeString('en-GB'); // Use 24-hour format

    return (
        <div style={{
            color: '#61dafb',
            fontSize: '0.8em',
            letterSpacing: '0.1em',
            textShadow: '0 0 5px rgba(97, 218, 251, 0.7)',
            marginBottom: '1em',
            fontFamily: "'Roboto Mono', monospace",
        }}>
            // SYS.TIME: {formattedDate}::{formattedTime}
        </div>
    );
};

// --- Decorative Corner Bracket Component ---
const CornerBracket = ({ position }) => {
    const baseStyle = {
        position: 'absolute',
        width: '25px',
        height: '25px',
        borderStyle: 'solid',
        borderColor: 'rgba(0, 191, 255, 0.6)',
        opacity: 0.7,
    };
    const style = { ...baseStyle, ...position };
    return <div style={style} />;
};


const IdleSection = React.forwardRef((props, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!isHovered) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const cardStyle = {
        background: "rgba(18, 27, 68, 0.65)",
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 191, 255, 0.3)',
        // NEW: Switched to clip-path for an angular, spaceship panel look
        clipPath: 'polygon(0 25px, 25px 0, calc(100% - 25px) 0, 100% 25px, 100% calc(100% - 25px), calc(100% - 25px) 100%, 25px 100%, 0 calc(100% - 25px))',
        padding: "2.5em 2em",
        maxWidth: 520, // Slightly wider
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        transition: 'transform 0.1s ease-out',
        animation: 'pulse-glow 5s infinite ease-in-out',
        zIndex: 2,
    };
    
    if (isHovered) {
        const rotateX = (mousePos.y / 260 - 0.5) * -15; // Adjusted sensitivity
        const rotateY = (mousePos.x / 260 - 0.5) * 15;
        cardStyle.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    }

    return (
        <section
            id="idle"
            ref={ref}
            className="page-section"
            style={{
                height: "100vh",
                minHeight: 800,
                background: `#050818`, // Darker space background
                overflow: 'hidden',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scrollMarginTop: "80px",
                padding: "2em",
                boxSizing: "border-box",
                position: "relative",
                fontFamily: "'Rajdhani', sans-serif", // A more futuristic font
            }}
        >
            <StyleInjector />
            {/* NEW: Starfield is now a separate div for better layering */}
            <div style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)',
                // NEW: Animation simulates forward motion
                animation: 'space-travel 200s linear infinite',
            }}/>
            
            {/* NEW: Cockpit Frame Elements */}
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '2px solid rgba(97, 218, 251, 0.1)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 28, left: 28, right: 28, bottom: 28, border: '1px solid rgba(97, 218, 251, 0.05)', zIndex: 1, pointerEvents: 'none' }} />

            <div
                style={cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
                onMouseMove={handleMouseMove}
            >
                {/* NEW: Decorative corner brackets on the main panel */}
                <CornerBracket position={{ top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }} />
                <CornerBracket position={{ top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }} />
                <CornerBracket position={{ bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }} />
                <CornerBracket position={{ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }} />

                {/* NEW: Scanline effect for the "screen" */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0, 191, 255, 0.1) 1px, transparent 1px)', backgroundSize: '100% 4px', animation: 'scanline 10s linear infinite', zIndex: 3, pointerEvents: 'none' }}/>

                <LiveClock />
                <img
                    src="https://placehold.co/150x150/0f1a3a/61dafb?text=DV"
                    alt="Avatar"
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        border: "3px solid #00bfff",
                        objectFit: "cover",
                        marginBottom: "1em",
                        animation: 'pulse-avatar-glow 4s infinite ease-in-out',
                        zIndex: 4,
                    }}
                />
                <h1 style={{ fontWeight: 700, fontSize: "1.8rem", letterSpacing: "0.1em", margin: "0.2em 0", background: "linear-gradient(90deg, #61dafb 0%, #9bf8f4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textAlign: "center", zIndex: 4, textTransform: 'uppercase' }}>
                    Del Rey L. Valmoria
                </h1>
                <span style={{ fontWeight: 500, color: "#61dafb", fontSize: "1rem", letterSpacing: "0.2em", margin: "0.4em 0 1.2em 0", textShadow: "0 0 8px rgba(97, 218, 251, 0.7)", zIndex: 4, textTransform: 'uppercase' }}>
                    Single // STUDENT
                </span>
                <div style={{ width: "80%", height: '1px', background: 'linear-gradient(to right, transparent, rgba(0, 191, 255, 0.5), transparent)', margin: "1em 0 1.5em 0", zIndex: 4 }} />

                <div style={{ width: "100%", color: "#c0d0f0", lineHeight: 1.7, zIndex: 4 }}>
                    <h3 style={{ margin: "0 0 0.5em 0", fontWeight: 700, color: "#9bf8f4", letterSpacing: '0.1em', textTransform: 'uppercase' }}>// BIOMETRIC SCAN</h3>
                    <ul style={{ margin: 0, paddingLeft: '1em', listStyleType: "'» '" }}>
                        <li><span style={{ fontWeight: 600, color: '#e0eaff' }}>Unit Age:</span> 18 Cycles</li>
                        <li><span style={{ fontWeight: 600, color: '#e0eaff' }}>Designation:</span> Male</li>
                        <li><span style={{ fontWeight: 600, color: '#e0eaff' }}>Genesis Date:</span> 06.27.2006</li>
                        <li><span style={{ fontWeight: 600, color: '#e0eaff' }}>Home Port:</span> Caloocan, Metro Manila</li>
                    </ul>

                    <h3 style={{ margin: "1.2em 0 0.5em 0", fontWeight: 700, color: "#9bf8f4", letterSpacing: '0.1em', textTransform: 'uppercase' }}>// COMMS CHANNEL</h3>
                    <ul style={{ margin: 0, padding: 0, listStyleType: 'none', color: "#c0d0f0" }}>
                        <li style={{display: 'flex', alignItems: 'center'}}><PhoneIcon /> 09934299197</li>
                        <li style={{display: 'flex', alignItems: 'center', marginTop: '0.5em'}}><MailIcon /> delvalmoria@gmail.com</li>
                        <li style={{display: 'flex', alignItems: 'center', marginTop: '0.5em'}}><GlobeIcon /> facebook.com/delreyvalmoria7</li>
                    </ul>

                    <h3 style={{ margin: "1.2em 0 0.5em 0", fontWeight: 700, color: "#9bf8f4", letterSpacing: '0.1em', textTransform: 'uppercase' }}>// PRIME DIRECTIVE</h3>
                    <div style={{ fontStyle: "italic", color: "#a9c1ff", background: "rgba(10, 14, 35, 0.7)", borderRadius: "0.6em", padding: "0.8em 1em", borderLeft: '3px solid #00bfff' }}>
                        To secure a challenging flight officer role, leveraging advanced technical and creative piloting skills to contribute decisively to the vessel's strategic objectives and mission success.
                    </div>
                </div>
            </div>

            <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, textAlign: "center", fontSize: "0.9em", color: "rgba(0, 191, 255, 0.7)", fontWeight: 400, letterSpacing: ".2em", fontFamily: "'Roboto Mono', monospace", animation: 'flicker 3s infinite' }}>
                &lt;&lt; SYSTEM STATUS: ALL SYSTEMS NOMINAL &gt;&gt;
            </div>
        </section>
    );
});

export default IdleSection;