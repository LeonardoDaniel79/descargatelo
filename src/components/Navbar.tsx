import React, { useState, useEffect } from 'react';
import { 
  DownloadCloud, 
  Search, 
  Sparkles, 
  Layers, 
  Gamepad2, 
  Wrench, 
  Flame, 
  Menu, 
  X,
  Heart,
  Volume2,
  VolumeX,
  Command,
  ShieldCheck,
  Zap
} from 'lucide-react';
import type { Category } from '../types';
import { playChime, toggleSound, isSoundEnabled } from '../utils/sound';

interface NavbarProps {
  onSelectCategory: (cat: Category) => void;
  activeCategory: Category;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onExploreClick: () => void;
  onOpenSpotlight?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
  favoritesCount,
  onOpenFavorites,
  onExploreClick,
  onOpenSpotlight
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);

    // Global keyboard shortcut: Ctrl+K / Cmd+K focuses search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('navbar-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navItems = [
    { label: 'Inicio', category: 'todos' as Category, icon: Sparkles },
    { label: 'Programas', category: 'programas' as Category, icon: Layers },
    { label: 'Juegos', category: 'juegos' as Category, icon: Gamepad2 },
    { label: 'Herramientas', category: 'herramientas' as Category, icon: Wrench },
    { label: 'Novedades', category: 'todos' as Category, isAnchor: '#novedades', icon: Flame },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    playChime('click');
    if (item.isAnchor) {
      const el = document.querySelector(item.isAnchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSelectCategory(item.category);
      onExploreClick();
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* High-Tech Telemetry Ribbon */}
      <div className="telemetry-ribbon">
        <div className="telemetry-item">
          <span className="telemetry-dot" />
          <span>RED DE DISTRIBUCIÓN: <strong className="telemetry-highlight">100% ONLINE</strong></span>
        </div>
        <div className="telemetry-item">
          <ShieldCheck size={14} className="text-cyan" />
          <span>SEGURIDAD: <strong className="telemetry-highlight">CERTIFICACIÓN CRIPTOGRÁFICA SHA-256</strong></span>
        </div>
        <div className="telemetry-item">
          <Zap size={14} className="text-amber" />
          <span>VELOCIDAD MEDIA: <strong className="telemetry-highlight">120 MB/s</strong></span>
        </div>
      </div>

      {/* Floating Island Navbar */}
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo */}
          <a 
            href="#" 
            className="brand-logo" 
            onClick={(e) => {
              e.preventDefault();
              playChime('click');
              onSelectCategory('todos');
            }}
            onMouseEnter={() => playChime('hover')}
          >
            <div className="logo-symbol">
              <DownloadCloud className="logo-svg" />
              <div className="logo-pulse-ring" />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">
                DESCÁRGA<span className="text-gradient">TELO</span>
              </span>
              <span className="logo-sub">AI CORE PLATFORM</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.category && !item.isAnchor;
              return (
                <button
                  key={idx}
                  className={`nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => playChime('hover')}
                >
                  <Icon size={15} className="nav-icon" />
                  <span>{item.label}</span>
                  {isActive && <div className="active-dot" />}
                </button>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="nav-actions">
            {/* Quick Search Bar with shortcut key */}
            <div className={`nav-search ${searchFocused ? 'focused' : ''}`}>
              <Search size={15} className="nav-search-icon" />
              <input
                id="navbar-search-input"
                type="text"
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => {
                  setSearchFocused(true);
                  playChime('hover');
                }}
                onBlur={() => setSearchFocused(false)}
              />
              {searchQuery ? (
                <button 
                  className="clear-search-btn" 
                  onClick={() => {
                    playChime('click');
                    onSearchChange('');
                  }}
                  title="Limpiar"
                >
                  <X size={13} />
                </button>
              ) : (
                <button 
                  className="kbd-shortcut" 
                  onClick={() => {
                    playChime('click');
                    if (onOpenSpotlight) onOpenSpotlight();
                  }}
                  title="Abrir Centro de Comando (Ctrl+K)"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <Command size={10} /> K
                </button>
              )}
            </div>

            {/* Sound Toggle */}
            <button 
              className={`sound-toggle-btn ${soundOn ? 'active' : ''}`}
              onClick={handleToggleSound}
              title={soundOn ? 'Desactivar efectos de sonido' : 'Activar efectos de sonido'}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Favorites Button */}
            <button 
              className="btn btn-ghost btn-icon fav-btn" 
              onClick={() => {
                playChime('modal');
                onOpenFavorites();
              }}
              onMouseEnter={() => playChime('hover')}
              title="Mis Guardados"
            >
              <Heart size={18} className={favoritesCount > 0 ? 'heart-filled' : ''} />
              {favoritesCount > 0 && (
                <span className="fav-badge">{favoritesCount}</span>
              )}
            </button>

            {/* Quick Explore Button */}
            <button 
              className="btn btn-primary btn-sm desktop-only-btn"
              onClick={() => {
                playChime('click');
                onExploreClick();
              }}
              onMouseEnter={() => playChime('hover')}
            >
              <Sparkles size={15} />
              <span>Explorar</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              className="btn btn-ghost btn-icon mobile-toggle"
              onClick={() => {
                playChime('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-drawer animate-slide-up">
            <div className="mobile-search-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar recursos en el catálogo..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div className="mobile-links-list">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    className="mobile-nav-link"
                    onClick={() => handleNavClick(item)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mobile-drawer-footer">
              <button 
                className="btn btn-secondary w-full"
                onClick={() => {
                  playChime('modal');
                  onOpenFavorites();
                  setMobileMenuOpen(false);
                }}
              >
                <Heart size={18} />
                <span>Mis Guardados ({favoritesCount})</span>
              </button>
            </div>
          </div>
        )}

        <style>{`
          .navbar-wrapper {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: rgba(3, 7, 18, 0.75);
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            border-bottom: 1px solid var(--border-subtle);
            transition: all var(--t-normal);
          }

          .navbar-wrapper.scrolled {
            background: rgba(3, 7, 18, 0.92);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
            border-bottom-color: rgba(0, 242, 254, 0.25);
          }

          .nav-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 74px;
          }

          .brand-logo {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            text-decoration: none;
          }

          .logo-symbol {
            position: relative;
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #00f2fe 0%, #38bdf8 45%, #7928ca 100%);
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            box-shadow: 0 4px 20px rgba(0, 242, 254, 0.45);
            transition: transform var(--t-fast);
          }

          .brand-logo:hover .logo-symbol {
            transform: rotate(-6deg) scale(1.08);
          }

          .logo-svg {
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
          }

          .logo-pulse-ring {
            position: absolute;
            inset: -3px;
            border-radius: calc(var(--radius-sm) + 3px);
            border: 1px solid rgba(0, 242, 254, 0.5);
            animation: pulseGlow 2s infinite;
          }

          .logo-text-group {
            display: flex;
            flex-direction: column;
          }

          .logo-title {
            font-family: var(--font-heading);
            font-weight: 900;
            font-size: 1.45rem;
            letter-spacing: -0.03em;
            color: var(--text-main);
            line-height: 1.1;
          }

          .logo-sub {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            color: var(--cyan-400);
            text-transform: uppercase;
          }

          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-subtle);
            padding: 0.35rem 0.5rem;
            border-radius: var(--radius-full);
            backdrop-filter: blur(12px);
          }

          .nav-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.48rem 0.95rem;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-family: var(--font-heading);
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            border-radius: var(--radius-full);
            transition: all var(--t-fast);
            position: relative;
          }

          .nav-btn:hover {
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.08);
          }

          .nav-btn.active {
            color: #fff;
            background: rgba(0, 242, 254, 0.14);
            border: 1px solid rgba(0, 242, 254, 0.3);
          }

          .active-dot {
            position: absolute;
            bottom: 3px;
            left: 50%;
            transform: translateX(-50%);
            width: 14px;
            height: 2px;
            background: var(--cyan-glow);
            border-radius: 2px;
            box-shadow: 0 0 10px var(--cyan-glow);
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.65rem;
          }

          .nav-search {
            position: relative;
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-full);
            padding: 0.42rem 0.85rem;
            width: 220px;
            transition: all var(--t-normal);
          }

          .nav-search.focused {
            width: 270px;
            border-color: var(--cyan-400);
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.25);
            background: rgba(14, 20, 36, 0.95);
          }

          .nav-search-icon {
            color: var(--text-muted);
            margin-right: 0.5rem;
            flex-shrink: 0;
          }

          .nav-search input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: var(--text-main);
            font-family: var(--font-body);
            font-size: 0.85rem;
          }

          .kbd-shortcut {
            display: inline-flex;
            align-items: center;
            gap: 2px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--border-subtle);
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            color: var(--text-muted);
          }

          .clear-search-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .clear-search-btn:hover {
            color: var(--text-main);
          }

          .fav-btn {
            position: relative;
          }

          .heart-filled {
            fill: var(--magenta-laser);
            color: var(--magenta-laser);
          }

          .fav-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: var(--magenta-laser);
            color: #fff;
            font-size: 0.68rem;
            font-weight: 800;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(244, 63, 94, 0.7);
          }

          .mobile-toggle {
            display: none;
          }

          .mobile-drawer {
            display: none;
          }

          @media (max-width: 992px) {
            .desktop-nav, .desktop-only-btn {
              display: none;
            }
            .mobile-toggle {
              display: inline-flex;
            }
            .nav-search {
              width: 170px;
            }
            .nav-search.focused {
              width: 200px;
            }

            .mobile-drawer {
              display: block;
              position: absolute;
              top: 74px;
              left: 0;
              right: 0;
              background: rgba(3, 7, 18, 0.98);
              border-bottom: 1px solid var(--border-medium);
              padding: 1.5rem;
              backdrop-filter: blur(30px);
              box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85);
            }

            .mobile-search-wrapper {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid var(--border-subtle);
              border-radius: var(--radius-md);
              padding: 0.8rem 1rem;
              margin-bottom: 1.5rem;
              color: var(--text-muted);
            }

            .mobile-search-wrapper input {
              background: transparent;
              border: none;
              outline: none;
              color: var(--text-main);
              width: 100%;
              font-size: 0.95rem;
            }

            .mobile-links-list {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              margin-bottom: 1.5rem;
            }

            .mobile-nav-link {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 0.85rem 1rem;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid var(--border-subtle);
              border-radius: var(--radius-sm);
              color: var(--text-main);
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              text-align: left;
              width: 100%;
            }

            .mobile-nav-link:hover {
              border-color: var(--cyan-400);
              background: rgba(0, 242, 254, 0.08);
            }

            .w-full {
              width: 100%;
            }
          }
        `}</style>
      </header>
    </>
  );
};
