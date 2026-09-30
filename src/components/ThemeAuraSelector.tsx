import React, { useState } from 'react';
import { Palette, Sparkles, Check } from 'lucide-react';
import { playChime } from '../utils/sound';

export type AuraTheme = 'cyberpunk' | 'matrix' | 'solar' | 'quantum';

interface ThemeOption {
  id: AuraTheme;
  name: string;
  dotColor: string;
  gradient: string;
}

export const ThemeAuraSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<AuraTheme>('cyberpunk');

  const themes: ThemeOption[] = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neón',
      dotColor: '#00f2fe',
      gradient: 'linear-gradient(135deg, #00f2fe, #7928ca)',
    },
    {
      id: 'matrix',
      name: 'Matrix Esmeralda',
      dotColor: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    },
    {
      id: 'solar',
      name: 'Fulguración Solar',
      dotColor: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
      id: 'quantum',
      name: 'Hielo Cuántico',
      dotColor: '#38bdf8',
      gradient: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    },
  ];

  const applyTheme = (theme: AuraTheme) => {
    setCurrentTheme(theme);
    playChime('click');

    const root = document.documentElement;

    if (theme === 'cyberpunk') {
      root.style.setProperty('--cyan-400', '#22d3ee');
      root.style.setProperty('--cyan-glow', '#00f2fe');
      root.style.setProperty('--violet-glow', '#a855f7');
      root.style.setProperty('--purple-deep', '#7928ca');
    } else if (theme === 'matrix') {
      root.style.setProperty('--cyan-400', '#34d399');
      root.style.setProperty('--cyan-glow', '#10b981');
      root.style.setProperty('--violet-glow', '#06b6d4');
      root.style.setProperty('--purple-deep', '#047857');
    } else if (theme === 'solar') {
      root.style.setProperty('--cyan-400', '#fbbf24');
      root.style.setProperty('--cyan-glow', '#f59e0b');
      root.style.setProperty('--violet-glow', '#f43f5e');
      root.style.setProperty('--purple-deep', '#e11d48');
    } else if (theme === 'quantum') {
      root.style.setProperty('--cyan-400', '#38bdf8');
      root.style.setProperty('--cyan-glow', '#60a5fa');
      root.style.setProperty('--violet-glow', '#818cf8');
      root.style.setProperty('--purple-deep', '#4338ca');
    }
  };

  return (
    <div className="aura-selector-container">
      {isOpen && (
        <div className="aura-dropdown glass-card animate-slide-up">
          <div className="aura-dropdown-head">
            <Sparkles size={14} className="text-cyan" />
            <span>SISTEMA DE AURA CIBERNÉTICA</span>
          </div>
          <div className="aura-options-list">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`aura-item-btn ${currentTheme === t.id ? 'active' : ''}`}
                onClick={() => {
                  applyTheme(t.id);
                  setIsOpen(false);
                }}
                onMouseEnter={() => playChime('hover')}
              >
                <span className="aura-preview-swatch" style={{ background: t.gradient }} />
                <span className="aura-name">{t.name}</span>
                {currentTheme === t.id && <Check size={14} className="aura-active-check" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        className="aura-floating-btn"
        onClick={() => {
          playChime('click');
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => playChime('hover')}
        title="Cambiar Aura de Color"
      >
        <Palette size={18} />
        <span className="aura-btn-label">Aura</span>
      </button>

      <style>{`
        .aura-selector-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 999;
        }

        .aura-floating-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          background: rgba(8, 12, 22, 0.85);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          color: var(--text-main);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 242, 254, 0.2);
          transition: all var(--t-normal);
        }

        .aura-floating-btn:hover {
          transform: translateY(-2px);
          border-color: var(--cyan-400);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 242, 254, 0.4);
        }

        .aura-btn-label {
          letter-spacing: 0.04em;
        }

        .aura-dropdown {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 0;
          width: 240px;
          padding: 0.85rem;
          border-radius: var(--radius-lg);
          background: rgba(6, 10, 20, 0.95);
          border: 1px solid var(--border-medium);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 242, 254, 0.15);
        }

        .aura-dropdown-head {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-muted);
          padding-bottom: 0.6rem;
          margin-bottom: 0.6rem;
          border-bottom: 1px solid var(--border-subtle);
          letter-spacing: 0.06em;
        }

        .aura-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .aura-item-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.55rem 0.75rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--t-fast);
          width: 100%;
          text-align: left;
        }

        .aura-item-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-main);
        }

        .aura-item-btn.active {
          background: rgba(0, 242, 254, 0.12);
          border-color: rgba(0, 242, 254, 0.3);
          color: #fff;
        }

        .aura-preview-swatch {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        }

        .aura-name {
          flex: 1;
        }

        .aura-active-check {
          color: var(--cyan-400);
        }
      `}</style>
    </div>
  );
};
