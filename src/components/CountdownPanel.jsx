import React, { useState, useEffect, useMemo } from 'react';
import './CountdownPanel.css';

const TARGET_DATE = new Date('2025-06-07T00:00:00Z');

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
        <div className="starfield">
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
                            <div className="countdown-footer-sub">Aeronautical & Aerospace Division // Classified Project</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mission-complete-message">
                            <div className="mission-complete-heading">MISSION COMPLETE</div>
                            <div className="mission-complete-detail">
                                <span role="img" aria-label="sparkles">✨</span> 
                                Congratulations! 
                                <span role="img" aria-label="rocket">🚀</span>
                                <br />
                                The journey of Project North-Star has reached its ultimate milestone.
                                <br />
                                Thank you for being a part of this voyage beyond the stars.
                                <br />
                                <span style={{ fontSize: '1.4em', color: '#4beaff', marginTop: '1em', display: 'inline-block' }}>
                                    Del Rey L. Valmoria will continue his study!!!
                                </span>
                            </div>
                        </div>
                        <hr className="countdown-divider"/>
                        <div className="countdown-footer">
                            <div>Mission Success. The future awaits.</div>
                            <div className="countdown-footer-sub">Aeronautical Engineering Cutie // Dream Project</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}