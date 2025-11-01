/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

/**
 * Check if an event date is in the past
 * @param {string} date - ISO date string
 * @returns {boolean}
 */
function isPastEvent(date) {
  return new Date(date) < new Date();
}

/**
 * Check if an event date is upcoming
 * @param {string} date - ISO date string
 * @returns {boolean}
 */
function isUpcomingEvent(date) {
  return new Date(date) >= new Date();
}

/**
 * Get event category color
 * @param {string} category - Event category
 * @returns {string} Hex color code
 */
function getCategoryColor(category) {
  const colors = {
    'music': '#667eea',
    'tech': '#10b981',
    'sports': '#f59e0b',
    'food': '#ef4444',
    'education': '#3b82f6',
    'networking': '#8b5cf6',
    'art': '#ec4899',
    'other': '#6b7280',
  };
  return colors[category?.toLowerCase()] || colors.other;
}

module.exports = {
  calculateDistance,
  isPastEvent,
  isUpcomingEvent,
  getCategoryColor,
};

