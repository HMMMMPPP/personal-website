import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { User, Shield, Award, MessageSquare, Send, ChevronDown, X, Info, CheckCircle } from 'lucide-react';
import './GalacticCommand.css';

// --- Sub-Component: 3D Intel Operative ---
const IntelBot = ({ onBotClick }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        // --- Scene, Renderer, Camera ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 10;

        // --- Lighting ---
        scene.add(new THREE.AmbientLight(0x404040, 2.2));
        const keyLight = new THREE.DirectionalLight(0x00faff, 2.5);
        keyLight.position.set(8, 10, 15);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x22d3ee, 1.2);
        rimLight.position.set(-8, 8, -10);
        scene.add(rimLight);
        const fillLight = new THREE.PointLight(0xffffff, 0.6, 25);
        fillLight.position.set(0, 10, 10);
        scene.add(fillLight);

        // --- Materials ---
        const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x1f2937, roughness: 0.19, metalness: 0.94, clearcoat: 0.7, clearcoatRoughness: 0.1, sheen: 0.3, sheenColor: new THREE.Color(0x22d3ee), iridescence: 0.22, iridescenceIOR: 1.45 });
        const accentMat = new THREE.MeshPhysicalMaterial({ color: 0x22d3ee, roughness: 0.045, metalness: 1, emissive: 0x22e6ff, emissiveIntensity: 0.7, transmission: 0.7, thickness: 0.12, transparent: true, opacity: 0.98, clearcoat: 0.44 });
        const eyeMat = new THREE.MeshPhysicalMaterial({ color: 0x81f7ff, emissive: 0x97fcff, emissiveIntensity: 1.2, metalness: 0.7, roughness: 0.2, transmission: 0.85, thickness: 0.07, transparent: true, opacity: 1 });
        const antennaMat = new THREE.MeshPhysicalMaterial({ color: 0x22e6ff, emissive: 0x22e6ff, emissiveIntensity: 1.5, metalness: 1, roughness: 0.01, transmission: 0.6, thickness: 0.1, transparent: true, opacity: 0.95 });
        const armMat = new THREE.MeshPhysicalMaterial({ color: 0x192135, metalness: 0.9, roughness: 0.19, clearcoat: 0.2 });

        // --- Bot Geometry ---
        const group = new THREE.Group();
        const head = new THREE.Mesh(new THREE.SphereGeometry(1.18, 36, 36), bodyMat);
        head.position.y = 2.6;
        const visor = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.21, 16, 90, Math.PI), accentMat);
        visor.rotation.x = Math.PI / 2;
        visor.position.set(0, 2.82, 0.69);
        head.add(visor);
        const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), eyeMat);
        leftEye.position.set(-0.32, 2.68, 0.97);
        const rightEye = leftEye.clone();
        rightEye.position.x = 0.32;
        head.add(leftEye, rightEye);
        const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.50, 0.22, 22), bodyMat);
        jaw.position.set(0, 1.86, 0.41);
        jaw.rotation.x = Math.PI / 2.5;
        head.add(jaw);
        const leftAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 1.1, 12), antennaMat);
        leftAntenna.position.set(-0.42, 3.33, 0.1);
        leftAntenna.rotation.set(-0.16, 0, 0.12);
        head.add(leftAntenna);
        const rightAntenna = leftAntenna.clone();
        rightAntenna.position.x = 0.42;
        rightAntenna.rotation.z = -0.12;
        head.add(rightAntenna);
        const torso = new THREE.Mesh(new THREE.CapsuleGeometry(1.25, 2.2, 16, 32), bodyMat);
        torso.position.y = 0.1;
        const chestBadge = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.07, 14, 32), accentMat);
        chestBadge.position.set(0, 1.2, 0.85);
        chestBadge.rotation.x = Math.PI / 2;
        torso.add(chestBadge);
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 0.55, 18), accentMat);
        neck.position.y = 1.85;
        const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.47, 20, 20), accentMat);
        leftShoulder.position.set(-1.45, 1.15, 0);
        const rightShoulder = leftShoulder.clone();
        rightShoulder.position.x = 1.45;
        const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.1, 16), armMat);
        leftUpperArm.position.set(-1.85, 0.3, 0);
        leftUpperArm.rotation.z = Math.PI / 9;
        const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.9, 14), accentMat);
        leftForearm.position.set(-2.15, -0.7, 0);
        leftForearm.rotation.z = Math.PI / 4;
        const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.1, 16), armMat);
        rightUpperArm.position.set(1.82, 1.18, 0.5);
        rightUpperArm.rotation.set(0.2, 0, -Math.PI / 1.7);
        const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 1.1, 14), accentMat);
        rightForearm.position.set(2.7, 1.13, 1.2);
        rightForearm.rotation.set(0.25, 0, -Math.PI / 2.1);
        const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.65, 10), accentMat);
        finger.position.set(3.1, 1.13, 1.44);
        finger.rotation.set(0.24, 0, -Math.PI / 2.1);
        group.add(head, neck, torso, leftShoulder, rightShoulder, leftUpperArm, leftForearm, rightUpperArm, rightForearm, finger);
        scene.add(group);

        // --- Event Listeners & Animation ---
        const handleResize = () => { /* ... */ };
        const handleMouseMove = (event) => { /* ... */ };
        const handleBotClick = () => { if (typeof onBotClick === 'function') onBotClick(); };
        currentMount.addEventListener('mousemove', handleMouseMove);
        currentMount.addEventListener('click', handleBotClick);
        window.addEventListener('resize', handleResize);
        let animationFrameId;
        let t = 0;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            t += 0.015;
            group.position.y = Math.sin(t) * 0.06;
            head.rotation.y += (0.08 * Math.sin(t / 2) - head.rotation.y) * 0.05; // Gentle head sway
            leftEye.material.emissiveIntensity = 1.15 + 0.2 * Math.abs(Math.sin(t * 1.5));
            rightEye.material.emissiveIntensity = 1.15 + 0.2 * Math.abs(Math.sin(t * 1.5 + 1));
            renderer.render(scene, camera);
        };
        animate();
        handleResize();

        // --- Cleanup ---
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeEventListener('mousemove', handleMouseMove);
                currentMount.removeEventListener('click', handleBotClick);
                if (renderer.domElement.parentNode === currentMount) {
                    currentMount.removeChild(renderer.domElement);
                }
            }
            scene.traverse(object => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            renderer.dispose();
        };
    }, [onBotClick]);

    return (
        <div className="intelbot-canvas-wrap">
            <div ref={mountRef} className="intelbot-canvas" />
            <div className="intelbot-overlay animate-fade-in-bounce">
                <Info size={22} className="intelbot-overlay-icon" />
                <span className="intelbot-overlay-text">
                    Click the operative<br /><strong>for Mission / Suggestion</strong>
                </span>
            </div>
        </div>
    );
};

