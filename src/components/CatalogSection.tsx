import React from 'react';
import { 
  Filter, 
  Search, 
  Layers, 
  Gamepad2, 
  Wrench, 
  Sparkles, 
  Code, 
  BrainCircuit, 
  Video, 
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import type { Program, Category, OperatingSystem, SortOption } from '../types';
import { ProgramCard } from './ProgramCard';

interface CatalogSectionProps {
  programs: Program[];
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  activeOs: OperatingSystem | 'todos';
  onSelectOs: (os: OperatingSystem | 'todos') => void;
  activeSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProgram: (p: Program) => void;
  onQuickDownload: (p: Program) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  programs,
  activeCategory,
  onSelectCategory,
  activeOs,
  onSelectOs,
  activeSort,
  onSelectSort,
  searchQuery,
  onSearchChange,
  onSelectProgram,
  onQuickDownload,
  favorites,
  onToggleFavorite
}) => {
  const categories: { id: Category; label: string; icon: React.ElementType }[] = [
    { id: 'todos', label: 'Todos', icon: Layers },
    { id: 'programas', label: 'Programas', icon: Sparkles },
    { id: 'juegos', label: 'Juegos', icon: Gamepad2 },
    { id: 'herramientas', label: 'Herramientas', icon: Wrench },
    { id: 'multimedia', label: 'Multimedia', icon: Video },
    { id: 'desarrollo', label: 'Desarrollo', icon: Code },
    { id: 'ia', label: 'Inteligencia Artificial', icon: BrainCircuit },
  ];

  const osList: { id: OperatingSystem | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos los SO' },
    { id: 'windows', label: 'Windows' },
    { id: 'mac', label: 'macOS' },
    { id: 'linux', label: 'Linux' },
  ];

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'populares', label: 'Más Populares' },
    { id: 'recientes', label: 'Más Recientes' },
    { id: 'calificacion', label: 'Mejor Calificados' },
    { id: 'nombre', label: 'Nombre (A-Z)' },
  ];

  const handleResetFilters = () => {
    onSelectCategory('todos');
    onSelectOs('todos');
    onSearchChange('');
    onSelectSort('populares');
  };

  return (
    <section className="section catalog-section" id="catalogo">
      <div className="container">
        {/* Section Header */}
        <div className="section-head catalog-top-head">
          <div>
            <div className="section-tag">
              <Filter size={16} />
              <span>Explorador Inteligente</span>
            </div>
            <h2 className="section-title">Catálogo Completo</h2>
            <p className="section-desc">
              Filtra entre cientos de recursos tecnológicos verificados y listos para ejecutar.
            </p>
          </div>

          <div className="results-counter-pill">
            <span className="counter-dot" />
            <span>{programs.length} {programs.length === 1 ? 'resultado disponible' : 'resultados disponibles'}</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-controls-card glass-card">
          {/* Category Tabs */}
          <div className="category-scroll-strip">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`cat-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub Filters Row: OS & Sorting */}
          <div className="sub-filters-row">
            {/* OS Filter Chips */}
            <div className="os-filter-group">
              <span className="filter-label">Sistema:</span>
              <div className="os-chips">
                {osList.map((item) => (
                  <button
                    key={item.id}
                    className={`os-filter-btn ${activeOs === item.id ? 'active' : ''}`}
                    onClick={() => onSelectOs(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Search Controls */}
            <div className="sort-search-group">
              <div className="sort-dropdown-wrap">
                <ArrowUpDown size={15} className="sort-icon" />
                <select
                  value={activeSort}
                  onChange={(e) => onSelectSort(e.target.value as SortOption)}
                  className="sort-select"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || activeCategory !== 'todos' || activeOs !== 'todos') && (
                <button 
                  className="btn btn-ghost btn-sm reset-filter-btn" 
                  onClick={handleResetFilters}
                  title="Restablecer todos los filtros"
                >
                  <RotateCcw size={14} />
                  <span>Restablecer</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        {programs.length > 0 ? (
          <div className="programs-catalog-grid">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={onSelectProgram}
                onQuickDownload={onQuickDownload}
                isFavorite={favorites.includes(program.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-catalog-state glass-card">
            <div className="empty-icon-box">
              <Search size={36} />
            </div>
            <h3>No encontramos resultados para tu búsqueda</h3>
            <p>
              Prueba cambiando el término de búsqueda &quot;{searchQuery}&quot; o ajusta los filtros de sistema operativo y categoría.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              <RotateCcw size={16} />
              <span>Ver todos los programas</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .catalog-section {
          padding-top: 1rem;
          padding-bottom: 6rem;
        }

        .catalog-top-head {
          margin-bottom: 2rem;
        }

        .results-counter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: rgba(0, 242, 254, 0.08);
          border: 1px solid rgba(0, 242, 254, 0.2);
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--cyan-400);
          font-weight: 600;
        }

        .counter-dot {
          width: 8px;
          height: 8px;
          background: var(--cyan-400);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--cyan-400);
        }

        /* Filter Controls Container */
        .filter-controls-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          margin-bottom: 2.75rem;
          border: 1px solid var(--border-medium);
          background: rgba(14, 20, 32, 0.85);
        }

        /* Category Scroll Strip */
        .category-scroll-strip {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          overflow-x: auto;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          scrollbar-width: thin;
        }

        .cat-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 1.25rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--t-fast);
        }

        .cat-pill-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: var(--border-medium);
        }

        .cat-pill-btn.active {
          background: linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%);
          color: #080c14;
          border-color: transparent;
          font-weight: 800;
          box-shadow: 0 4px 15px rgba(0, 242, 254, 0.35);
        }

        /* Sub Filters */
        .sub-filters-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .os-filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .os-chips {
          display: flex;
          gap: 0.4rem;
        }

        .os-filter-btn {
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--t-fast);
        }

        .os-filter-btn:hover {
          color: var(--text-main);
          border-color: var(--border-medium);
        }

        .os-filter-btn.active {
          background: rgba(0, 242, 254, 0.15);
          color: var(--cyan-400);
          border-color: rgba(0, 242, 254, 0.4);
        }

        .sort-search-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .sort-dropdown-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .sort-icon {
          position: absolute;
          left: 0.9rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .sort-select {
          background: rgba(8, 12, 20, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.55rem 1rem 0.55rem 2.4rem;
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: border-color var(--t-fast);
        }

        .sort-select:focus {
          border-color: var(--cyan-400);
        }

        .reset-filter-btn {
          color: var(--rose-500);
        }

        /* Programs Grid */
        .programs-catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
          gap: 1.85rem;
        }

        /* Empty State */
        .empty-catalog-state {
          text-align: center;
          padding: 4.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 580px;
          margin: 0 auto;
        }

        .empty-icon-box {
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .empty-catalog-state h3 {
          font-size: 1.4rem;
          margin-bottom: 0.6rem;
        }

        .empty-catalog-state p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .sub-filters-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .sort-search-group {
            width: 100%;
            justify-content: space-between;
          }
          .sort-select {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
