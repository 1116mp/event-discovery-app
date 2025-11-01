const { getEventById, updateEventParticipants } = require('../../../backend/models/storage');
const { validateRSVP } = require('../../../backend/utils/validation');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Get ID from query or from URL path
      const urlParts = req.url.split('/');
      const eventIdIndex = urlParts.indexOf('rsvp') - 1;
      const eventId = parseInt(req.query.id || (eventIdIndex >= 0 ? urlParts[eventIdIndex] : null));
      
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

      return res.json(updatedEvent);
    } catch (error) {
      if (error.message === 'Event is full') {
        return res.status(400).json({ error: error.message });
      }
      console.error('Error updating RSVP:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