// --- Sub-Component: Animated Starfield Background ---
const Starfield = () => (
    <div className="starfield-bg">
        <div className="starfield-radial"></div>
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
    </div>
);

// --- Sub-Component: UI Box ---
const HudBox = ({ title, icon, children }) => (
    <div className="hudbox">
        <div className="hudbox-corner hudbox-tl"></div>
        <div className="hudbox-corner hudbox-tr"></div>
        <div className="hudbox-corner hudbox-bl"></div>
        <div className="hudbox-corner hudbox-br"></div>
        <div className="hudbox-titlebar">
            {icon}
            <h2 className="hudbox-title">{title}</h2>
        </div>
        {children}
    </div>
);

// --- Sub-Component: Donor List Item ---
const DonorListItem = ({ donor, rank }) => (
    <div className="donor-list-item">
        <div className="donor-list-left">
            <span className="donor-rank">#{rank}</span>
            <p className="donor-name">{donor.name}</p>
        </div>
        <p className="donor-amount">
            P{donor.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
    </div>
);

// --- Sub-Component: Success Overlay ---
const SuccessOverlay = ({ onClose }) => {
    const [animationClass, setAnimationClass] = useState('animate-fade-in');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationClass('animate-fade-out');
            setTimeout(onClose, 400);
        }, 3000); // Overlay visible for 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`success-overlay ${animationClass}`}>
            <div className="success-box">
                <CheckCircle size={72} className="success-icon" />
                <h2 className="success-title">Transmission Received</h2>
                <p className="success-message">
                    Your intel has been securely submitted to headquarters.
                    <br />
                    Thank you, Cadet.
                </p>
            </div>
        </div>
    );
};


