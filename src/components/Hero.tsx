import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Search,
  Activity,
  Terminal,
  Lock,
  Globe2
} from 'lucide-react';
import type { Category } from '../types';
import { playChime } from '../utils/sound';
import { HolographicCore } from './HolographicCore';

interface HeroProps {
  onExploreClick: () => void;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const quickTags = [
    { label: 'Blender 3D Suite', query: 'Blender' },
    { label: 'OBS Studio 4K', query: 'OBS' },
    { label: 'VS Code Extendido', query: 'VS Code' },
    { label: 'IA Local & LLMs', query: 'Local AI' },
    { label: 'Godot Engine 4', query: 'Godot' },
    { label: 'Cyberpunk Arena', query: 'Cyberpunk' },
  ];

  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-dual-stage">
          {/* Left Column: Heading, Subtext, Search, CTAs */}
          <div className="hero-left-column">
            {/* Floating Top Badge with Rotating Border Glow */}
            <div className="hero-pill-badge" onMouseEnter={() => playChime('hover')}>
              <div className="pill-dot-halo">
                <span className="pill-pulse-dot" />
              </div>
              <span className="pill-text">LA RED NEURAL DE SOFTWARE LIBRE & RECURSOS DIGITALES</span>
              <span className="pill-tag">AI CORE 3.0</span>
            </div>

            {/* Hero Title */}
            <h1 className="hero-main-heading">
              El Software del Futuro,<br />
              <span className="text-gradient text-glow">DESCÁRGATELO</span> al Instante.
            </h1>

            {/* Hero Description */}
            <p className="hero-subtext">
              Diseñado con estándares de nivel mundial para ingenieros, artistas y creadores. Explora miles de herramientas digitales, motores creativos y suites de desarrollo verificadas criptográficamente.
              <strong className="hero-subtext-highlight"> Cero malware, sin instaladores basura y con máxima tasa de transferencia.</strong>
            </p>

