import React, { useState, useEffect, useMemo } from 'react'; // Removed useRef, useCallback
import './CountdownPanel.css';

// The API endpoint for your server
const API_URL = '/api/data';
const TARGET_DATE = new Date('2026-06-07T00:00:00Z');

// Helper function to format currency
const formatCurrency = (amount) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

// --- Component for the Planetary Contributor Design ---
const PlanetaryContributors = ({ contributors }) => {
    // Return null if there's no data yet
    if (!contributors || contributors.length === 0) {
        return null;
    }

    const planet1 = contributors[0]; // Top contributor
    const planet2 = contributors[1];
    const planet3 = contributors[2];

    return (
        <div className="planetary-system">
            {/* --- Orbits remain in the background --- */}
            {planet1 && <div className="orbit orbit-1"></div>}
            {planet2 && <div className="orbit orbit-2"></div>}
            {planet3 && <div className="orbit orbit-3"></div>}

            {/* --- NEW STRUCTURE: Each planet and its info tag are grouped in a container --- */}

            {/* Planet 1 */}
            {planet1 && (
                <div className="planet-container p-container-1">
                    <div className="contributor-planet"></div>
                    <div className="planet-info">
                        <div className="planet-name">{planet1.name}</div>
                        <div className="planet-amount">{formatCurrency(planet1.amount)}</div>
                    </div>
                </div>
            )}
            
            {/* Planet 2 */}
            {planet2 && (
                <div className="planet-container p-container-2">
                    <div className="contributor-planet"></div>
                    <div className="planet-info">
                        <div className="planet-name">{planet2.name}</div>
                        <div className="planet-amount">{formatCurrency(planet2.amount)}</div>
                    </div>
                </div>
            )}

            {/* Planet 3 */}
            {planet3 && (
                <div className="planet-container p-container-3">
                    <div className="contributor-planet"></div>
                    <div className="planet-info">
                        <div className="planet-name">{planet3.name}</div>
                        <div className="planet-amount">{formatCurrency(planet3.amount)}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Removed StarfieldCanvas component entirely

function pad(n) {
    return String(n).padStart(2, '0');
}

function getTimeLeft(targetDate) {
    const now = new Date();
    let diff = Math.max(targetDate.getTime() - now.getTime(), 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    return { days, hours, minutes, seconds };
}

const CountdownUnit = ({ value, label }) => (
    <div className="countdown-unit">
        <div className="countdown-value">{pad(value)}</div>
        <div className="countdown-label">{label}</div>
    </div>
);

export default function CountdownPanel() {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(TARGET_DATE));
    const [isComplete, setIsComplete] = useState(false);
    
    const [topContributors, setTopContributors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && data.topContributors) {
                    setTopContributors(data.topContributors.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to fetch contributor data:", error);
                setTopContributors([]); 
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const tl = getTimeLeft(TARGET_DATE);
            setTimeLeft(tl);
            if (
                tl.days === 0 &&
                tl.hours === 0 &&
                tl.minutes === 0 &&
                tl.seconds === 0
            ) {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        // The .countdown-root now directly handles the background
        <div className="countdown-root"> 
            {/* Removed <StarfieldCanvas /> */}
            <PlanetaryContributors contributors={topContributors} />
            <div className="countdown-content">
                <h1 className="vanguard-title">PROJECT NORTH-STAR</h1>
                <div className="launch-sequence">Launch Sequence Initiated</div>
                {!isComplete ? (
                    <>
                        <div className="countdown-grid">
                            <CountdownUnit value={timeLeft.days} label="Days" />
                            <CountdownUnit value={timeLeft.hours} label="Hours" />
                            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                        </div>
                        <hr className="countdown-divider"/>
                        <div className="countdown-footer">
                            <div>This countdown represents a commitment to innovation and exploration.</div>
                            <div className="countdown-footer-sub">Personal Division // Passion Project</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mission-complete-message">
                            Mission Complete! Journey Onward!
                        </div>
                        <hr className="countdown-divider"/>
                        <div className="countdown-footer">
                            Thank you for your support on Project North-Star.
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}