// --- Sub-Component: Suggestion Modal ---
const SuggestionModal = ({ isOpen, onClose, fetchData, onSuccess }) => {
    const [newName, setNewName] = useState('');
    const [newSuggestion, setNewSuggestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [animationClass, setAnimationClass] = useState('animate-fade-out');

    useEffect(() => {
        setAnimationClass(isOpen ? 'animate-fade-in' : 'animate-fade-out');
        if (isOpen) {
            setError(''); // Clear errors when modal opens
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimationClass('animate-fade-out');
        setTimeout(onClose, 400);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newName.trim() || !newSuggestion.trim()) {
            setError('// AUTH.ERROR: Callsign and intel are required fields.');
            return;
        }
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName.trim(),
                    suggestion: newSuggestion.trim(),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Transmission failed. Command did not acknowledge.');
            }

            setNewName('');
            setNewSuggestion('');
            handleClose();
            await fetchData();
            onSuccess();

        } catch (err) {
            setError(`// UPLINK.ERROR: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen && animationClass === 'animate-fade-out') return null;

    return (
        <div className={`modal-outer ${animationClass}`}>
            <div className="modal-inner">
                <HudBox title="// TRANSMIT INTEL">
                    <button onClick={handleClose} className="modal-close-btn" disabled={isSubmitting}>
                        <X size={24} />
                    </button>
                    <form onSubmit={handleSubmit} className="modal-form">
                        <div className="modal-input-wrap">
                            <User className="modal-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Your Callsign"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="hud-input"
                                autoFocus
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="modal-input-wrap">
                            <MessageSquare className="modal-icon" size={20} />
                            <textarea
                                placeholder="Mission or Suggestion?"
                                value={newSuggestion}
                                onChange={(e) => setNewSuggestion(e.target.value)}
                                rows={4}
                                className="hud-input modal-textarea"
                                disabled={isSubmitting}
                            ></textarea>
                        </div>
                        <button type="submit" className="hud-button" disabled={isSubmitting}>
                            {isSubmitting ? 'TRANSMITTING...' : <> <Send size={18} /> Transmit Intel</>}
                        </button>
                        {error && <p className="modal-error">{error}</p>}
                    </form>
                </HudBox>
            </div>
        </div>
    );
};

// --- Main Component ---
const GalacticCommand = () => {
    const [vanguardCommanders, setVanguardCommanders] = useState([]);
    const [supportSquadron, setSupportSquadron] = useState([]);
    const [theRegiment, setTheRegiment] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegimentVisible, setIsRegimentVisible] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            setVanguardCommanders(data.topContributors || []);
            setSupportSquadron((data.remainingContributors || []).slice(0, 2));
            setTheRegiment((data.remainingContributors || []).slice(2));
            setSuggestions(data.suggestions || []);

        } catch (e) {
            console.error("Failed to fetch data:", e);
            setError("Failed to establish uplink with Command Center. Please check connection.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Placeholder for a new section to display suggestions
    const SuggestionsList = () => (
        <HudBox title="// INTEL LOG" icon={<MessageSquare className="icon-glow" />}>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                        <div key={index} className="roster-item" style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #22d3ee22' }}>
                            <strong>{item.name}:</strong> "{item.suggestion}"
                        </div>
                    ))
                ) : (
                    <p className="roster-empty">// No new intel.</p>
                )}
            </div>
        </HudBox>
    );

    return (
        <div id="Galactic-Command" className="galactic-root">
            
            <Starfield />

            {showSuccess && <SuccessOverlay onClose={() => setShowSuccess(false)} />}
            
            <SuggestionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fetchData={fetchData}
                onSuccess={() => setShowSuccess(true)}
            />

            <div className="galactic-content">
                <div className="galactic-container">
                    <header className="galactic-header animate-fade-in-down">
                        <h1 className="galactic-title animate-title-flicker">Galactic Command</h1>
                        <p className="galactic-subtitle">// Click the operative for Mission or Suggestion uplink.</p>
                    </header>
                    <main className="galactic-main">
                        <div className="galactic-main-col animate-slide-in-left">
                            <HudBox title="// CYBERNETIC UPLINK" icon={<User className="icon-glow" />}>
                                <IntelBot onBotClick={() => setIsModalOpen(true)} />
                            </HudBox>
                            <SuggestionsList /> {/* Displaying the suggestions list */}
                        </div>
                        <div className="galactic-main-col galactic-main-col-wide animate-slide-in-right">
                            <HudBox title="// VANGUARD COMMAND" icon={<Award className="icon-glow" />}>
                                {isLoading ? <p>Loading Roster...</p> : (
                                    <div>
                                        {vanguardCommanders.map((donor, index) => (
                                            <DonorListItem key={index} donor={donor} rank={index + 1} />
                                        ))}
                                    </div>
                                )}
                            </HudBox>
                            <HudBox title="// SUPPORT SQUADRON" icon={<Shield className="icon-glow" />}>
                                {isLoading ? <p>Loading Roster...</p> : (
                                    <div>
                                        {supportSquadron.map((donor, index) => (
                                            <DonorListItem key={index} donor={donor} rank={index + vanguardCommanders.length + 1} />
                                        ))}
                                    </div>
                                )}
                            </HudBox>
                            <HudBox title="// THE REGIMENT" icon={<User className="icon-glow" />}>
                                <button
                                    onClick={() => setIsRegimentVisible(!isRegimentVisible)}
                                    className="roster-toggle-btn"
                                >
                                    <span>Access Roster ({theRegiment.length})</span>
                                    <ChevronDown className={`roster-chevron ${isRegimentVisible ? 'roster-chevron-open' : ''}`} />
                                </button>
                                {isRegimentVisible && (
                                    <div className="roster-list animate-fade-in">
                                        {isLoading ? <p>Loading Roster...</p> : theRegiment.length > 0 ? theRegiment.map((donor, index) => (
                                            <p key={index} className="roster-item">{donor.name}</p>
                                        )) : <p className="roster-empty">// Roster empty.</p>}
                                    </div>
                                )}
                            </HudBox>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GalacticCommand;