            {/* High-Tech Terminal Search Box */}
            <div className="hero-search-box">
              <div className="hero-search-inner">
                <Search className="hero-search-icon" size={22} />
                <input 
                  type="text" 
                  placeholder="¿Qué software, videojuego o herramienta buscas hoy? (ej. Blender, OBS, Godot, IA...)" 
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => playChime('hover')}
                />
                <button 
                  className="btn btn-primary btn-hero-search" 
                  onClick={() => {
                    playChime('click');
                    onExploreClick();
                  }}
                  onMouseEnter={() => playChime('hover')}
                >
                  <span>Explorar</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Quick Filter Tags */}
              <div className="hero-quick-tags">
                <span className="quick-tags-label">Tendencias Globales:</span>
                {quickTags.map((tag, idx) => (
                  <button 
                    key={idx} 
                    className="hero-tag-btn"
                    onClick={() => {
                      playChime('click');
                      onSearchChange(tag.query);
                      onExploreClick();
                    }}
                    onMouseEnter={() => playChime('hover')}
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions-row">
              <button 
                className="btn btn-primary btn-lg" 
                onClick={() => {
                  playChime('click');
                  onExploreClick();
                }}
                onMouseEnter={() => playChime('hover')}
              >
                <Sparkles size={20} />
                <span>Explorar Catálogo Completo</span>
                <ArrowRight size={20} className="arrow-hover" />
              </button>

              <button 
                className="btn btn-secondary btn-lg" 
                onClick={() => {
                  playChime('click');
                  onSelectCategory('juegos');
                  onExploreClick();
                }}
                onMouseEnter={() => playChime('hover')}
              >
                <Zap size={20} className="text-cyan" />
                <span>Ver Videojuegos & Emuladores</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Holographic Core Showcase */}
          <div className="hero-right-column">
            <div className="hero-hologram-stage glass-card">
              <div className="stage-header-hud">
                <div className="stage-dot-pulse">
                  <span className="dot-core-live" />
                  <span className="stage-title">AI NEURAL CORE 3D</span>
                </div>
                <span className="stage-fps">WEBGL 60 FPS</span>
              </div>
              <HolographicCore />
              <div className="stage-footer-tip">
                <Sparkles size={13} className="text-cyan" />
                <span>Rotación giroscópica interactiva con cursor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Futuristic Floating Telemetry Dashboard */}
        <div className="hero-telemetry-hud glass-card">
          <div className="hud-header">
            <div className="hud-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="hud-title-wrap">
              <Terminal size={14} className="text-cyan" />
              <span>TELEMETRÍA CRIPTOGRÁFICA EN VIVO</span>
            </div>
            <span className="hud-live-tag">LIVE 120 FPS</span>
          </div>

          <div className="hud-stats-grid">
            <div className="hud-stat-cell">
              <div className="hud-stat-icon cyan">
                <ShieldCheck size={22} />
              </div>
              <div className="hud-stat-details">
                <span className="hud-label">Protección de Paquetes</span>
                <span className="hud-val">100% Virus-Free</span>
                <span className="hud-desc">Firma SHA-256 + VirusTotal</span>
              </div>
            </div>

            <div className="hud-stat-cell">
              <div className="hud-stat-icon violet">
                <Activity size={22} />
              </div>
              <div className="hud-stat-details">
                <span className="hud-label">Ancho de Banda Global</span>
                <span className="hud-val">120+ MB/s</span>
                <span className="hud-desc">CDN Espejo Multi-Región</span>
              </div>
            </div>

            <div className="hud-stat-cell">
              <div className="hud-stat-icon emerald">
                <Lock size={22} />
              </div>
              <div className="hud-stat-details">
                <span className="hud-label">Protocolo de Descarga</span>
                <span className="hud-val">Zero Adware</span>
                <span className="hud-desc">Sin Instaladores Fraudulentos</span>
              </div>
            </div>

            <div className="hud-stat-cell">
              <div className="hud-stat-icon amber">
                <Globe2 size={22} />
              </div>
              <div className="hud-stat-details">
                <span className="hud-label">Compatibilidad</span>
                <span className="hud-val">Win • Mac • Linux</span>
                <span className="hud-desc">Arquitecturas x64 y ARM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 5.5rem 0 4.5rem;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.45rem 1.25rem;
          background: rgba(0, 242, 254, 0.06);
          border: 1px solid rgba(0, 242, 254, 0.3);
          border-radius: var(--radius-full);
          backdrop-filter: blur(14px);
          margin-bottom: 2rem;
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.15);
          transition: all var(--t-fast);
        }

        .hero-pill-badge:hover {
          border-color: var(--cyan-400);
          box-shadow: 0 0 35px rgba(0, 242, 254, 0.3);
          transform: translateY(-2px);
        }

        .pill-dot-halo {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pill-pulse-dot {
          width: 8px;
          height: 8px;
          background: var(--cyan-400);
          border-radius: 50%;
          box-shadow: 0 0 12px var(--cyan-400);
          animation: pulseGlow 1.8s infinite;
        }

        .pill-text {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--cyan-400);
          letter-spacing: 0.05em;
        }

        .pill-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          background: rgba(0, 242, 254, 0.2);
          color: #fff;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(0, 242, 254, 0.4);
        }

        .hero-main-heading {
          font-size: clamp(2.6rem, 5.8vw, 4.75rem);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.035em;
          margin-bottom: 1.5rem;
          max-width: 1020px;
        }

        .hero-subtext {
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 820px;
          margin-bottom: 2.85rem;
        }

        .hero-subtext-highlight {
          color: var(--text-main);
          font-weight: 600;
        }

        /* Search Console */
        .hero-search-box {
          width: 100%;
          max-width: 860px;
          margin-bottom: 2.75rem;
        }

        .hero-search-inner {
          display: flex;
          align-items: center;
          background: rgba(14, 20, 36, 0.88);
          border: 1.5px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 0.65rem 0.85rem 0.65rem 1.45rem;
          backdrop-filter: blur(24px);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 254, 0.14);
          transition: all var(--t-normal);
        }

        .hero-search-inner:focus-within {
          border-color: var(--cyan-400);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 45px rgba(0, 242, 254, 0.3);
          transform: translateY(-2px);
        }

        .hero-search-icon {
          color: var(--cyan-400);
          margin-right: 0.95rem;
          flex-shrink: 0;
        }

        .hero-search-inner input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-family: var(--font-body);
          font-size: 1.05rem;
        }

        .hero-search-inner input::placeholder {
          color: var(--text-muted);
        }

        .btn-hero-search {
          border-radius: var(--radius-md);
          padding: 0.8rem 1.75rem;
        }

        .hero-quick-tags {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1.15rem;
        }

        .quick-tags-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-tag-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.28rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--t-fast);
        }

        .hero-tag-btn:hover {
          background: rgba(0, 242, 254, 0.14);
          border-color: var(--cyan-400);
          color: #fff;
          transform: translateY(-1px);
        }

        /* Actions Row */
        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 1.35rem;
          margin-bottom: 4.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .arrow-hover {
          transition: transform var(--t-fast);
        }

        .hero-actions-row .btn-primary:hover .arrow-hover {
          transform: translateX(5px);
        }

        .text-cyan {
          color: var(--cyan-400);
        }

        /* Telemetry HUD Dashboard */
        .hero-telemetry-hud {
          width: 100%;
          max-width: 1080px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-medium);
          background: rgba(10, 15, 28, 0.78);
          overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 254, 0.1);
        }

        .hud-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.6rem;
          background: rgba(255, 255, 255, 0.025);
          border-bottom: 1px solid var(--border-subtle);
        }

        .hud-dots {
          display: flex;
          gap: 6px;
        }

        .hud-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .hud-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
        }

        .hud-live-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--emerald-neon);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
        }

        .hud-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          padding: 1.6rem;
        }

        .hud-stat-cell {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          text-align: left;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: all var(--t-fast);
        }

        .hud-stat-cell:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }

        .hud-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hud-stat-icon.cyan {
          background: rgba(0, 242, 254, 0.12);
          color: var(--cyan-400);
          border: 1px solid rgba(0, 242, 254, 0.25);
        }

        .hud-stat-icon.violet {
          background: rgba(168, 85, 247, 0.14);
          color: var(--violet-glow);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        .hud-stat-icon.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: var(--emerald-neon);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .hud-stat-icon.amber {
          background: rgba(245, 158, 11, 0.12);
          color: var(--amber-gold);
          border: 1px solid rgba(245, 158, 11, 0.25);
        }

        .hud-stat-details {
          display: flex;
          flex-direction: column;
        }

        .hud-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .hud-val {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.25;
        }

        .hud-desc {
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        /* Dual Stage Layout for Desktop & 3D Core */
        .hero-dual-stage {
          display: grid;
          grid-template-columns: 1.25fr 0.85fr;
          align-items: center;
          gap: 3.5rem;
          width: 100%;
          margin-bottom: 3.5rem;
          text-align: left;
        }

        .hero-left-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-right-column {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-hologram-stage {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: radial-gradient(circle at 50% 50%, rgba(14, 23, 42, 0.75) 0%, rgba(5, 9, 18, 0.85) 100%);
          border: 1px solid rgba(0, 242, 254, 0.25);
          border-radius: var(--radius-xl);
          padding: 1.25rem 1.25rem 1.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 242, 254, 0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(20px);
          overflow: hidden;
          transition: all var(--t-normal);
        }

        .hero-hologram-stage:hover {
          border-color: rgba(0, 242, 254, 0.45);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 242, 254, 0.25);
        }

        .stage-header-hud {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 0.5rem;
        }

        .stage-dot-pulse {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot-core-live {
          width: 8px;
          height: 8px;
          background: var(--cyan-400);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--cyan-400);
          animation: pulseGlow 1.4s infinite;
        }

        .stage-title {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--cyan-400);
        }

        .stage-fps {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .stage-footer-tip {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          background: rgba(0, 0, 0, 0.4);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 1100px) {
          .hero-dual-stage {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2.5rem;
          }
          .hero-left-column {
            align-items: center;
            text-align: center;
          }
          .hero-main-heading {
            text-align: center;
          }
          .hero-subtext {
            text-align: center;
          }
          .hero-actions-row {
            justify-content: center;
          }
          .hero-quick-tags {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-search-inner {
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.9rem;
          }
          .hero-search-icon {
            display: none;
          }
          .btn-hero-search {
            width: 100%;
          }
          .hero-actions-row {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions-row .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
