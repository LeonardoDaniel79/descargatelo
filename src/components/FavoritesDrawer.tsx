import React from 'react';
import { X, Heart, Trash2, Download } from 'lucide-react';
import type { Program } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoritePrograms: Program[];
  onSelectProgram: (p: Program) => void;
  onQuickDownload: (p: Program) => void;
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoritePrograms,
  onSelectProgram,
  onQuickDownload,
  onRemoveFavorite,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window fav-drawer-window" onClick={(e) => e.stopPropagation()}>
        <div className="fav-drawer-header">
          <div className="fav-title-wrap">
            <Heart size={22} className="text-rose" fill="currentColor" />
            <h3>Mis Guardados ({favoritePrograms.length})</h3>
          </div>
          <div className="fav-actions">
            {favoritePrograms.length > 0 && (
              <button 
                className="btn btn-ghost btn-sm btn-clear-all"
                onClick={onClearAll}
                title="Limpiar todos los favoritos"
              >
                <Trash2 size={15} />
                <span>Vaciar</span>
              </button>
            )}
            <button className="modal-close-btn relative-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="fav-drawer-body">
          {favoritePrograms.length === 0 ? (
            <div className="empty-fav-state">
              <Heart size={44} className="empty-fav-icon" />
              <h4>No tienes programas guardados</h4>
              <p>Haz clic en el icono del corazón en cualquier tarjeta del catálogo para guardarlo aquí y tenerlo siempre a mano.</p>
              <button className="btn btn-primary btn-sm" onClick={onClose}>
                Explorar catálogo
              </button>
            </div>
          ) : (
            <div className="fav-items-list">
              {favoritePrograms.map((prog) => (
                <div key={prog.id} className="fav-item-row">
                  <div className="fav-item-left" onClick={() => { onSelectProgram(prog); onClose(); }}>
                    <div className="fav-prog-icon">{prog.icon}</div>
                    <div className="fav-prog-info">
                      <h4>{prog.name}</h4>
                      <span>v{prog.version} &bull; {prog.size} &bull; {prog.category}</span>
                    </div>
                  </div>

                  <div className="fav-item-actions">
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={() => { onQuickDownload(prog); onClose(); }}
                      title="Descargar"
                    >
                      <Download size={14} />
                      <span>Descargar</span>
                    </button>
                    <button 
                      className="btn btn-ghost btn-icon btn-sm remove-btn" 
                      onClick={() => onRemoveFavorite(prog.id)}
                      title="Quitar de favoritos"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .fav-drawer-window {
          max-width: 600px;
        }

        .fav-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .fav-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .fav-title-wrap h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .fav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .relative-close {
          position: static;
          width: 34px;
          height: 34px;
        }

        .btn-clear-all {
          color: var(--rose-500);
        }

        .fav-drawer-body {
          padding: 1.5rem 1.75rem 2rem;
          max-height: 65vh;
          overflow-y: auto;
        }

        .empty-fav-state {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-fav-icon {
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .empty-fav-state h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .empty-fav-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          max-width: 380px;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .fav-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fav-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8, 12, 20, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.15rem;
          gap: 1rem;
          transition: border-color var(--t-fast);
        }

        .fav-item-row:hover {
          border-color: var(--cyan-400);
        }

        .fav-item-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          min-width: 0;
          flex: 1;
        }

        .fav-prog-icon {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fav-prog-info {
          min-width: 0;
        }

        .fav-prog-info h4 {
          font-size: 1rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fav-prog-info span {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .fav-item-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .remove-btn:hover {
          color: var(--rose-500);
        }
      `}</style>
    </div>
  );
};
