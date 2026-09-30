import React from 'react';
import { Sparkles, ArrowRight, Star, Download, ShieldCheck } from 'lucide-react';
import type { Program } from '../types';

interface FeaturedSectionProps {
  programs: Program[];
  onSelect: (program: Program) => void;
  onQuickDownload: (program: Program) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  programs,
  onSelect,
  onQuickDownload
}) => {
  const featuredList = programs.filter(p => p.featured).slice(0, 3);

  return (
    <section className="section featured-section" id="destacados">
      <div className="container">
        {/* Section Heading */}
        <div className="section-head">
          <div>
            <div className="section-tag">
              <Sparkles size={16} />
              <span>Selección Editorial</span>
            </div>
            <h2 className="section-title">Programas <span className="text-gradient">Destacados</span></h2>
            <p className="section-desc">
              Herramientas líderes elegidas por su estabilidad, potencia y respaldo de la comunidad de código abierto.
            </p>
          </div>
        </div>

        {/* Featured Showcase Grid */}
        <div className="featured-grid">
          {featuredList.map((program) => (
            <div key={program.id} className="featured-card glass-card">
              <div className="featured-banner-wrapper" onClick={() => onSelect(program)}>
                <img src={program.bannerUrl} alt={program.name} />
                <div className="featured-banner-overlay" />
                <div className="featured-badge-pill">
                  <Star size={13} fill="#fbbf24" color="#fbbf24" />
                  <span>4.9 ★ ELECCIÓN PRO</span>
                </div>
              </div>

              <div className="featured-card-body">
                <div className="featured-brand-row">
                  <span className="featured-icon">{program.icon}</span>
                  <div>
                    <h3 className="featured-title" onClick={() => onSelect(program)}>
                      {program.name}
                    </h3>
                    <span className="featured-dev">por {program.developer}</span>
                  </div>
                </div>

                <p className="featured-tagline">{program.tagline}</p>

                {/* Key Features Chips */}
                <div className="featured-features-chips">
                  {program.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="feat-chip">
                      <ShieldCheck size={14} className="feat-check-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="featured-footer-row">
                  <div className="featured-meta">
                    <span className="featured-size">{program.size}</span>
                    <span className="meta-sep">&bull;</span>
                    <span className="featured-dl">{program.downloadCount} descargas</span>
                  </div>

                  <div className="featured-btns">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelect(program)}
                    >
                      <span>Detalles</span>
                      <ArrowRight size={14} />
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onQuickDownload(program)}
                    >
                      <Download size={14} />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .featured-section {
          padding-top: 2rem;
          padding-bottom: 4rem;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .featured-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-medium);
          position: relative;
        }

        .featured-banner-wrapper {
          position: relative;
          height: 190px;
          cursor: pointer;
          overflow: hidden;
        }

        .featured-banner-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--t-smooth);
        }

        .featured-card:hover .featured-banner-wrapper img {
          transform: scale(1.06);
        }

        .featured-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 12, 20, 0.1) 0%, rgba(14, 20, 32, 0.95) 100%);
        }

        .featured-badge-pill {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(251, 191, 36, 0.4);
          color: #fbbf24;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          border-radius: var(--radius-full);
          backdrop-filter: blur(8px);
        }

        .featured-card-body {
          padding: 1.5rem 1.6rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .featured-brand-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .featured-icon {
          font-size: 2rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .featured-title {
          font-size: 1.3rem;
          font-weight: 800;
          cursor: pointer;
          transition: color var(--t-fast);
        }

        .featured-title:hover {
          color: var(--cyan-400);
        }

        .featured-dev {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .featured-tagline {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .featured-features-chips {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .feat-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .feat-check-icon {
          color: var(--emerald-400);
          flex-shrink: 0;
        }

        .featured-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .featured-meta {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .meta-sep {
          margin: 0 0.4rem;
        }

        .featured-btns {
          display: flex;
          gap: 0.6rem;
        }

        @media (max-width: 480px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          .featured-footer-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .featured-btns {
            width: 100%;
          }
          .featured-btns .btn {
            flex: 1;
          }
        }
      `}</style>
    </section>
  );
};
