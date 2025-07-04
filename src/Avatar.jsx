import React, { useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html } from "@react-three/drei";

// --- CSS for the Avatar Component ---
const AvatarCSS = `
  @keyframes animated-grid { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
  @keyframes vertical-scan { 0%, 100% { transform: translateY(-50%); } 50% { transform: translateY(50%); } }
`;

// Helper component to inject CSS
const StyleInjector = ({ css }) => {
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = css;
        document.head.appendChild(styleTag);
        return () => { document.head.removeChild(styleTag); };
    }, [css]);
    return null;
};

// --- 3D Model Component (from your code) ---
// NOTE: Ensure your 3D model file is located at 'public/AVATAR.glb'
const AVATAR_URL = "/AVATAR.glb"; 

// Preload the model to improve loading performance and prevent race conditions.
useGLTF.preload(AVATAR_URL);

function AvatarModel({ action }) {
  const group = useRef();
  // Destructure gltf object to safely access its properties
  const gltf = useGLTF(AVATAR_URL);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // This prevents errors if the GLTF file is loading or has issues.
    if (!actions || !animations || animations.length === 0) {
        return;
    }

    // UPDATE: The animation map now uses the correct names from your GLB file.
    const animationMap = {
      Salute: "Salute.Idle",
      Wave: "Human.Dance", // Using Salute as a thematic replacement for Waving
      Bored: "Human.Bored",
      Dance: "Zombie.Idle" // Using Backflip as a celebratory action for Clap
    };
    
    const currentAction = animationMap[action] || "Salute.Idle";

    // Check if the target animation exists in the model's actions.
    if (actions[currentAction]) {
        Object.values(actions).forEach(a => a && a.fadeOut(0.5));
        actions[currentAction].reset().fadeIn(0.5).play();
    } else {
        // Fallback to the Salute.Idle animation if the mapped one is not found
        if (actions['Salute.Idle']) {
            Object.values(actions).forEach(a => a && a.fadeOut(0.5));
            actions['Salute.Idle'].reset().fadeIn(0.5).play();
        }
    }

    return () => {
      // Ensure the action exists before trying to fade it out on cleanup.
      if (actions && actions[currentAction]) {
        actions[currentAction].fadeOut(0.5);
      }
    };
  }, [action, animations, actions]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  // Conditionally render the primitive only when the scene is available.
  return scene ? <primitive ref={group} object={scene} scale={1} position={[0, -1, 0]} /> : null;
}

// --- Main Avatar Component (integrating the 3D Canvas) ---
const Avatar = ({ action }) => {
  // --- Styles from the ultimate design ---
  const containerStyle = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at bottom, rgba(0, 191, 255, 0.08) 0%, transparent 60%)', padding: '2em', boxSizing: 'border-box', fontFamily: "'Rajdhani', sans-serif", position: 'relative' };
  const containmentFieldStyle = { width: '100%', flex: 1, border: '1px solid rgba(0, 191, 255, 0.3)', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.1)' };
  const gridStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px', animation: 'animated-grid 10s linear infinite', zIndex: 0 };
  const scanlineStyle = { position: 'absolute', top: '50%', left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 191, 255, 0.2) 50%, transparent 100%)', opacity: 0.3, animation: 'vertical-scan 8s ease-in-out infinite', zIndex: 1 };
  const statusPanelStyle = { width: '100%', padding: '1.5em 0 0 0', textAlign: 'center', color: '#e0eaff' };
  const statusLabelStyle = { fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(192, 208, 240, 0.7)', marginBottom: '0.5em' };
  const statusValueStyle = { fontSize: '1.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9bf8f4', textShadow: '0 0 10px rgba(155, 248, 244, 0.7)', transition: 'all 0.3s ease' };

  return (
    <>
      <StyleInjector css={AvatarCSS} />
      <div style={containerStyle}>
        
        {/* Holographic Containment Field now holds the 3D Canvas */}
        <div style={containmentFieldStyle}>
          <div style={gridStyle}></div>
          <div style={scanlineStyle}></div>
          
          <Canvas
            gl={{ alpha: true }} // Makes canvas background transparent
            style={{ zIndex: 2 }}
            camera={{ position: [1, 2, 1], fov: 50 }}
          >
            {/* Fallback loader while the 3D model is loading */}
            <Suspense fallback={
                <Html center>
                    <div style={{color: '#61dafb', fontFamily: "'Roboto Mono', monospace"}}>// LOADING MODEL...</div>
                </Html>
            }>
              <ambientLight intensity={0.8} />
              <directionalLight position={[0, 5, 5]} intensity={1.2} />
              <AvatarModel action={action} />
            </Suspense>
            <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                target={[0, 0, 0]}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        {/* Status Panel remains the same */}
        <div style={statusPanelStyle}>
          <div style={statusLabelStyle}>SYSTEM STATUS</div>
          <div style={statusValueStyle}>{action}</div>
        </div>

      </div>
    </>
  );
};

export default Avatar;
