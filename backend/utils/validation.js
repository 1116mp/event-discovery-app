const { z } = require('zod');

// Event validation schema
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
  location: z.string().min(1, 'Location is required').max(200, 'Location name too long'),
  date: z.string().datetime('Invalid date format'),
  category: z.string().optional(),
  maxParticipants: z.number().int().positive().max(10000).default(100),
  currentParticipants: z.number().int().nonnegative().default(0),
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
});

// RSVP validation schema
const rsvpSchema = z.object({
  eventId: z.number().int().positive(),
  action: z.enum(['join', 'leave']),
});

/**
 * Validate event data
 * @param {Object} data - Event data to validate
 * @returns {Object} - { success: boolean, data?: Object, error?: string }
 */
function validateEvent(data) {
  try {
    const validData = eventSchema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0].message 
      };
    }
    return { success: false, error: 'Validation failed' };
  }
}

/**
 * Validate RSVP data
 * @param {Object} data - RSVP data to validate
 * @returns {Object} - { success: boolean, data?: Object, error?: string }
 */
function validateRSVP(data) {
  try {
    const validData = rsvpSchema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0].message 
      };
    }
    return { success: false, error: 'Validation failed' };
  }
}

module.exports = {
  validateEvent,
  validateRSVP,
  eventSchema,
  rsvpSchema,
};

