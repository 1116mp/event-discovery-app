import { motion } from 'framer-motion'

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
          
          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
            </div>
            
            {/* Mini map skeleton */}
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            
            {/* Meta info */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
            </div>
            
            {/* Participants */}
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
