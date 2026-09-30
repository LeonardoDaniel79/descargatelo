import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Heart,
  Laptop
} from 'lucide-react';
import type { Program, OperatingSystem } from '../types';
import { playChime } from '../utils/sound';

interface ProgramDetailModalProps {
  program: Program;
  onClose: () => void;
  onStartDownload: (program: Program, os: OperatingSystem) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onStartDownload,
  isFavorite,
  onToggleFavorite
}) => {
  const [selectedOs, setSelectedOs] = useState<OperatingSystem>(program.platforms[0] || 'windows');
  const [selectedScreenshot, setSelectedScreenshot] = useState<string>(program.screenshots[0] || program.bannerUrl);

  const getInstallerExt = (os: OperatingSystem) => {
    switch (os) {
      case 'windows': return '.exe (Instalador Nativo x64)';
      case 'mac': return '.dmg (Universal M1/M2/M3 & Intel)';
      case 'linux': return '.AppImage / .tar.gz (Multi-Distro)';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window detail-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={() => {
            playChime('click');
            onClose();
          }} 
          title="Cerrar ventana"
        >
          <X size={20} />
        </button>

        {/* Modal Banner Hero */}
        <div className="modal-hero-cover">
          <img src={selectedScreenshot} alt={program.name} className="modal-cover-img" />
          <div className="modal-hero-overlay" />

          {/* Floating Hero Info */}
          <div className="modal-hero-floating">
            <div className="modal-app-icon" style={{ borderColor: program.accentColor }}>
              <span>{program.icon}</span>
            </div>
            <div className="modal-hero-text">
              <div className="modal-pill-row">
                <span className="badge badge-cyan">{program.category.toUpperCase()}</span>
                <span className="badge badge-emerald">{program.license}</span>
                <span className="badge badge-amber">v{program.version}</span>
              </div>
              <h2 className="modal-title">{program.name}</h2>
              <p className="modal-tagline">{program.tagline}</p>
            </div>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="modal-body-content">
          <div className="modal-grid-layout">
            {/* Left Column */}
            <div className="modal-main-col">
              {/* Description */}
              <div className="detail-section-block">
                <h3 className="detail-heading">Acerca del recurso</h3>
                <p className="detail-paragraph">{program.description}</p>
              </div>

              {/* Screenshots Gallery */}
              <div className="detail-section-block">
                <h3 className="detail-heading">Capturas de pantalla y visuales</h3>
                <div className="screenshots-gallery">
                  {program.screenshots.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className={`thumb-card ${selectedScreenshot === imgUrl ? 'active' : ''}`}
                      onClick={() => {
                        playChime('hover');
                        setSelectedScreenshot(imgUrl);
                      }}
                    >
                      <img src={imgUrl} alt={`Captura ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="detail-section-block">
                <h3 className="detail-heading">Especificaciones & Capacidades</h3>
                <div className="features-list">
                  {program.features.map((feat, idx) => (
                    <div key={idx} className="feature-item-row">
                      <CheckCircle2 size={18} className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Requirements Table */}
              <div className="detail-section-block">
                <h3 className="detail-heading">Requisitos del Sistema Recomendados</h3>
                <div className="requirements-table">
                  <div className="req-row">
                    <span className="req-label">Sistema Operativo</span>
                    <span className="req-value">{program.requirements.os}</span>
                  </div>
                  <div className="req-row">
                    <span className="req-label">Procesador (CPU)</span>
                    <span className="req-value">{program.requirements.processor}</span>
                  </div>
                  <div className="req-row">
                    <span className="req-label">Memoria RAM</span>
                    <span className="req-value">{program.requirements.ram}</span>
                  </div>
                  <div className="req-row">
                    <span className="req-label">Tarjeta Gráfica</span>
                    <span className="req-value">{program.requirements.graphics}</span>
                  </div>
                  <div className="req-row">
                    <span className="req-label">Almacenamiento</span>
                    <span className="req-value">{program.requirements.storage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Download Card & Technical Specs */}
            <div className="modal-sidebar-col">
              {/* Primary Download Card */}
              <div className="download-action-card glass-card">
                <div className="dl-card-head">
                  <h4>Descargar {program.name}</h4>
                  <div className="verified-badge">
                    <ShieldCheck size={16} />
                    <span>Verificado & Sin Virus</span>
                  </div>
                </div>

                {/* OS Selector */}
                <div className="os-selector-box">
                  <label>Selecciona tu arquitectura:</label>
                  <div className="os-choice-buttons">
                    {program.platforms.map((os) => (
                      <button
                        key={os}
                        className={`os-select-btn ${selectedOs === os ? 'active' : ''}`}
                        onClick={() => {
                          playChime('click');
                          setSelectedOs(os);
                        }}
                      >
                        <Laptop size={14} />
                        <span>{os === 'windows' ? 'Windows' : os === 'mac' ? 'macOS' : 'Linux'}</span>
                      </button>
                    ))}
                  </div>
                  <div className="installer-info-text">
                    Formato de entrega: <strong>{getInstallerExt(selectedOs)}</strong>
                  </div>
                </div>

                {/* Big Download Button */}
                <button 
                  className="btn btn-primary btn-lg w-full btn-modal-download"
                  onClick={() => {
                    playChime('download');
                    onStartDownload(program, selectedOs);
                  }}
                  onMouseEnter={() => playChime('hover')}
                >
                  <Download size={22} />
                  <div className="btn-dl-text-wrap">
                    <span className="btn-dl-title">Descargar Ahora</span>
                    <span className="btn-dl-sub">{program.size} &bull; v{program.version}</span>
                  </div>
                </button>

                {/* Favorite & Share Buttons */}
                <div className="dl-aux-actions">
                  <button 
                    className={`btn btn-secondary btn-sm flex-1 ${isFavorite ? 'active-fav' : ''}`}
                    onClick={() => {
                      playChime('click');
                      onToggleFavorite(program.id);
                    }}
                  >
                    <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                    <span>{isFavorite ? 'En favoritos' : 'Guardar'}</span>
                  </button>

                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      playChime('click');
                      navigator.clipboard.writeText(window.location.href);
                      alert('¡Enlace del programa copiado al portapapeles!');
                    }}
                    title="Compartir enlace"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Technical Metadata Box */}
              <div className="specs-card glass-card">
                <h4 className="specs-title">Ficha Técnica Oficial</h4>
                <div className="spec-list">
                  <div className="spec-item">
                    <span className="spec-k">Desarrollador:</span>
                    <span className="spec-v">{program.developer}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-k">Versión Actual:</span>
                    <span className="spec-v">{program.version}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-k">Actualización:</span>
                    <span className="spec-v">{program.updatedDate}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-k">Licencia:</span>
                    <span className="spec-v">{program.license}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-k">Descargas:</span>
                    <span className="spec-v">{program.downloadCount}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-k">Calificación:</span>
                    <span className="spec-v rating-gold">★ {program.rating} / 5.0</span>
                  </div>
                </div>

                {/* Tags Cloud */}
                <div className="tags-cloud">
                  {program.tags.map((tag, idx) => (
                    <span key={idx} className="spec-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .detail-modal-window {
          max-width: 980px;
          border: 1px solid var(--border-highlight);
        }

        .modal-hero-cover {
          position: relative;
          height: 290px;
          overflow: hidden;
          background: #000;
        }

        .modal-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.65;
          transition: transform var(--t-smooth);
        }

        .modal-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 12, 22, 0.2) 0%, rgba(8, 12, 22, 0.98) 100%);
        }

        .modal-hero-floating {
          position: absolute;
          bottom: 24px;
          left: 28px;
          right: 28px;
          display: flex;
          align-items: flex-end;
          gap: 1.5rem;
          z-index: 2;
        }

        .modal-app-icon {
          width: 76px;
          height: 76px;
          background: rgba(13, 19, 33, 0.95);
          border: 2px solid;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .modal-pill-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .modal-title {
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.025em;
        }

        .modal-tagline {
          color: var(--text-secondary);
          font-size: 0.98rem;
        }

        .modal-body-content {
          padding: 2.2rem 2.2rem 2.75rem;
        }

        .modal-grid-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
        }

        .detail-section-block {
          margin-bottom: 2.25rem;
        }

        .detail-heading {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-main);
        }

        .detail-paragraph {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* Screenshots Gallery */
        .screenshots-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .thumb-card {
          height: 95px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          border: 2px solid var(--border-subtle);
          transition: all var(--t-fast);
        }

        .thumb-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-card:hover {
          border-color: var(--cyan-400);
          transform: translateY(-2px);
        }

        .thumb-card.active {
          border-color: var(--cyan-400);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.45);
        }

        /* Features List */
        .features-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .feature-item-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: var(--text-secondary);
        }

        .feat-check {
          color: var(--emerald-neon);
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Requirements Table */
        .requirements-table {
          background: rgba(3, 7, 18, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .req-row {
          display: flex;
          padding: 0.8rem 1.15rem;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.86rem;
        }

        .req-row:last-child {
          border-bottom: none;
        }

        .req-label {
          width: 150px;
          color: var(--text-muted);
          font-weight: 700;
          flex-shrink: 0;
        }

        .req-value {
          color: var(--text-main);
          font-weight: 500;
        }

        /* Right Column Download Box */
        .download-action-card {
          padding: 1.6rem;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--cyan-glow);
          box-shadow: 0 15px 35px -10px rgba(0, 242, 254, 0.35);
          margin-bottom: 1.75rem;
        }

        .dl-card-head {
          margin-bottom: 1.25rem;
        }

        .dl-card-head h4 {
          font-size: 1.25rem;
          margin-bottom: 0.35rem;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--emerald-neon);
          font-size: 0.8rem;
          font-weight: 800;
        }

        .os-selector-box {
          margin-bottom: 1.4rem;
        }

        .os-selector-box label {
          display: block;
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .os-choice-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.4rem;
          margin-bottom: 0.6rem;
        }

        .os-select-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          padding: 0.5rem 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--t-fast);
        }

        .os-select-btn:hover {
          color: #fff;
          border-color: var(--border-medium);
        }

        .os-select-btn.active {
          background: rgba(0, 242, 254, 0.18);
          border-color: var(--cyan-400);
          color: var(--cyan-400);
        }

        .installer-info-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .installer-info-text strong {
          color: var(--text-main);
        }

        .btn-modal-download {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.95rem 1.35rem;
          margin-bottom: 1rem;
        }

        .btn-dl-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .btn-dl-title {
          font-size: 1.08rem;
          font-weight: 900;
        }

        .btn-dl-sub {
          font-size: 0.75rem;
          opacity: 0.9;
          font-weight: 600;
        }

        .dl-aux-actions {
          display: flex;
          gap: 0.6rem;
        }

        .active-fav {
          color: var(--magenta-laser);
          border-color: var(--magenta-laser);
        }

        /* Specs Box */
        .specs-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
        }

        .specs-title {
          font-size: 1.05rem;
          margin-bottom: 1rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .spec-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .spec-k {
          color: var(--text-muted);
        }

        .spec-v {
          font-weight: 600;
          color: var(--text-main);
        }

        .rating-gold {
          color: #fbbf24;
          font-weight: 800;
        }

        .tags-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .spec-tag {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 0.15rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
        }

        @media (max-width: 820px) {
          .modal-grid-layout {
            grid-template-columns: 1fr;
          }
          .modal-hero-floating {
            flex-direction: column;
            align-items: flex-start;
            bottom: 16px;
            left: 16px;
            right: 16px;
          }
          .modal-app-icon {
            width: 58px;
            height: 58px;
            font-size: 2rem;
          }
          .modal-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};
