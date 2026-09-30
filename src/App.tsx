import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';
import { LatestSection } from './components/LatestSection';
import { PopularSection } from './components/PopularSection';
import { CatalogSection } from './components/CatalogSection';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { DownloadModal } from './components/DownloadModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CyberCanvas } from './components/CyberCanvas';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { SpotlightCommandModal } from './components/SpotlightCommandModal';
import { ThemeAuraSelector } from './components/ThemeAuraSelector';
import { PROGRAMS_DATA } from './data/programs';
import type { Program, Category, OperatingSystem, SortOption, ToastMessage } from './types';

export const App: React.FC = () => {
  // State
  const [activeCategory, setActiveCategory] = useState<Category>('todos');
  const [activeOs, setActiveOs] = useState<OperatingSystem | 'todos'>('todos');
  const [activeSort, setActiveSort] = useState<SortOption>('populares');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [downloadingProgram, setDownloadingProgram] = useState<Program | null>(null);
  const [downloadingOs, setDownloadingOs] = useState<OperatingSystem>('windows');
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('descargatelo_favs');
      return saved ? JSON.parse(saved) : ['blender-3d', 'obs-studio', 'vscode'];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem('descargatelo_favs', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  // Global Shortcut for Command Center (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const prog = PROGRAMS_DATA.find((p) => p.id === id);
      if (exists) {
        addToast('Eliminado de guardados', `Se quitó ${prog?.name || 'el programa'} de tus favoritos.`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('¡Guardado en favoritos!', `${prog?.name || 'El programa'} se agregó a tu lista de accesos directos.`, 'success');
        return [...prev, id];
      }
    });
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
    addToast('Favoritos vaciados', 'Se han eliminado todos los programas de tus guardados.', 'info');
  };

  const handleQuickDownload = (program: Program) => {
    const defaultOs = program.platforms[0] || 'windows';
    setDownloadingProgram(program);
    setDownloadingOs(defaultOs);
  };

  const handleDetailDownload = (program: Program, os: OperatingSystem) => {
    setSelectedProgram(null);
    setDownloadingProgram(program);
    setDownloadingOs(os);
  };

  const handleDownloadFinished = (program: Program) => {
    addToast('¡Descarga completada!', `${program.name} se ha guardado en tu equipo.`, 'download');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted Catalog
  const filteredPrograms = useMemo(() => {
    let result = [...PROGRAMS_DATA];

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.developer.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (activeCategory !== 'todos') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // OS Filter
    if (activeOs !== 'todos') {
      result = result.filter((p) => p.platforms.includes(activeOs));
    }

    // Sort
    result.sort((a, b) => {
      switch (activeSort) {
        case 'populares':
          return b.downloadCountNum - a.downloadCountNum;
        case 'recientes':
          return b.latest ? -1 : 1;
        case 'calificacion':
          return b.rating - a.rating;
        case 'nombre':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, activeCategory, activeOs, activeSort]);

  const favoriteProgramsList = useMemo(() => {
    return PROGRAMS_DATA.filter((p) => favorites.includes(p.id));
  }, [favorites]);

  return (
    <div className="app-layout">
      {/* Interactive Cyber Constellation Canvas */}
      <CyberCanvas />

      {/* Dynamic Ambient Glow Backdrops */}
      <div className="ambient-glow ambient-1" />
      <div className="ambient-glow ambient-2" />
      <div className="ambient-glow ambient-3" />

      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onExploreClick={scrollToCatalog}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
      />

      {/* Global Live Activity Ticker Stream */}
      <LiveActivityTicker
        programs={PROGRAMS_DATA}
        onSelectProgram={setSelectedProgram}
      />

      {/* Main Content Area */}
      <main>
        {/* Spectacular Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Featured Editorial Selection */}
        <FeaturedSection
          programs={PROGRAMS_DATA}
          onSelect={setSelectedProgram}
          onQuickDownload={handleQuickDownload}
        />

        {/* Latest Software Updates */}
        <LatestSection
          programs={PROGRAMS_DATA}
          onSelect={setSelectedProgram}
          onQuickDownload={handleQuickDownload}
        />

        {/* Most Popular Software */}
        <PopularSection
          programs={PROGRAMS_DATA}
          onSelect={setSelectedProgram}
          onQuickDownload={handleQuickDownload}
        />

        {/* Full Filterable Catalog */}
        <CatalogSection
          programs={filteredPrograms}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeOs={activeOs}
          onSelectOs={setActiveOs}
          activeSort={activeSort}
          onSelectSort={setActiveSort}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectProgram={setSelectedProgram}
          onQuickDownload={handleQuickDownload}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onExploreClick={scrollToCatalog}
      />

      {/* Detail Modal */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onStartDownload={handleDetailDownload}
          isFavorite={favorites.includes(selectedProgram.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Download Simulation Progress Modal */}
      {downloadingProgram && (
        <DownloadModal
          program={downloadingProgram}
          os={downloadingOs}
          onClose={() => setDownloadingProgram(null)}
          onFinished={handleDownloadFinished}
        />
      )}

      {/* Saved Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoritePrograms={favoriteProgramsList}
        onSelectProgram={setSelectedProgram}
        onQuickDownload={handleQuickDownload}
        onRemoveFavorite={handleToggleFavorite}
        onClearAll={handleClearAllFavorites}
      />

      {/* Floating Theme Aura Palette Selector */}
      <ThemeAuraSelector />

      {/* Spotlight Command Modal (Ctrl+K) */}
      <SpotlightCommandModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        programs={PROGRAMS_DATA}
        onSelectProgram={setSelectedProgram}
        onQuickDownload={handleQuickDownload}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
