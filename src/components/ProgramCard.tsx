import React from 'react';
import { 
  Download, 
  ExternalLink, 
  Star, 
  HardDrive, 
  Heart
} from 'lucide-react';
import type { Program, OperatingSystem } from '../types';
import { playChime } from '../utils/sound';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
  onQuickDownload: (program: Program) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onSelect,
  onQuickDownload,
  isFavorite,
  onToggleFavorite
}) => {
  const getOsLabel = (os: OperatingSystem) => {
    switch (os) {
      case 'windows': return 'Win';
      case 'mac': return 'Mac';
      case 'linux': return 'Linux';
    }
  };

  return (
    <article 
      className="program-card glass-card"
      onMouseEnter={() => playChime('hover')}
    >
      {/* Top Banner & Badges */}
      <div 
        className="card-media-banner" 
        onClick={() => {
          playChime('modal');
          onSelect(program);
        }}
      >
        <img src={program.bannerUrl} alt={program.name} loading="lazy" />
        <div className="card-media-gradient" />

        {/* Favorite Heart Button */}
        <button 
          className={`card-fav-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playChime('click');
            onToggleFavorite(program.id);
          }}
          title={isFavorite ? 'Quitar de guardados' : 'Guardar en favoritos'}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Top Badges */}
        <div className="card-top-badges">
          {program.featured && (
            <span className="badge badge-cyan">★ Destacado</span>
          )}
          {program.latest && (
            <span className="badge badge-emerald">Nuevo</span>
          )}
        </div>

        {/* Version Badge */}
        <div className="card-version-pill">
          v{program.version}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        {/* Header with Icon, Name & Category */}
        <div 
          className="card-header-row" 
          onClick={() => {
            playChime('modal');
            onSelect(program);
          }}
        >
          <div className="card-app-icon" style={{ borderColor: program.accentColor }}>
            <span className="emoji-icon">{program.icon}</span>
          </div>

          <div className="card-title-group">
            <h3 className="card-title">{program.name}</h3>
            <div className="card-cat-row">
              <span className="card-cat-label">{program.category.toUpperCase()}</span>
              <span className="cat-bullet">&bull;</span>
              <span className="card-license">{program.license}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p 
          className="card-description" 
          onClick={() => {
            playChime('modal');
            onSelect(program);
          }}
        >
          {program.description}
        </p>

        {/* Meta details: Size, Rating, OS Badges */}
        <div className="card-meta-box">
          <div className="meta-left">
            <div className="meta-item" title="Tamaño de descarga">
              <HardDrive size={13} className="meta-icon" />
              <span>{program.size}</span>
            </div>
            <div className="meta-item rating" title={`${program.reviewCount.toLocaleString()} opiniones`}>
              <Star size={13} className="star-icon" fill="currentColor" />
              <span>{program.rating}</span>
            </div>
          </div>

          {/* Operating Systems Badges */}
          <div className="os-chips-group">
            {program.platforms.map((os) => (
              <span key={os} className={`os-chip ${os}`}>
                {getOsLabel(os)}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions-footer">
          <button 
            className="btn btn-secondary btn-sm flex-1" 
            onClick={() => {
              playChime('modal');
              onSelect(program);
            }}
          >
            <ExternalLink size={14} />
            <span>Ver detalles</span>
          </button>

          <button 
            className="btn btn-primary btn-sm btn-quick-dl" 
            onClick={(e) => {
              e.stopPropagation();
              playChime('download');
              onQuickDownload(program);
            }}
            title="Descargar paquete seguro"
          >
            <Download size={14} />
            <span>Descargar</span>
          </button>
        </div>
      </div>

      <style>{`
        .program-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: default;
          position: relative;
          border: 1px solid var(--border-subtle);
          background: rgba(13, 19, 33, 0.75);
        }

        .program-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          border: 1.5px solid transparent;
          pointer-events: none;
          transition: border-color var(--t-fast);
        }

        .program-card:hover::after {
          border-color: rgba(0, 242, 254, 0.35);
        }

        .card-media-banner {
          position: relative;
          height: 154px;
          overflow: hidden;
          cursor: pointer;
        }

        .card-media-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--t-smooth);
        }

        .program-card:hover .card-media-banner img {
          transform: scale(1.08);
        }

        .card-media-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(3, 7, 18, 0.15) 0%, rgba(13, 19, 33, 0.98) 100%);
        }

        .card-fav-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 4;
          background: rgba(3, 7, 18, 0.75);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all var(--t-fast);
        }

        .card-fav-btn:hover {
          color: var(--magenta-laser);
          border-color: var(--magenta-laser);
          transform: scale(1.1);
        }

        .card-fav-btn.favorited {
          color: var(--magenta-laser);
          background: rgba(244, 63, 94, 0.2);
          border-color: var(--magenta-laser);
        }

        .card-top-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 4;
          display: flex;
          gap: 0.4rem;
        }

        .card-version-pill {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 4;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid var(--border-subtle);
          color: var(--cyan-400);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.15rem 0.6rem;
          border-radius: var(--radius-sm);
          backdrop-filter: blur(10px);
        }

        .card-body {
          padding: 1.35rem 1.45rem 1.45rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
          cursor: pointer;
        }

        .card-app-icon {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .emoji-icon {
          font-size: 1.45rem;
        }

        .card-title-group {
          min-width: 0;
          flex: 1;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-main);
          transition: color var(--t-fast);
        }

        .card-header-row:hover .card-title {
          color: var(--cyan-400);
        }

        .card-cat-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .card-cat-label {
          color: var(--cyan-400);
          font-weight: 700;
        }

        .card-license {
          color: var(--text-secondary);
        }

        .card-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          cursor: pointer;
          flex: 1;
        }

        .card-meta-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.9rem;
          background: rgba(3, 7, 18, 0.65);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
          font-size: 0.8rem;
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .meta-icon {
          color: var(--text-muted);
        }

        .meta-item.rating {
          color: #fbbf24;
          font-weight: 800;
        }

        .star-icon {
          color: #fbbf24;
        }

        .os-chips-group {
          display: flex;
          gap: 0.35rem;
        }

        .os-chip {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.12rem 0.48rem;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          text-transform: uppercase;
        }

        .os-chip.windows {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.35);
        }
        .os-chip.mac {
          color: #e2e8f0;
        }
        .os-chip.linux {
          color: #f59e0b;
          border-color: rgba(245, 158, 11, 0.35);
        }

        .card-actions-footer {
          display: flex;
          gap: 0.65rem;
          align-items: center;
        }

        .flex-1 {
          flex: 1;
        }

        .btn-quick-dl {
          padding-left: 1.15rem;
          padding-right: 1.15rem;
        }
      `}</style>
    </article>
  );
};
