import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all events with optional filters
 * @param {Object} filters - Query parameters
 * @returns {Promise<Array>} List of events
 */
export const getEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const response = await api.get(`/events?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

/**
 * Fetch a single event by ID
 * @param {number} eventId - Event ID
 * @returns {Promise<Object>} Event object
 */
export const getEvent = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

/**
 * Create a new event
 * @param {Object} eventData - Event data
 * @returns {Promise<Object>} Created event
 */
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * RSVP to an event (join or leave)
 * @param {number} eventId - Event ID
 * @param {string} action - 'join' or 'leave'
 * @returns {Promise<Object>} Updated event
 */
export const rsvpEvent = async (eventId, action) => {
  try {
    const response = await api.post(`/events/${eventId}/rsvp`, { action });
    return response.data;
  } catch (error) {
    console.error('Error updating RSVP:', error);
    throw error;
  }
};

/**
 * Get weather data for a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getWeather = async (lat, lon) => {
  try {
    // Using a free weather API (can be replaced with OpenWeatherMap)
    const API_KEY = 'demo'; // Replace with actual API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return mock data on error
    return {
      temperature: 22,
      condition: 'Sunny',
      description: 'Clear sky',
      icon: '01d',
    };
  }
};

export default {
  getEvents,
  getEvent,
  createEvent,
  rsvpEvent,
  getWeather,
};

