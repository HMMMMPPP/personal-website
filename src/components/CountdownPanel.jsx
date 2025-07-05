import React, { useState, useEffect, useMemo } from 'react';
import './CountdownPanel.css';

// The API endpoint for your server
const API_URL = '/api/data';
const TARGET_DATE = new Date('2026-06-07T00:00:00Z');

// Helper function to format currency
const formatCurrency = (amount) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

// --- Component for the Planetary Contributor Design ---
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


const Starfield = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 120 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${1 + Math.random() * 2}px`,
            delay: `${Math.random() * 6}s`,
            duration: `${2 + Math.random() * 3}s`,
        }));
    }, []);
    return (
        <div id="CountdownPanel"className="starfield">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                        animationDuration: star.duration,
                    }}
                />
            ))}
        </div>
    );
};

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
    
    // State to hold the top contributors list
    const [topContributors, setTopContributors] = useState([]);

    // useEffect to fetch data from your server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // --- CORRECTED: Use `topContributors` from the server ---
                // The server provides the top 5, but our display uses the top 3.
                // We use .slice(0, 3) to safely get only the top 3 for the planets.
                if (data && data.topContributors) {
                    setTopContributors(data.topContributors.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to fetch contributor data:", error);
            }
        };

        fetchData();
    }, []); // The empty array ensures this runs only once when the component mounts

    // This useEffect for the timer remains unchanged
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
        <div className="countdown-root">
            <Starfield />
            {/* Render the PlanetaryContributors component */}
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
                            {/* ... Mission Complete JSX ... */}
                        </div>
                        <hr className="countdown-divider"/>
                        <div className="countdown-footer">
                           {/* ... Mission Complete Footer JSX ... */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}