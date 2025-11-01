/**
 * In-memory storage for events
 * In production, this would be replaced with a database
 */

let events = [];
let nextId = 1;

/**
 * Get all events
 * @returns {Array} List of events
 */
function getAllEvents() {
  return [...events];
}

/**
 * Get event by ID
 * @param {number} id - Event ID
 * @returns {Object|null} Event or null if not found
 */
function getEventById(id) {
  return events.find(e => e.id === id) || null;
}

/**
 * Create a new event
 * @param {Object} eventData - Event data
 * @returns {Object} Created event
 */
function createEvent(eventData) {
  const event = {
    id: nextId++,
    ...eventData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

/**
 * Update event participant count
 * @param {number} id - Event ID
 * @param {string} action - 'join' or 'leave'
 * @returns {Object|null} Updated event or null if not found
 */
function updateEventParticipants(id, action) {
  const event = getEventById(id);
  if (!event) return null;
  
  if (action === 'join') {
    if (event.currentParticipants < event.maxParticipants) {
      event.currentParticipants++;
    } else {
      throw new Error('Event is full');
    }
  } else if (action === 'leave') {
    if (event.currentParticipants > 0) {
      event.currentParticipants--;
    }
  }
  
  event.updatedAt = new Date().toISOString();
  return event;
}

/**
 * Seed initial events (for demo purposes)
 */
function seedEvents() {
  if (events.length === 0) {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const next2Months = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);

    events = [
      {
        id: nextId++,
        title: 'Summer Music Festival',
        description: 'Join us for an amazing outdoor music festival featuring top artists from around the world!',
        location: 'Central Park, New York',
        date: nextMonth.toISOString(),
        category: 'music',
        maxParticipants: 500,
        currentParticipants: 120,
        lat: 40.7851,
        lon: -73.9683,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: nextId++,
        title: 'Tech Meetup',
        description: 'Network with fellow developers and learn about the latest tech trends.',
        location: 'Brooklyn, New York',
        date: next2Months.toISOString(),
        category: 'tech',
        maxParticipants: 50,
        currentParticipants: 15,
        lat: 40.6782,
        lon: -73.9442,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: nextId++,
        title: 'Yoga in the Park',
        description: 'Start your weekend with a relaxing yoga session in the park.',
        location: 'Prospect Park, Brooklyn',
        date: nextWeek.toISOString(),
        category: 'sports',
        maxParticipants: 30,
        currentParticipants: 8,
        lat: 40.6602,
        lon: -73.9690,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: nextId++,
        title: 'Food & Wine Festival',
        description: 'Taste amazing cuisine from local chefs and enjoy wine pairings.',
        location: 'Chelsea Market, Manhattan',
        date: nextMonth.toISOString(),
        category: 'food',
        maxParticipants: 100,
        currentParticipants: 42,
        lat: 40.7424,
        lon: -74.0065,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: nextId++,
        title: 'Coding Bootcamp Workshop',
        description: 'Learn modern web development in this intensive hands-on workshop.',
        location: 'Silicon Alley, Manhattan',
        date: nextWeek.toISOString(),
        category: 'education',
        maxParticipants: 25,
        currentParticipants: 12,
        lat: 40.7328,
        lon: -74.0021,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventParticipants,
  seedEvents,
};

