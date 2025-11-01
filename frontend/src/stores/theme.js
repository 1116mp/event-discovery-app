import { create } from 'zustand';

// Simple localStorage helper
const THEME_KEY = 'event-theme';

const loadTheme = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored || 'light';
  } catch {
    return 'light';
  }
};

const saveTheme = (theme) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

// Load initial theme and apply it immediately
const initialTheme = loadTheme();
if (typeof document !== 'undefined') {
  applyTheme(initialTheme);
}

const useThemeStore = create((set, get) => ({
  theme: initialTheme,
  
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    saveTheme(newTheme);
    applyTheme(newTheme);
    set({ theme: newTheme });
  },

  setTheme: (theme) => {
    saveTheme(theme);
    applyTheme(theme);
    set({ theme });
  },
}));

export default useThemeStore;

