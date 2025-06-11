import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const AVATAR_URL = "/CesiumMan.glb"; // Place your GLTF/GLB file in public/

function AvatarModel({ action }) {
  const group = useRef();
  const { scene, animations } = useGLTF(AVATAR_URL);
  const { actions, mixer } = useAnimations(animations, group);

  // Map scroll actions to animation clips (update to match your model)
  const animationMap = {
    Idle: animations[0]?.name,
    Wave: animations[1]?.name || animations[0]?.name,
    Dance: animations[2]?.name || animations[0]?.name,
  };

  useEffect(() => {
    if (!actions || !animationMap[action]) return;
    Object.values(actions).forEach((a) => a.fadeOut(0.2));
    actions[animationMap[action]]?.reset().fadeIn(0.2).play();
    // Cleanup on unmount
    return () => {
      Object.values(actions).forEach((a) => a.stop());
    };
    // eslint-disable-next-line
  }, [action, actions, animationMap]);

  useFrame(() => {
    // Optionally rotate avatar slowly for effect
    if (group.current) group.current.rotation.y += 0.002;
  });

  return <primitive ref={group} object={scene} position={[0, -1, 0]} />;
}

export default function Avatar({ action }) {
  return (
    <Canvas className="avatar-canvas" camera={{ position: [0, 1, -2], fov: 50
     }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 6, 2]} intensity={0.7} />
      <AvatarModel action={action} />
      <OrbitControls enablePan={false} enableZoom={false} target={[0, 0, 0]} />
    </Canvas>
  );
}