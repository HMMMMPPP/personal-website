import React, { useState, useMemo, useEffect } from 'react';
import './DigitalFootprint.css';

// --- Helper Functions ---
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);

// --- Child Component: DegreeSchematic ---
// Combines the "wing assembly" and "master group" into one group.
const DegreeSchematic = ({
  fundedAmount,
  parts,
  onHover,
  onPartClick,
  focusedPart,
}) => {
  const getPartStyle = (partId) => {
    const part = parts.find((p) => p.id === partId);
    return fundedAmount >= (part?.cost || Infinity) ? 'fundedPart' : 'part';
  };

  const InteractivePart = ({ partId, children }) => {
    const partData = parts.find((p) => p.id === partId);
    const isFocused = focusedPart && focusedPart.id === partId;
    return (
      <g
        onClick={() => onPartClick(partData)}
        onMouseEnter={() => onHover(partData)}
        className={isFocused ? 'focused-part' : ''}
      >
        {children}
      </g>
    );
  };

  // Combine wings and master group into one <g>
  return (
    <svg
      viewBox="0 0 1200 800"
      className="svg"
      onMouseLeave={() => onHover(null)}
    >
      <defs>
        <linearGradient id="stealthGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
        </linearGradient>
        <pattern
          id="smallGrid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="rgba(13, 110, 253, 0.1)"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="grid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <rect width="50" height="50" fill="url(#smallGrid)" />
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="rgba(13, 110, 253, 0.2)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        x="-100%"
        y="-100%"
        width="200%"
        height="200%"
        fill="url(#grid)"
      />
      <line
        x1="600"
        y1="0"
        x2="600"
        y2="800"
        stroke="#0d6efd33"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <line
        x1="0"
        y1="400"
        x2="1200"
        y2="400"
        stroke="#0d6efd33"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* --- Combined Master Group + Wings --- */}
      <g id="plane-assembly-group" transform="translate(0, 150)">
        <path
          id="airframe-outline"
          d="M600,100 L1100,350 L1000,400 L850,325 L600,450 L350,325 L200,400 L100,350 L600,100 Z"
          fill="url(#stealthGradient)"
          strokeWidth="1.5"
          className="part"
        />
        <InteractivePart partId="fuselage">
          <g id="fuselage" className={getPartStyle('fuselage')}>
            <path d="M600,120 L750,270 L600,410 L450,270 L600,120 Z" />
            <rect
              x="525"
              y="280"
              width="150"
              height="100"
              fill="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />
            <rect
              x="470"
              y="250"
              width="30"
              height="50"
              fill="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />
            <rect
              x="700"
              y="250"
              width="30"
              height="50"
              fill="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />
          </g>
        </InteractivePart>
        <InteractivePart partId="cockpit">
          <g id="cockpit" className={getPartStyle('cockpit')}>
            <path d="M600,100 C 650,150, 650,200, 600,220 C 550,200, 550,150, 600,100 Z" />
          </g>
        </InteractivePart>
        <InteractivePart partId="wings">
          <g id="wings" className={getPartStyle('wings')}>
            <path d="M450,270 L100,350 L200,400 L350,325 L600,410 L450,270 Z" />
            <path d="M750,270 L1100,350 L1000,400 L850,325 L600,410 L750,270 Z" />
            <path d="M600,100 L1100,350 L1000,400 L850,325 L600,450 L350,325 L200,400 L100,350 L600,100 Z" />
          </g>
        </InteractivePart>
        <InteractivePart partId="engines">
          <g id="engines" className={getPartStyle('engines')}>
            <path
              d="M520,220 L600,220 L680,220 L750,270 L450,270 L520,220 Z"
              fill="rgba(0,0,0,0.2)"
            />
          </g>
        </InteractivePart>
        <InteractivePart partId="tail">
          <g id="tail" className={getPartStyle('tail')}>
            <path d="M600,450 L850,325 L600,410 L350,325 L600,450 Z" />
          </g>
        </InteractivePart>
        <g
          id="b2-details"
          style={{ pointerEvents: 'none' }}
          fill="none"
          stroke="var(--text-secondary)"
          strokeOpacity="0.6"
        >
          <path
            d="M1000,400 L850,325 L860,335 L1005,405 Z"
            fill="rgba(0,0,0,0.1)"
          />
          <path
            d="M200,400 L350,325 L340,335 L195,405 Z"
            fill="rgba(0,0,0,0.1)"
          />
        </g>
      </g>
    </svg>
  );
};

