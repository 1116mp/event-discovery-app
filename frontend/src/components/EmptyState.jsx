import { motion } from 'framer-motion'
import { Calendar, Search, MapPin } from 'lucide-react'

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex justify-center mb-6"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center">
          <Calendar className="w-10 w-12 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
      </motion.div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
        No Events Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
        We couldn't find any events matching your criteria. Try adjusting your filters or create a new event!
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Adjust filters</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Create event</span>
        </div>
      </div>
    </motion.div>
  )
}

export default EmptyState
