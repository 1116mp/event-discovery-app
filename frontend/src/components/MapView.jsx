import { motion } from 'framer-motion'
import { MapPin, Users, Calendar, Navigation } from 'lucide-react'
import { formatRelativeTime } from '../lib/utils'

/**
 * MapView component displays events in a grid layout with map-like visualization
 * Uses a simple grid instead of interactive map for better compatibility
 */
function MapView({ events, onEventClick, userLocation }) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <p className="text-gray-500">No events to display</p>
      </div>
    )
  }

  const eventsWithLocation = events.filter(e => e.lat && e.lon)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Map-like Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Event Map</h2>
            {userLocation && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Navigation className="w-5 h-5" />
                <span className="text-sm">Your Location Active</span>
              </div>
            )}
          </div>
          <p className="text-blue-100">
            {eventsWithLocation.length} events with location data
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => {
          if (!event.lat || !event.lon) return null
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group border-2 border-transparent hover:border-indigo-500 transition-all"
              onClick={() => onEventClick(event)}
            >
              {/* Map Pin Indicator */}
              <div className="relative h-32 bg-gradient-to-br from-green-400 to-blue-500">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="w-12 h-12 text-white drop-shadow-lg animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full animate-ping opacity-30" />
                  </div>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{formatRelativeTime(event.date)}</span>
                  </div>
                  {event.distance && (
                    <div className="flex items-center space-x-2 text-indigo-600 font-semibold">
                      <Navigation className="w-4 h-4 flex-shrink-0" />
                      <span>{event.distance.toFixed(1)} km</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{event.currentParticipants}/{event.maxParticipants}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {eventsWithLocation.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Location Data</h3>
          <p className="text-gray-600">
            Events without location data are not shown on the map view
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default MapView
