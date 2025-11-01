// Seed events on first import
const { seedEvents } = require('../../backend/models/storage');
seedEvents();

const { getAllEvents } = require('../../backend/models/storage');
const { calculateDistance, isUpcomingEvent, isPastEvent } = require('../../backend/utils/helpers');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { 
        location, 
        lat, 
        lon, 
        category, 
        type,
        search,
        maxDistance,
      } = req.query;
      
      let filteredEvents = getAllEvents();

      // Filter by type (upcoming/past)
      if (type) {
        if (type === 'upcoming') {
          filteredEvents = filteredEvents.filter(event => isUpcomingEvent(event.date));
        } else if (type === 'past') {
          filteredEvents = filteredEvents.filter(event => isPastEvent(event.date));
        }
      }

      // Filter by location name
      if (location) {
        filteredEvents = filteredEvents.filter(event => 
          event.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      // Filter by category
      if (category) {
        filteredEvents = filteredEvents.filter(event => 
          event.category?.toLowerCase() === category.toLowerCase()
        );
      }

      // General search
      if (search) {
        const searchLower = search.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
        );
      }

      // Calculate distance if coordinates provided
      if (lat && lon) {
        filteredEvents = filteredEvents.map(event => {
          if (event.lat && event.lon) {
            const distance = calculateDistance(
              parseFloat(lat),
              parseFloat(lon),
              parseFloat(event.lat),
              parseFloat(event.lon)
            );
            return { ...event, distance };
          }
          return event;
        });
        
        if (maxDistance) {
          filteredEvents = filteredEvents.filter(event => 
            event.distance !== undefined && event.distance <= parseFloat(maxDistance)
          );
        }
        
        filteredEvents.sort((a, b) => {
          if (a.distance === undefined) return 1;
          if (b.distance === undefined) return -1;
          return a.distance - b.distance;
        });
      }

      return res.json(filteredEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { createEvent } = require('../../backend/models/storage');
      const { validateEvent } = require('../../backend/utils/validation');
      
      const validation = validateEvent(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error });
      }

      const event = createEvent(validation.data);
      return res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
