/**
 * Format date to a readable string
 * @param {string} dateString - ISO date string
 * @param {Object} options - Format options
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };
  return date.toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format relative time (e.g., "in 2 days")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((date - now) / 1000);

  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `in ${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `in ${Math.floor(diffInSeconds / 3600)}h`;
  const days = Math.floor(diffInSeconds / 86400);
  if (days < 7) return `in ${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `in ${weeks}w`;
  const months = Math.floor(days / 30);
  return `in ${months}mo`;
};

/**
 * Get category color
 * @param {string} category - Event category
 * @returns {string} Hex color code
 */
export const getCategoryColor = (category) => {
  const colors = {
    music: '#667eea',
    tech: '#10b981',
    sports: '#f59e0b',
    food: '#ef4444',
    education: '#3b82f6',
    networking: '#8b5cf6',
    art: '#ec4899',
    other: '#6b7280',
  };
  return colors[category?.toLowerCase()] || colors.other;
};

/**
 * Get category icon name
 * @param {string} category - Event category
 * @returns {string} Icon name
 */
export const getCategoryIcon = (category) => {
  const icons = {
    music: 'music',
    tech: 'cpu',
    sports: 'activity',
    food: 'utensils',
    education: 'graduation-cap',
    networking: 'users',
    art: 'palette',
    other: 'calendar',
  };
  return icons[category?.toLowerCase()] || icons.other;
};

/**
 * Truncate text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if event is past
 * @param {string} dateString - ISO date string
 * @returns {boolean}
 */
export const isPastEvent = (dateString) => {
  return new Date(dateString) < new Date();
};

/**
 * Check if event is upcoming
 * @param {string} dateString - ISO date string
 * @returns {boolean}
 */
export const isUpcomingEvent = (dateString) => {
  return new Date(dateString) >= new Date();
};

