import React from 'react';
import { TrendingUp, Download, ExternalLink } from 'lucide-react';
import type { Program } from '../types';

interface PopularSectionProps {
  programs: Program[];
  onSelect: (program: Program) => void;
  onQuickDownload: (program: Program) => void;
}

export const PopularSection: React.FC<PopularSectionProps> = ({
  programs,
  onSelect,
  onQuickDownload
}) => {
  // Sort by downloadCountNum descending
  const topPopular = [...programs]
    .sort((a, b) => b.downloadCountNum - a.downloadCountNum)
    .slice(0, 4);

  return (
    <section className="section popular-section" id="populares">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-tag">
              <TrendingUp size={16} />
              <span>Récords de Descargas</span>
            </div>
            <h2 className="section-title">Más <span className="text-gradient">Populares</span></h2>
            <p className="section-desc">
              Las aplicaciones con mayor cantidad de descargas acumuladas y máxima satisfacción de usuarios.
            </p>
          </div>
        </div>

        <div className="popular-cards-grid">
          {topPopular.map((program, index) => (
            <div key={program.id} className="popular-card glass-card">
              {/* Rank Badge */}
              <div className={`rank-badge ${index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : ''}`}>
                #{index + 1}
              </div>

              <div className="popular-card-content">
                <div className="popular-top-info" onClick={() => onSelect(program)}>
                  <div className="popular-icon">{program.icon}</div>
                  <div className="popular-title-wrap">
                    <h3 className="popular-title">{program.name}</h3>
                    <div className="popular-metrics">
                      <span className="dl-metric">⬇️ {program.downloadCount}</span>
                      <span className="rating-metric">★ {program.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="popular-snippet">{program.tagline}</p>

                {/* Popularity Visual Bar */}
                <div className="popular-bar-wrap">
                  <div className="popular-bar-track">
                    <div 
                      className="popular-bar-fill" 
                      style={{ width: `${Math.max(30, 100 - (index * 18))}%` }} 
                    />
                  </div>
                  <span className="popular-percent-label">Alta demanda</span>
                </div>

                <div className="popular-actions">
                  <button 
                    className="btn btn-secondary btn-sm flex-1"
                    onClick={() => onSelect(program)}
                  >
                    <ExternalLink size={14} />
                    <span>Detalles</span>
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onQuickDownload(program)}
                    title="Descarga rápida"
                  >
                    <Download size={14} />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .popular-section {
          padding-top: 1rem;
          padding-bottom: 4rem;
        }

        .popular-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.75rem;
        }

        .popular-card {
          position: relative;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .popular-card:hover {
          border-color: rgba(0, 242, 254, 0.4);
        }

        .rank-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 900;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }

        .rank-badge.rank-1 {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border-color: rgba(251, 191, 36, 0.5);
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
        }

        .rank-badge.rank-2 {
          background: rgba(0, 242, 254, 0.15);
          color: var(--cyan-400);
          border-color: rgba(0, 242, 254, 0.4);
        }

        .popular-card-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .popular-top-info {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 0.85rem;
          cursor: pointer;
        }

        .popular-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .popular-title-wrap {
          min-width: 0;
          flex: 1;
        }

        .popular-title {
          font-size: 1.15rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .popular-title:hover {
          color: var(--cyan-400);
        }

        .popular-metrics {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
        }

        .dl-metric {
          color: var(--cyan-400);
          font-weight: 600;
        }

        .rating-metric {
          color: #fbbf24;
          font-weight: 700;
        }

        .popular-snippet {
          color: var(--text-secondary);
          font-size: 0.86rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .popular-bar-wrap {
          margin-bottom: 1.25rem;
        }

        .popular-bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.35rem;
        }

        .popular-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f2fe, #7928ca);
          border-radius: var(--radius-full);
        }

        .popular-percent-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .popular-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
      `}</style>
    </section>
  );
};
