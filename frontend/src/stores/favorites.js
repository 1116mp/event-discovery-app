import { create } from 'zustand';

// Simple localStorage helper
const STORAGE_KEY = 'event-favorites';
const RSVP_KEY = 'event-rsvps';

const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadRSVPs = () => {
  try {
    const stored = localStorage.getItem(RSVP_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const saveRSVPs = (rsvps) => {
  try {
    localStorage.setItem(RSVP_KEY, JSON.stringify(rsvps));
  } catch (error) {
    console.error('Error saving RSVPs:', error);
  }
};

const useFavoritesStore = create((set, get) => ({
  favorites: loadFavorites(),
  rsvps: loadRSVPs(),
  
  addFavorite: (eventId) => {
    set((state) => {
      if (!state.favorites.includes(eventId)) {
        const updated = [...state.favorites, eventId];
        saveFavorites(updated);
        return { favorites: updated };
      }
      return state;
    });
  },
  
  removeFavorite: (eventId) => {
    set((state) => {
      const updated = state.favorites.filter((id) => id !== eventId);
      saveFavorites(updated);
      return { favorites: updated };
    });
  },
  
  toggleFavorite: (eventId) => {
    set((state) => {
      const updated = state.favorites.includes(eventId)
        ? state.favorites.filter((id) => id !== eventId)
        : [...state.favorites, eventId];
      saveFavorites(updated);
      return { favorites: updated };
    });
  },
  
  isFavorite: (eventId) => {
    const state = get();
    return state.favorites.includes(eventId);
  },

  addRSVP: (eventId) => {
    set((state) => {
      if (!state.rsvps.includes(eventId)) {
        const updated = [...state.rsvps, eventId];
        saveRSVPs(updated);
        return { rsvps: updated };
      }
      return state;
    });
  },

  removeRSVP: (eventId) => {
    set((state) => {
      const updated = state.rsvps.filter((id) => id !== eventId);
      saveRSVPs(updated);
      return { rsvps: updated };
    });
  },

  isRSVP: (eventId) => {
    const state = get();
    return state.rsvps.includes(eventId);
  },

  getRSVPEvents: (allEvents) => {
    const state = get();
    return allEvents.filter(event => state.rsvps.includes(event.id));
  },

  getFavoriteEvents: (allEvents) => {
    const state = get();
    return allEvents.filter(event => state.favorites.includes(event.id));
  },
  
  clearFavorites: () => {
    saveFavorites([]);
    set({ favorites: [] });
  },
}));

export default useFavoritesStore;
