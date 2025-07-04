import React, { useRef, useEffect, useState } from "react";
import Header from "./components/Navbar";
import IdleSection from "./section/IdleSection";
import WaveSection from "./section/WaveSection";
import DanceSection from "./section/DanceSection";
import ClapSection from "./section/ClapSection";
import CountdownPanel from "./components/CountdownPanel";
import Avatar from "./Avatar";
import DigitalFootprint from "./components/DigitalFootprint";
import GalacticCommand from "./components/GalacticCommand";
import ContactPanel from "./components/ContactPanel";
import GalacticFooter from "./components/GalacticFooter";

// LOADING SCREEN: Import the new component
import LoadingScreen from "./components/Loadingscreen"; 

const SECTIONS = [
  { id: "idle", label: "Salute", Component: IdleSection },
  { id: "wave", label: "Wave", Component: WaveSection },
  { id: "dance", label: "Bored", Component: DanceSection },
  { id: "clap", label: "Dance", Component: ClapSection },
];

function App() {
  // LOADING SCREEN: State for the loading sequence
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  // Your existing state - no changes needed
  const [action, setAction] = useState("Idle");
  const [inSection, setInSection] = useState(false);
  const sectionRefs = useRef([]);
  const countdownRef = useRef(null);
  const footprintRef = useRef(null);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [isCountdownPassed, setIsCountdownPassed] = useState(false);
  const [isFootprintVisible, setIsFootprintVisible] = useState(false);

  // LOADING SCREEN: Effect to handle the loading timer and animation
  useEffect(() => {
    // This effect runs only once when the app mounts
    const timer = setTimeout(() => {
      setIsLoading(false); // Trigger the fade-out of the loading screen
    }, 3000); // Set how long the loading screen is visible (e.g., 3 seconds)

    const animationTimer = setTimeout(() => {
      setIsAnimationDone(true); // Completely remove the loading screen from the DOM
    }, 3700); // This should be loading time + CSS animation duration (3000ms + 700ms)

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);


  // All of your existing useEffect hooks for IntersectionObserver and navigation
  // can remain exactly as they are. They will not run until the main content
  // is rendered and the user starts interacting with the page.
  
  // Observer for main content sections... (NO CHANGES TO THIS USEEFFECT)
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

  // useEffect for avatar visibility... (NO CHANGES TO THIS USEEFFECT)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === countdownRef.current) {
            setIsCountdownPassed(!entry.isIntersecting);
          } else if (entry.target === footprintRef.current) {
            setIsFootprintVisible(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0,
      }
    );

    const currentCountdownRef = countdownRef.current;
    const currentFootprintRef = footprintRef.current;

    if (currentCountdownRef) observer.observe(currentCountdownRef);
    if (currentFootprintRef) observer.observe(currentFootprintRef);

    return () => {
      if (currentCountdownRef) observer.unobserve(currentCountdownRef);
      if (currentFootprintRef) observer.unobserve(currentFootprintRef);
    };
  }, []);

  // useEffect to combine states... (NO CHANGES TO THIS USEEFFECT)
  useEffect(() => {
    setIsAvatarVisible(inSection && isCountdownPassed && !isFootprintVisible);
  }, [inSection, isCountdownPassed, isFootprintVisible]);

  // useEffect for nav clicks... (NO CHANGES TO THIS USEEFFECT)
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
      {/* LOADING SCREEN: Conditionally render the loading screen. */}
      {/* It will be removed from the DOM completely after its animation is done. */}
      {!isAnimationDone && <LoadingScreen isFading={!isLoading} />}

      {/* Main App Wrapper: This will contain your entire existing app. */}
      {/* We control its opacity to create a smooth fade-in effect after loading. */}
      <div
        className="main-app-content"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in",
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
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
          <div
            className="left-column"
            style={{
              width: "30vw",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              background: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
              opacity: isAvatarVisible ? 1 : 0,
              transform: isAvatarVisible ? "translateX(0)" : "translateX(-100%)",
              pointerEvents: isAvatarVisible ? "auto" : "none",
            }}
          >
            <Avatar action={action} />
          </div>

          <div
            className="right-column"
            style={{
              marginLeft: isAvatarVisible ? "30vw" : 0,
              width: isAvatarVisible ? "70vw" : "100vw",
              padding: "2em",
              minHeight: "calc(100vh - 60px)",
              transition: "margin-left 0.4s, width 0.4s",
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
        <div ref={footprintRef} className="footprint-galactic-wrapper">
           <div className="digital-footprint-container">
                 <DigitalFootprint />
          </div>
        <div className="galactic-command-container">
                 <GalacticCommand />
        </div>
        <div><ContactPanel/></div>
        <footer>
          <GalacticFooter/>
        </footer> 
        </div>
      </div>
    </div>
  );
}

export default App;