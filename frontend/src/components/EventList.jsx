import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Heart } from 'lucide-react'
import { formatRelativeTime, getCategoryColor, truncateText } from '../lib/utils'
import useFavoritesStore from '../stores/favorites'

function EventList({ events, onEventClick, userLocation }) {
  const { favorites, toggleFavorite, isFavorite } = useFavoritesStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {events.map((event, index) => {
        const favorite = isFavorite(event.id)
        const categoryColor = getCategoryColor(event.category)

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer group border-2 border-transparent hover:border-indigo-500 transition-all"
            onClick={() => onEventClick(event)}
          >
            {/* Event Header with Category Badge */}
            <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold z-10"
                style={{ backgroundColor: categoryColor }}
              >
                {event.category || 'Event'}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(event.id)
                }}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </motion.button>
              {event.distance !== undefined && (
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600">
                  📍 {event.distance.toFixed(1)} km away
                </div>
              )}
            </div>

            {/* Event Content */}
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                {event.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {truncateText(event.description, 100)}
              </p>

              {/* Event Meta */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{formatRelativeTime(event.date)}</span>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-xs sm:text-sm">
                    {event.currentParticipants || 0}/{event.maxParticipants}
                  </span>
                </div>
                <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all"
                    style={{
                      width: `${((event.currentParticipants || 0) / event.maxParticipants) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default EventList
