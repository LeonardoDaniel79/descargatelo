export type Category = 
  | 'todos' 
  | 'programas' 
  | 'juegos' 
  | 'herramientas' 
  | 'multimedia' 
  | 'desarrollo' 
  | 'ia';

export type OperatingSystem = 'windows' | 'mac' | 'linux';

export type SortOption = 'populares' | 'recientes' | 'calificacion' | 'nombre';

export interface SystemRequirements {
  os: string;
  processor: string;
  ram: string;
  graphics: string;
  storage: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: Category;
  version: string;
  releaseDate: string;
  updatedDate: string;
  size: string;
  license: 'Gratis' | 'Open Source' | 'Freemium';
  developer: string;
  rating: number; // e.g. 4.9
  reviewCount: number;
  downloadCount: string; // e.g. "12.4M"
  downloadCountNum: number;
  platforms: OperatingSystem[];
  featured?: boolean;
  popular?: boolean;
  latest?: boolean;
  icon: string; // Emoji, SVG or image
  accentColor: string; // Hex color for glow effects
  bannerUrl: string; // Large high-res image
  screenshots: string[];
  features: string[];
  requirements: SystemRequirements;
  tags: string[];
}

export interface FilterState {
  search: string;
  category: Category;
  os: OperatingSystem | 'todos';
  sort: SortOption;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'download' | 'warning';
}
