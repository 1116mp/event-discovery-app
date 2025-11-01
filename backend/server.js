const express = require('express');
const cors = require('cors');
const eventsRoutes = require('./routes/events');
const { seedEvents } = require('./models/storage');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Seed initial events
seedEvents();

// API Routes
app.use('/api/events', eventsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