// --- Reusable Child Component for Displaying Supporters ---
const TopSupportersPanel = ({ supporters, title }) => {
  if (!supporters || supporters.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(13, 110, 253, 0.2)',
        paddingBottom: '1rem',
      }}
    >
      <h2 className="h2">{title}</h2>
      {supporters.map((supporter, index) => (
        <div
          key={index}
          style={{
            backgroundColor: 'rgba(13, 110, 253, 0.05)',
            borderLeft: '3px solid #0d6efd',
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            borderRadius: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <span>{supporter.name}</span>
            <span
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                color: '#0d6efd',
              }}
            >
              {formatCurrency(supporter.amount)}
            </span>
          </div>
          {supporter.message && (
            <div
              style={{
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                color: '#ffd700',
                textShadow: '0 0 5px #ffd700',
                opacity: 0.9,
              }}
            >
              {supporter.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Main Application Component ---
export default function DigitalFootprint() {
  const [missionData, setMissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedPart, setFocusedPart] = useState(null);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok)
          throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = await response.json();
        setMissionData(data);
      } catch (e) {
        console.error('Failed to fetch mission data:', e);
        setError('Connection to server failed. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissionData();
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatLiveTime = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Manila',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // --- Data Processing Hooks ---
  const totalFunded = useMemo(
    () =>
      missionData?.logbook.reduce((sum, log) => sum + log.amount, 0) || 0,
    [missionData]
  );
  const percentage = useMemo(() => {
    if (missionData?.goal && missionData.goal > 0) {
      return Math.min(100, (totalFunded / missionData.goal) * 100);
    }
    return 0;
  }, [missionData, totalFunded]);
  const nextMilestone = useMemo(
    () => missionData?.parts.find((p) => totalFunded < p.cost) || null,
    [totalFunded, missionData]
  );

  // --- CORRECTED: Logic to split supporters 3 / 2 ---
  const top3Supporters = useMemo(
    () => missionData?.topContributors?.slice(0, 3) || [],
    [missionData]
  );
  const supporters4and5 = useMemo(
    () => missionData?.topContributors?.slice(3, 5) || [],
    [missionData]
  );

  const handlePartClick = (part) => {
    setFocusedPart((current) => (current && current.id === part.id ? null : part));
  };

  if (isLoading)
    return <div className="statusScreen">Connecting to Chronicle Server...</div>;
  if (error) return <div className="statusScreen">{error}</div>;
  if (!missionData) return <div className="statusScreen">Processing flight data...</div>;

  return (
    <div id="DigitalFootprint" className="appContainer">
      <main className={`mainGrid ${focusedPart ? 'focus-mode' : ''}`}>
        {/* --- Left Panel --- */}
        <section className={`panel ${focusedPart ? 'focused' : ''}`}>
          {focusedPart ? (
            <div>
              <h1 className="h1">{focusedPart.name}</h1>
              <p className="subtitle">Component Analysis</p>
              <div className="infoBox">
                Detailed description for the {focusedPart.name} milestone. This section explains what this academic phase entails.
              </div>
              <h2 className="h2">Funding Details</h2>
              <div className="stat">
                <span className="statLabel">Funding Target</span>
                <span className="statValue">
                  {formatCurrency(focusedPart.cost)}
                </span>
              </div>
              <div className="stat">
                <span className="statLabel">Status</span>
                <span className="statValue">
                  {totalFunded >= focusedPart.cost ? 'FUNDED' : 'PENDING'}
                </span>
              </div>
              <button
                onClick={() => setFocusedPart(null)}
                style={{
                  background: 'var(--primary-color)',
                  border: 'none',
                  color: 'white',
                  padding: '10px 15px',
                  marginTop: 'auto',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  width: '100%',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Return to Overview
              </button>
            </div>
          ) : (
            <>
              <h1 className="h1">Degree Schematic</h1>
              <p className="subtitle">
                My public flight plan to an Aeronautical Engineering degree.
              </p>
              <div className="infoBox">
                <div>
                  <strong>REC'D TIME:</strong> {formatLiveTime(currentTime)}
                </div>
                <div>
                  <strong>HOME BASE:</strong> Caloocan, Metro Manila, PH
                </div>
              </div>
              <h2 className="h2">Tuition Funding Status</h2>
              <div className="stat">
                <span className="statLabel">Total Funds Raised</span>
                <span className="statValue">{formatCurrency(totalFunded)}</span>
              </div>
              <div className="stat">
                <span className="statLabel">Target</span>
                <span className="statValue">
                  {formatCurrency(missionData.goal)}
                </span>
              </div>
              <div className="progressBarContainer">
                <div
                  className="progressBarFill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="progressLabel">
                {percentage.toFixed(2)}% COMPLETE
              </div>

              {/* --- Corrected: Display for Top 3 Supporters --- */}
              <TopSupportersPanel
                supporters={top3Supporters}
                title="Vanguard Command"
              />

              {nextMilestone && (
                <div className="nextGoalBox">
                  <span className="nextGoalLabel">NEXT ACADEMIC MILESTONE</span>
                  <span className="nextGoalValue">{nextMilestone.name}</span>
                  <span className="nextGoalTarget">
                    {formatCurrency(nextMilestone.cost)}
                  </span>
                </div>
              )}
            </>
          )}
        </section>

        {/* --- Center Panel --- */}
        <section className="panel centerPanel">
          <DegreeSchematic
            fundedAmount={totalFunded}
            parts={missionData.parts}
            onHover={setHoveredPart}
            onPartClick={handlePartClick}
            focusedPart={focusedPart}
          />
          <div className={`tooltip ${hoveredPart ? 'show' : ''}`}>
            {hoveredPart && (
              <>
                <strong>{hoveredPart.name}</strong>
                <br />
                Funding Target: {formatCurrency(hoveredPart.cost)}
              </>
            )}
          </div>
        </section>

        {/* --- Right Panel --- */}
        <section className="panel logbookPanel">
          {/* --- Corrected: Display for Supporters 4 & 5 --- */}
          <TopSupportersPanel
            supporters={supporters4and5}
            title="Support Squadron"
          />

          <h2 className="h2">Student Logbook</h2>
          <div className="logbook">
            {missionData.logbook
              .slice()
              .reverse()
              .map((log, index) => (
                <div key={index} className="logEntry">
                  <div className="logAmount">
                    + {formatCurrency(log.amount)}
                  </div>
                  <p className="logText">{log.entry}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}       