import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Moon, Sun, Calendar, UserCheck, Heart } from 'lucide-react'
import { getEvents } from './lib/api'
import useFavoritesStore from './stores/favorites'
import useThemeStore from './stores/theme'
import EventList from './components/EventList'
import EventDetail from './components/EventDetail'
import CreateEventForm from './components/CreateEventForm'
import SearchFilters from './components/SearchFilters'
import LoadingSkeleton from './components/LoadingSkeleton'
import EmptyState from './components/EmptyState'

function App() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [eventType, setEventType] = useState('all') // all, upcoming, past, my-rsvps, favorites
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
  })
  const [userLocation, setUserLocation] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const { favorites, getRSVPEvents, getFavoriteEvents } = useFavoritesStore()
  const { theme, toggleTheme } = useThemeStore()

  // Apply dark mode to document (backup, store also handles it)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  // Fetch user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        () => console.log('Geolocation permission denied')
      )
    }
  }, [])

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { ...filters }
      
      if (eventType === 'upcoming' || eventType === 'past') {
        params.type = eventType
      }
      
      if (userLocation && eventType !== 'my-rsvps' && eventType !== 'favorites') {
        params.lat = userLocation.lat
        params.lon = userLocation.lon
      }
      
      const data = await getEvents(params)
      setEvents(data)
      setFilteredEvents(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType, userLocation])

  // Filter events based on search and event type
  useEffect(() => {
    let filtered = events

    // Handle My RSVPs separately
    if (eventType === 'my-rsvps') {
      filtered = getRSVPEvents(events)
    }
    
    // Handle Favorites separately
    if (eventType === 'favorites') {
      filtered = getFavoriteEvents(events)
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [filters.search, events, eventType, getRSVPEvents, getFavoriteEvents])

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleBackToList = () => {
    setSelectedEvent(null)
  }

  const handleEventCreated = () => {
    fetchEvents()
    setShowCreateForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                Event Discovery
              </h1>
            </motion.div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateForm(true)}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Create Event</span>
              </motion.button>
            </div>
          </div>

          {/* Event Type Tabs */}
          <div className="flex items-center justify-center sm:justify-start mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 relative z-50">
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
              {['all', 'upcoming', 'past', 'favorites', 'my-rsvps'].map((type) => {
                const getLabel = (t) => {
                  switch(t) {
                    case 'my-rsvps': return 'My RSVPs'
                    case 'favorites': return 'Favorites'
                    default: return t.charAt(0).toUpperCase() + t.slice(1)
                  }
                }
                
                const getIcon = (t) => {
                  if (t === 'my-rsvps') return <UserCheck className="w-4 h-4" />
                  if (t === 'favorites') return <Heart className="w-4 h-4" />
                  return null
                }
                
                return (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setEventType(type)
                      setSelectedEvent(null) // Navigate back to list view when changing tabs
                      setShowCreateForm(false) // Also close create form if open
                    }}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap relative z-50 pointer-events-auto ${
                      eventType === type
                        ? 'bg-indigo-600 text-white shadow-md dark:bg-indigo-500'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {getIcon(type)}
                    <span>{getLabel(type)}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Search & Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <SearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onApplyFilters={fetchEvents}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {showCreateForm ? (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CreateEventForm
                onSubmit={handleEventCreated}
                onCancel={() => setShowCreateForm(false)}
                loading={loading}
              />
            </motion.div>
          ) : selectedEvent ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EventDetail
                event={selectedEvent}
                onBack={handleBackToList}
                userLocation={userLocation}
              />
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSkeleton />
            </motion.div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EventList
                events={filteredEvents}
                onEventClick={handleEventClick}
                loading={loading}
                userLocation={userLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
