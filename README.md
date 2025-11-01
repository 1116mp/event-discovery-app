# Event Discovery App 🎉

A production-ready, full-stack event discovery application with modern design, smooth animations, and advanced features.

![Event Discovery](https://img.shields.io/badge/status-production--ready-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-blue)

## ✨ Features

### 🎯 Core Features
- **Event Discovery**: Browse events in beautiful list or map view
- **Advanced Search**: Filter by category, location, date, distance
- **Event Details**: Rich detail pages with weather, RSVP, and participant tracking
- **Create Events**: Easy event creation with validation
- **Location Services**: Auto-detect location for distance calculations

### ⭐ Enhanced Features
- **Interactive Map**: Visual map view with event pins and distance indicators
- **RSVP System**: Join/leave events with real-time participant tracking
- **Favorites**: Save events with localStorage persistence
- **Time Filters**: View upcoming, past, or all events
- **Weather Integration**: Get weather forecasts (ready for OpenWeatherMap)
- **Beautiful UI**: Modern minimalist design with Framer Motion animations
- **Loading States**: Smooth skeletons and loading indicators
- **Error Handling**: Comprehensive error states and messages
- **Responsive**: Mobile-first design works on all devices

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express** - Fast API server
- **Zod** - Runtime validation
- **Modular Architecture** - Clean, maintainable code structure

### Frontend
- **React 19** - Latest React features
- **Vite** - Lightning-fast development
- **TailwindCSS v4** - Modern utility-first CSS
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

## 📁 Project Structure

```
event-discovery-app/
├── backend/
│   ├── routes/
│   │   └── events.js          # Event API routes
│   ├── models/
│   │   └── storage.js         # Data layer
│   ├── utils/
│   │   ├── validation.js      # Zod schemas
│   │   └── helpers.js         # Utility functions
│   └── server.js              # Main server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventList.jsx      # Grid view
│   │   │   ├── EventDetail.jsx    # Detail view
│   │   │   ├── CreateEventForm.jsx # Create form
│   │   │   ├── MapView.jsx        # Map visualization
│   │   │   ├── SearchFilters.jsx  # Filter panel
│   │   │   ├── LoadingSkeleton.jsx # Loading states
│   │   │   └── EmptyState.jsx     # Empty states
│   │   ├── stores/
│   │   │   └── favorites.js       # Zustand store
│   │   ├── lib/
│   │   │   ├── api.js            # API client
│   │   │   └── utils.js          # Utilities
│   │   ├── App.jsx               # Main app
│   │   └── index.css             # TailwindCSS
│   └── package.json
│
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd event-discovery-app
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```
✅ Backend running on `http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

4. **Open Browser**
Navigate to `http://localhost:5173`

## 📚 API Endpoints

### `GET /api/events`
List all events with optional filters

**Query Parameters:**
- `type` - Filter by event type: `upcoming`, `past`, or `all`
- `search` - General search in title, description, location
- `category` - Filter by category
- `location` - Filter by location name
- `lat` - User latitude for distance calculation
- `lon` - User longitude for distance calculation
- `maxDistance` - Maximum distance in km

**Example:**
```bash
curl "http://localhost:3001/api/events?type=upcoming&category=music&lat=40.7128&lon=-74.0060"
```

### `GET /api/events/:id`
Get event details by ID

**Example:**
```bash
curl http://localhost:3001/api/events/1
```

### `POST /api/events`
Create a new event

**Request Body:**
```json
{
  "title": "Event Title",
  "description": "Event description",
  "location": "Location name",
  "date": "2024-12-31T18:00:00",
  "category": "music",
  "maxParticipants": 100,
  "lat": 40.7128,
  "lon": -74.0060
}
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"My Event","description":"Description","location":"NYC","date":"2024-12-31T18:00:00","category":"music","maxParticipants":100}'
```

### `POST /api/events/:id/rsvp`
RSVP to an event (join or leave)

**Request Body:**
```json
{
  "action": "join" // or "leave"
}
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/events/1/rsvp \
  -H "Content-Type: application/json" \
  -d '{"action":"join"}'
```

## 🎨 Design Features

- **Modern Minimalism**: Clean, elegant UI with soft shadows and rounded corners
- **Smooth Animations**: Framer Motion for delightful transitions
- **Responsive Design**: Mobile-first approach works on all screen sizes
- **Visual Hierarchy**: Clear typography and spacing
- **Color System**: Consistent category-based color coding
- **Interactive Elements**: Hover states, loading indicators, progress bars
- **Glassmorphism**: Modern backdrop blur effects

## 🔒 Validation

All API requests are validated using Zod:
- Event creation requires title, description, location, date
- Category, participant limits, and coordinates validated
- Type safety throughout the application

## 🌟 Demo Features

The app comes pre-loaded with sample events:
- Summer Music Festival (Central Park, NYC)
- Tech Meetup (Brooklyn, NYC)
- Yoga in the Park (Prospect Park, Brooklyn)
- Food & Wine Festival (Chelsea Market, Manhattan)
- Coding Bootcamp Workshop (Silicon Alley, Manhattan)

## 🚀 Production Deployment

### Backend Deployment
Deploy to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

Remember to add a real database (MongoDB, PostgreSQL) in production!

### Frontend Deployment
Build and deploy:
```bash
cd frontend
npm run build
```

Deploy `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📝 Future Enhancements

- [ ] Add MongoDB/PostgreSQL database
- [ ] User authentication and profiles
- [ ] Image uploads for events
- [ ] Real-time notifications
- [ ] Social sharing
- [ ] Event reviews and ratings
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Admin dashboard

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Built with love using React, Express, and TailwindCSS
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for discovering amazing events**
