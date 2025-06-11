  import React, { useRef, useEffect, useState } from "react";
  import Avatar from "./Avatar";
  import Header from "./components/Navbar";
  import IdleSection from "./section/IdleSection";
  import WaveSection from "./section/WaveSection";
  import DanceSection from "./section/DanceSection";
  import ClapSection from "./section/ClapSection";

  const SECTIONS = [
    { id: "idle", label: "Idle", Component: IdleSection },
    { id: "wave", label: "Wave", Component: WaveSection },
    { id: "dance", label: "Dance", Component: DanceSection },
    { id: "clap", label: "Clap", Component: ClapSection },
  ];

  function App() {
    const [action, setAction] = useState("Idle");
    const sectionRefs = useRef([]);

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
        <div
          className="main-content"
          style={{
            display: "flex",
            width: "100vw",
            minHeight: "-10vh",
            boxSizing: "border-box",
          }}
        >
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
          <div
            className="right-column"
            style={{
              marginLeft: "30vw",
              width: "70vw",
              padding: "2em",
              background: "#f7f7f7",
              minHeight: "calc(100vh - 60px)",
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