import React from 'react';
import { DownloadCloud, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import type { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onExploreClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onExploreClick }) => {
  return (
    <footer className="footer-wrap">
      <div className="container footer-content-grid">
        {/* Brand Column */}
        <div className="footer-col-brand">
          <div className="brand-logo footer-logo">
            <div className="logo-symbol">
              <DownloadCloud className="logo-svg" />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">
                DESCÁRGA<span className="text-gradient">TELO</span>
              </span>
              <span className="logo-sub">CATÁLOGO DIGITAL</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            La plataforma de referencia para descubrir, explorar y descargar software libre, herramientas esenciales y videojuegos independientes verificados. 100% libre de adware, instaladores invasivos o costos ocultos.
          </p>
          <div className="footer-badges-strip">
            <span className="badge badge-emerald">
              <ShieldCheck size={14} />
              <span>Garantía Limpia</span>
            </span>
            <span className="badge badge-cyan">
              <Sparkles size={14} />
              <span>Alta Velocidad</span>
            </span>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Categorías</h4>
          <ul className="footer-links">
            <li>
              <button onClick={() => { onSelectCategory('programas'); onExploreClick(); }}>
                Programas de Sistema
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('juegos'); onExploreClick(); }}>
                Videojuegos & Emuladores
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('herramientas'); onExploreClick(); }}>
                Herramientas & Utilidades
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('desarrollo'); onExploreClick(); }}>
                Desarrollo & Programación
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectCategory('ia'); onExploreClick(); }}>
                Inteligencia Artificial Local
              </button>
            </li>
          </ul>
        </div>

        {/* Operating Systems Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Plataformas</h4>
          <ul className="footer-links">
            <li><a href="#catalogo">Descargas para Windows 11/10</a></li>
            <li><a href="#catalogo">Descargas para macOS (Apple Silicon / Intel)</a></li>
            <li><a href="#catalogo">Paquetes para Linux (AppImage, Deb)</a></li>
            <li><a href="#catalogo">Repositortios de Código Abierto</a></li>
          </ul>
        </div>

        {/* Guarantees & Privacy */}
        <div className="footer-col">
          <h4 className="footer-heading">Compromiso</h4>
          <ul className="footer-links">
            <li><span className="static-item">Cero Software Espía o Telemetría</span></li>
            <li><span className="static-item">Sin Gestores de Descarga Fraudulentos</span></li>
            <li><span className="static-item">Hash SHA-256 Verificado por Fuente</span></li>
            <li><span className="static-item">Servidores Espejo de Alta Disponibilidad</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} <strong>DESCÁRGATELO</strong>. Todos los nombres, marcas e iconos pertenecen a sus respectivos desarrolladores y proyectos de código abierto.
          </p>
          <div className="made-with-tag">
            <span>Hecho con dedicación y excelencia UI/UX</span>
            <Heart size={14} className="text-rose" fill="currentColor" />
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          border-top: 1px solid var(--border-subtle);
          background: rgba(6, 9, 16, 0.95);
          position: relative;
          z-index: 10;
          padding-top: 4.5rem;
        }

        .footer-content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-col-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-logo {
          margin-bottom: 0.25rem;
        }

        .footer-brand-desc {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.65;
        }

        .footer-badges-strip {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .footer-heading {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a, .footer-links button {
          background: transparent;
          border: none;
          padding: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-decoration: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-body);
          transition: color var(--t-fast);
        }

        .footer-links a:hover, .footer-links button:hover {
          color: var(--cyan-400);
        }

        .static-item {
          color: var(--text-muted);
          font-size: 0.88rem;
        }

        .footer-bottom-bar {
          border-top: 1px solid var(--border-subtle);
          padding: 1.85rem 0;
          background: rgba(4, 6, 12, 0.98);
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright-text {
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .copyright-text strong {
          color: var(--text-secondary);
        }

        .made-with-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .text-rose {
          color: var(--rose-500);
        }

        @media (max-width: 992px) {
          .footer-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .footer-content-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};
