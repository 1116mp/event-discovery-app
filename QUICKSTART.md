# Quick Start Guide

## 🚀 Getting Up and Running

### Prerequisites
- Node.js (v16+) installed
- npm or yarn

### Setup Steps

1. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

3. **Start the Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   Backend runs on: `http://localhost:3001`

4. **Start the Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

5. **Open Your Browser:**
   Navigate to `http://localhost:5173`

## 🎯 Testing the App

### Sample Events Already Created:
- Summer Music Festival (Central Park, New York)
- Tech Meetup (Brooklyn, New York)
- Yoga in the Park (Prospect Park, Brooklyn)

### Try These Actions:
1. ✅ View the event list
2. ✅ Click on any event to see details
3. ✅ Search events by location (e.g., "Brooklyn")
4. ✅ Create a new event using the "+ Create Event" button
5. ✅ Allow location access to see distance calculations
6. ✅ Test the search functionality

## 🔧 API Testing with cURL

**Get all events:**
```bash
curl http://localhost:3001/api/events
```

**Create a new event:**
```bash
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Event",
    "description": "Event description",
    "location": "City, State",
    "date": "2024-12-31T18:00:00",
    "maxParticipants": 100,
    "currentParticipants": 0
  }'
```

**Get event details:**
```bash
curl http://localhost:3001/api/events/1
```

## 📱 Features to Explore

- **Event List**: Browse all available events
- **Event Details**: Click any event to see full information
- **Search**: Filter events by location name
- **Create Events**: Add your own events
- **Distance**: See how far events are from your location
- **Responsive Design**: Works on mobile and desktop

## 🐛 Troubleshooting

**Backend won't start:**
- Make sure port 3001 is not in use
- Check that you've run `npm install` in the backend directory

**Frontend won't start:**
- Make sure port 5173 is not in use
- Check that you've run `npm install` in the frontend directory
- Try `npm run dev -- --port 3000` to use a different port

**Cannot connect to backend:**
- Ensure backend is running on port 3001
- Check browser console for CORS errors

**Events not showing:**
- Check browser console for errors
- Verify backend is running and accessible

## 📝 Next Steps

- Customize the styling in `src/components/*.css`
- Add more fields to events in `server.js`
- Implement user authentication
- Add a database (MongoDB, PostgreSQL, etc.)
- Deploy to production

## 🎨 Tech Stack Summary

- **Backend**: Node.js + Express
- **Frontend**: React 19 + Vite
- **Storage**: In-memory (no database needed)
- **Styling**: Pure CSS with modern design

Enjoy exploring the Event Discovery App! 🎉

