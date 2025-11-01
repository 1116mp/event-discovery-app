import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Users, Heart, Clock, Cloud, CheckCircle } from 'lucide-react'
import { formatDate, getCategoryColor } from '../lib/utils'
import { rsvpEvent, getWeather } from '../lib/api'
import useFavoritesStore from '../stores/favorites'
import EventCardMap from './EventCardMap'

function EventDetail({ event, onBack, userLocation }) {
  const { toggleFavorite, isFavorite, addRSVP, removeRSVP, isRSVP } = useFavoritesStore()
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [eventData, setEventData] = useState(event)
  const [showRSVPConfirmation, setShowRSVPConfirmation] = useState(false)
  const favorite = isFavorite(event.id)
  const rsvped = isRSVP(event.id)
  const categoryColor = getCategoryColor(event.category || 'other')

  useEffect(() => {
    setEventData(event)
  }, [event])

  useEffect(() => {
    if (eventData.lat && eventData.lon) {
      getWeather(eventData.lat, eventData.lon).then(setWeather)
    }
  }, [eventData])

  const handleRSVP = async () => {
    setLoading(true)
    setError(null)
    try {
      const action = rsvped ? 'leave' : 'join'
      const updated = await rsvpEvent(event.id, action)
      setEventData(updated)
      
      if (action === 'join') {
        addRSVP(event.id)
        setShowRSVPConfirmation(true)
        setTimeout(() => setShowRSVPConfirmation(false), 3000)
      } else {
        removeRSVP(event.id)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update RSVP')
    } finally {
      setLoading(false)
    }
  }

  const participantPercentage = ((eventData.currentParticipants || 0) / eventData.maxParticipants) * 100
  const isFull = eventData.currentParticipants >= eventData.maxParticipants

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* RSVP Confirmation Toast */}
      {showRSVPConfirmation && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">You have RSVP'd!</span>
        </motion.div>
      )}

      {/* Header Image */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center space-x-2 sm:space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
          </motion.button>
          <div
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold"
            style={{ backgroundColor: categoryColor }}
          >
            {eventData.category || 'Event'}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFavorite(event.id)}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
              favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{eventData.title}</h1>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Location</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">{eventData.location}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Date</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{formatDate(eventData.date, { month: 'short', day: 'numeric' })}</div>
            </div>
          </div>

          {weather && (
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0" />
              <div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Weather</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{weather.temperature}°C</div>
              </div>
            </div>
          )}
        </div>

        {/* Mini Map */}
        <div className="mb-8">
          <EventCardMap event={eventData} />
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">About this event</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{eventData.description}</p>
        </div>

        {/* Participants Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {eventData.currentParticipants || 0} / {eventData.maxParticipants} participants
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {eventData.maxParticipants - (eventData.currentParticipants || 0)} spots remaining
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${participantPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            />
          </div>

          {/* RSVP Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRSVP}
            disabled={loading}
            className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white shadow-lg transition-colors text-sm sm:text-base ${
              isFull && !rsvped
                ? 'bg-gray-400 cursor-not-allowed'
                : rsvped
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            {loading ? 'Updating...' : isFull && !rsvped ? 'Event Full' : rsvped ? '✓ RSVP\'d - Leave Event' : 'Join Event'}
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{formatDate(eventData.date)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventDetail
