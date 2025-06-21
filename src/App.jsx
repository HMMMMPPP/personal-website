import React, { useRef, useEffect, useState } from "react";
import Header from "./components/Navbar";
import IdleSection from "./section/IdleSection";
import WaveSection from "./section/WaveSection";
import DanceSection from "./section/DanceSection";
import ClapSection from "./section/ClapSection";
import CountdownPanel from "./components/CountdownPanel";
import Avatar from "./Avatar";

const SECTIONS = [
  { id: "idle", label: "Idle", Component: IdleSection },
  { id: "wave", label: "Wave", Component: WaveSection },
  { id: "dance", label: "Dance", Component: DanceSection },
  { id: "clap", label: "Clap", Component: ClapSection },
];

function App() {
  const [action, setAction] = useState("Idle");
  const [inSection, setInSection] = useState(false);
  const sectionRefs = useRef([]);
  const countdownRef = useRef(null);
  const [showAvatar, setShowAvatar] = useState(false);

  // Observer for sections to determine if any section is in view and set the avatar action
  useEffect(() => {
    const observers = [];
    sectionRefs.current = sectionRefs.current.slice(0, SECTIONS.length);

    SECTIONS.forEach((section, idx) => {
      const ref = sectionRefs.current[idx];
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAction(section.label);
              setInSection(true);
            } else {
              setTimeout(() => {
                const stillInSection = sectionRefs.current.some(
                  (r) =>
                    r &&
                    r.getBoundingClientRect().top < window.innerHeight &&
                    r.getBoundingClientRect().bottom > 0
                );
                setInSection(stillInSection);
              }, 0);
            }
          });
        },
        { root: null, threshold: 0.6 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer, idx) => {
        const ref = sectionRefs.current[idx];
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Determine if countdown panel is in view
  useEffect(() => {
    function handleScroll() {
      if (!countdownRef.current) return;
      const rect = countdownRef.current.getBoundingClientRect();
      // If the bottom of the countdown panel is above the top of the viewport, it's out of view
      // If the bottom is below at least 1px of the viewport, it's in view
      const countdownInView = rect.bottom > 1;
      // Show avatar only if a section is in view and the countdown panel is NOT in view
      setShowAvatar(inSection && !countdownInView);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inSection]);

  // Handle nav clicks
  useEffect(() => {
    const handleNavClick = (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.hash &&
        SECTIONS.some((sec) => `#${sec.id}` === e.target.hash)
      ) {
        e.preventDefault();
        const id = e.target.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  return (
    <div className="app-root">
      <Header />
      <div ref={countdownRef}>
        <CountdownPanel />
      </div>
      <div
        className="main-content"
        style={{
          display: "flex",
          width: "100vw",
          minHeight: "100vh",
          boxSizing: "border-box",
          marginTop: 0,
        }}
      >
        {/* Avatar is only rendered if a section is in view AND the countdown panel is not in view */}
        {showAvatar && (
          <div
            className="left-column"
            style={{
              width: "30vw",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 60,
              background: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <Avatar action={action} />
          </div>
        )}
        <div
          className="right-column"
          style={{
            marginLeft: showAvatar ? "30vw" : 0,
            width: showAvatar ? "70vw" : "100vw",
            padding: "2em",
            background: "#f7f7f7",
            minHeight: "calc(100vh - 60px)",
            transition: "margin-left 0.3s, width 0.3s",
          }}
        >
          {SECTIONS.map((section, idx) => {
            const SectionComponent = section.Component;
            return (
              <SectionComponent
                key={section.id}
                ref={(el) => (sectionRefs.current[idx] = el)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;