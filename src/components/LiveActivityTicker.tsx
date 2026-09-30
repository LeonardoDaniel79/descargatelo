import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import type { Program } from '../types';

interface LiveActivityTickerProps {
  programs: Program[];
  onSelectProgram: (p: Program) => void;
}

interface ActivityEvent {
  id: string;
  city: string;
  flag: string;
  programName: string;
  programId: string;
  timeAgo: string;
}

export const LiveActivityTicker: React.FC<LiveActivityTickerProps> = ({
  programs,
  onSelectProgram
}) => {
  const cities = [
    { city: 'Tokio', flag: '🇯🇵' },
    { city: 'Madrid', flag: '🇪🇸' },
    { city: 'Buenos Aires', flag: '🇦🇷' },
    { city: 'Fráncfort', flag: '🇩🇪' },
    { city: 'San Francisco', flag: '🇺🇸' },
    { city: 'Londres', flag: '🇬🇧' },
    { city: 'Ciudad de México', flag: '🇲🇽' },
    { city: 'São Paulo', flag: '🇧🇷' },
  ];

  const [currentEvent, setCurrentEvent] = useState<ActivityEvent>({
    id: 'init',
    city: 'Tokio',
    flag: '🇯🇵',
    programName: 'Blender 3D Suite',
    programId: 'blender-3d',
    timeAgo: 'hace 3 seg',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomProg = programs[Math.floor(Math.random() * programs.length)];
      const seconds = Math.floor(Math.random() * 8) + 2;

      setCurrentEvent({
        id: Date.now().toString(),
        city: randomCity.city,
        flag: randomCity.flag,
        programName: randomProg ? randomProg.name : 'OBS Studio',
        programId: randomProg ? randomProg.id : 'obs-studio',
        timeAgo: `hace ${seconds} seg`,
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [programs]);

  const handleClick = () => {
    const prog = programs.find((p) => p.id === currentEvent.programId);
    if (prog) onSelectProgram(prog);
  };

  return (
    <aside className="live-ticker-bar" onClick={handleClick} title="Clic para ver este programa">
      <div className="container ticker-container">
        <div className="ticker-left-tag">
          <span className="ticker-pulse-core" />
          <span className="ticker-label">ACTIVIDAD EN TIEMPO REAL</span>
        </div>

        <div key={currentEvent.id} className="ticker-message animate-fade-in">
          <span className="ticker-flag">{currentEvent.flag}</span>
          <span className="ticker-text">
            Alguien en <strong>{currentEvent.city}</strong> inició la descarga de{' '}
            <span className="highlight-prog">{currentEvent.programName}</span>
          </span>
          <span className="ticker-time">{currentEvent.timeAgo}</span>
        </div>

        <div className="ticker-right-status">
          <ShieldCheck size={13} className="text-emerald" />
          <span>CDN Sincronizado</span>
        </div>
      </div>

      <style>{`
        .live-ticker-bar {
          background: rgba(4, 8, 16, 0.95);
          border-top: 1px solid var(--border-subtle);
          padding: 0.55rem 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          z-index: 50;
          transition: background var(--t-fast);
        }

        .live-ticker-bar:hover {
          background: rgba(14, 20, 36, 0.98);
        }

        .ticker-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          overflow: hidden;
        }

        .ticker-left-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .ticker-pulse-core {
          width: 7px;
          height: 7px;
          background: var(--cyan-400);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--cyan-400);
          animation: pulseGlow 1.6s infinite;
        }

        .ticker-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--cyan-400);
          letter-spacing: 0.08em;
        }

        .ticker-message {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ticker-flag {
          font-size: 1.05rem;
        }

        .ticker-text {
          color: var(--text-secondary);
        }

        .ticker-text strong {
          color: var(--text-main);
        }

        .highlight-prog {
          color: var(--cyan-400);
          font-weight: 700;
        }

        .ticker-time {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .ticker-right-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .ticker-left-tag, .ticker-right-status {
            display: none;
          }
          .ticker-container {
            justify-content: center;
          }
        }
      `}</style>
    </aside>
  );
};
