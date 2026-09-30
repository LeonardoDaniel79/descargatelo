import React, { useState, useEffect, useRef } from 'react';
import { Search, Download, X, CornerDownLeft, Command } from 'lucide-react';
import type { Program } from '../types';
import { playChime } from '../utils/sound';

interface SpotlightCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  programs: Program[];
  onSelectProgram: (p: Program) => void;
  onQuickDownload: (p: Program) => void;
}

export const SpotlightCommandModal: React.FC<SpotlightCommandModalProps> = ({
  isOpen,
  onClose,
  programs,
  onSelectProgram,
  onQuickDownload,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playChime('hover');
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playChime('hover');
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        playChime('modal');
        onSelectProgram(filtered[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay spotlight-overlay" onClick={onClose}>
      <div 
        className="modal-window spotlight-window animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Spotlight Input Header */}
        <div className="spotlight-input-wrap">
          <Search size={22} className="spotlight-search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Escribe para buscar programas, herramientas, o pulsa Esc para salir..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="spotlight-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="spotlight-results-list">
          {filtered.length > 0 ? (
            filtered.slice(0, 7).map((prog, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={prog.id}
                  className={`spotlight-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    playChime('modal');
                    onSelectProgram(prog);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="spotlight-item-left">
                    <span className="spotlight-icon">{prog.icon}</span>
                    <div className="spotlight-info">
                      <div className="spotlight-name-row">
                        <span className="spotlight-name">{prog.name}</span>
                        <span className="badge badge-cyan">{prog.category}</span>
                        <span className="spotlight-ver">v{prog.version}</span>
                      </div>
                      <span className="spotlight-tagline">{prog.tagline}</span>
                    </div>
                  </div>

                  <div className="spotlight-item-actions">
                    <button
                      className="btn btn-primary btn-sm spotlight-dl-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        playChime('download');
                        onQuickDownload(prog);
                        onClose();
                      }}
                      title="Descargar de inmediato"
                    >
                      <Download size={13} />
                      <span>Descargar</span>
                    </button>
                    {isSelected && <CornerDownLeft size={16} className="enter-icon" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="spotlight-empty">
              <span>No se encontraron coincidencias para &quot;{query}&quot;</span>
            </div>
          )}
        </div>

        {/* Spotlight Footer Hints */}
        <div className="spotlight-footer">
          <div className="spotlight-keys-help">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navegar</span>
            <span><kbd>↵ Enter</kbd> Seleccionar</span>
            <span><kbd>Esc</kbd> Cerrar</span>
          </div>
          <div className="spotlight-brand-tag">
            <Command size={12} />
            <span>DESCÁRGATELO SPOTLIGHT</span>
          </div>
        </div>
      </div>

      <style>{`
        .spotlight-overlay {
          align-items: flex-start;
          padding-top: 10vh;
        }

        .spotlight-window {
          max-width: 680px;
          border: 1.5px solid var(--border-highlight);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 242, 254, 0.2);
          overflow: hidden;
        }

        .spotlight-input-wrap {
          display: flex;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-medium);
          background: rgba(14, 20, 36, 0.95);
        }

        .spotlight-search-icon {
          color: var(--cyan-400);
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .spotlight-input-wrap input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 1.15rem;
        }

        .spotlight-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.3rem;
          border-radius: var(--radius-sm);
        }

        .spotlight-close-btn:hover {
          color: #fff;
        }

        .spotlight-results-list {
          padding: 0.75rem;
          max-height: 420px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .spotlight-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--t-fast);
        }

        .spotlight-item-row:hover, .spotlight-item-row.selected {
          background: rgba(0, 242, 254, 0.1);
          border-color: rgba(0, 242, 254, 0.3);
        }

        .spotlight-item-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-width: 0;
          flex: 1;
        }

        .spotlight-icon {
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

        .spotlight-info {
          min-width: 0;
        }

        .spotlight-name-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.2rem;
        }

        .spotlight-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .spotlight-ver {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .spotlight-tagline {
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        .spotlight-item-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .enter-icon {
          color: var(--cyan-400);
        }

        .spotlight-empty {
          text-align: center;
          padding: 2.5rem;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .spotlight-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: rgba(6, 10, 20, 0.98);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .spotlight-keys-help {
          display: flex;
          gap: 1.25rem;
        }

        .spotlight-keys-help kbd {
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.08);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }

        .spotlight-brand-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--cyan-400);
        }
      `}</style>
    </div>
  );
};
