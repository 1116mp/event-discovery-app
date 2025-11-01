import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'music', label: 'Music' },
  { value: 'tech', label: 'Tech' },
  { value: 'sports', label: 'Sports' },
  { value: 'food', label: 'Food' },
  { value: 'education', label: 'Education' },
  { value: 'networking', label: 'Networking' },
  { value: 'art', label: 'Art' },
]

function SearchFilters({ filters, onFiltersChange, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (key, value) => {
    const updated = { ...localFilters, [key]: value }
    setLocalFilters(updated)
    onFiltersChange(updated)
  }

  const handleReset = () => {
    const reset = { search: '', category: '', location: '' }
    setLocalFilters(reset)
    onFiltersChange(reset)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 space-y-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={localFilters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Category and Location Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={localFilters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={localFilters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
          <span className="text-sm">Clear Filters</span>
        </button>
      </div>
    </motion.div>
  )
}

export default SearchFilters
