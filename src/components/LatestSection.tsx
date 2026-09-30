import React from 'react';
import { Flame, Clock, Download } from 'lucide-react';
import type { Program } from '../types';

interface LatestSectionProps {
  programs: Program[];
  onSelect: (program: Program) => void;
  onQuickDownload: (program: Program) => void;
}

export const LatestSection: React.FC<LatestSectionProps> = ({
  programs,
  onSelect,
  onQuickDownload
}) => {
  const latestPrograms = programs.filter(p => p.latest).slice(0, 4);

  return (
    <section className="section latest-section" id="novedades">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-tag">
              <Flame size={16} />
              <span>Actualizaciones Frecuentes</span>
            </div>
            <h2 className="section-title">Últimas <span className="text-gradient">Novedades</span></h2>
            <p className="section-desc">
              Versiones recién publicadas con mejoras de rendimiento, parches de seguridad y nuevas funciones.
            </p>
          </div>
        </div>

        <div className="latest-grid">
          {latestPrograms.map((program) => (
            <div key={program.id} className="latest-card glass-card">
              <div className="latest-card-top">
                <div className="latest-icon-box">{program.icon}</div>
                <div className="latest-header-text">
                  <div className="latest-badge-row">
                    <span className="badge badge-emerald">v{program.version}</span>
                    <span className="latest-date">
                      <Clock size={12} />
                      <span>{program.updatedDate}</span>
                    </span>
                  </div>
                  <h3 className="latest-title" onClick={() => onSelect(program)}>
                    {program.name}
                  </h3>
                </div>
              </div>

              <p className="latest-desc">{program.tagline}</p>

              <div className="latest-actions-row">
                <span className="latest-size">{program.size}</span>
                <div className="latest-buttons">
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => onSelect(program)}
                  >
                    Detalles
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onQuickDownload(program)}
                  >
                    <Download size={14} />
                    <span>Bajar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .latest-section {
          padding-top: 1rem;
          padding-bottom: 3.5rem;
        }

        .latest-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .latest-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--border-subtle);
          transition: all var(--t-normal);
        }

        .latest-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          transform: translateY(-3px);
        }

        .latest-card-top {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .latest-icon-box {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          flex-shrink: 0;
        }

        .latest-header-text {
          min-width: 0;
          flex: 1;
        }

        .latest-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .latest-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .latest-title {
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .latest-title:hover {
          color: var(--cyan-400);
        }

        .latest-desc {
          color: var(--text-secondary);
          font-size: 0.86rem;
          line-height: 1.45;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .latest-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .latest-size {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .latest-buttons {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </section>
  );
};
