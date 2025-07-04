import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingScreen.module.css';

// --- The "KRONOS" Loading Screen Component ---
const LoadingScreen = ({ isFading }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  
  const bootSequence = [
    { msg: "Connecting to Galactic Mainframe...", duration: 2000 },
    { msg: "Authenticating User: D.L. VALMORIA [Priority Ω]", duration: 2000 },
    { msg: "Decrypting Navigational Schematics...", duration: 2500 },
    { msg: "Compiling Real-time Trajectory Data...", duration: 2800 },
    { msg: "Rendering 3D Tactical Overlay...", duration: 2000 },
    { msg: "All Systems Nominal. Standby.", duration: 3000 },
  ];

  // Effect for the cinematic boot sequence and progress
  useEffect(() => {
    let currentTaskIndex = 0;
    let progressTimer;

    const runSequence = () => {
      if (currentTaskIndex >= bootSequence.length) {
        setProgress(100);
        return;
      }
      
      const currentTask = bootSequence[currentTaskIndex];
      setStatusMessage(currentTask.msg);

      // Smoothly animate progress for the duration of the current task
      const startProgress = (currentTaskIndex / bootSequence.length) * 100;
      const endProgress = ((currentTaskIndex + 1) / bootSequence.length) * 100;
      let currentProgress = startProgress;
      
      progressTimer = setInterval(() => {
        currentProgress += 0.5;
        setProgress(Math.min(currentProgress, endProgress));
      }, 20);

      setTimeout(() => {
        clearInterval(progressTimer);
        currentTaskIndex++;
        runSequence();
      }, currentTask.duration);
    };

    runSequence();
    
    return () => clearInterval(progressTimer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentTime = new Date().toUTCString().replace("GMT", "UTC");

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.8 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className={`${styles.loadingScreen} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.starfield}></div>
      <div className={styles.scanline}></div>
      <div className={styles.vignette}></div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top-left data cluster */}
        <motion.div variants={itemVariants} className={`${styles.dataCluster} ${styles.topLeft}`}>
            <p><span>USER:</span>D.L. VALMORIA</p>
            <p><span>STATUS:</span>OPERATIONAL</p>
        </motion.div>

        {/* Top-right data cluster */}
        <motion.div variants={itemVariants} className={`${styles.dataCluster} ${styles.topRight}`}>
            <p><span>TIME:</span>{currentTime}</p>
            <p><span>LOCATION:</span>MANILA, PH [TERRA]</p>
        </motion.div>

        {/* Centerpiece: 3D Data Sphere */}
        <motion.div variants={itemVariants} className={styles.centerpiece}>
             <div className={styles.dataSphere}>
                <div className={`${styles.ring} ${styles.ring1}`}></div>
                <div className={`${styles.ring} ${styles.ring2}`}></div>
                <div className={`${styles.ring} ${styles.ring3}`}></div>
                <div className={styles.core}>DV</div>
             </div>
        </motion.div>
        
        {/* Bottom status bar */}
        <motion.div variants={itemVariants} className={styles.statusBar}>
            <div className={styles.statusText}>
                <div className={styles.spinner}></div>
                <span>{statusMessage}</span>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
