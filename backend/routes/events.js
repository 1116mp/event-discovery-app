const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, updateEventParticipants } = require('../models/storage');
const { validateEvent, validateRSVP } = require('../utils/validation');
const { calculateDistance, isUpcomingEvent, isPastEvent } = require('../utils/helpers');

/**
 * GET /api/events
 * List all events with optional filters
 */
router.get('/', (req, res) => {
  try {
    const { 
      location, 
      lat, 
      lon, 
      category, 
      type, // 'upcoming' or 'past'
      search, // general search term
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

    // General search (title, description, location)
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
      
      // Filter by max distance
      if (maxDistance) {
        filteredEvents = filteredEvents.filter(event => 
          event.distance !== undefined && event.distance <= parseFloat(maxDistance)
        );
      }
      
      // Sort by distance
      filteredEvents.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
    }

    res.json(filteredEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/events/:id
 * Get event details by ID
 */
router.get('/:id', (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const event = getEventById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/events
 * Create a new event
 */
router.post('/', (req, res) => {
  try {
    const validation = validateEvent(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const event = createEvent(validation.data);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/events/:id/rsvp
 * Join or leave an event
 */
router.post('/:id/rsvp', (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const validation = validateRSVP({
      eventId,
      ...req.body
    });
    
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const updatedEvent = updateEventParticipants(eventId, validation.data.action);
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    if (error.message === 'Event is full') {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error updating RSVP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

