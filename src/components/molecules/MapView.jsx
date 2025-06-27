import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const MapView = ({ 
  pickupLocation, 
  destination, 
  driverLocation, 
  route,
  className = '' 
}) => {
  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden ${className}`}>
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-300" />
            ))}
          </div>
        </div>

        {/* Roads Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300" />
          <div className="absolute top-2/4 left-0 right-0 h-2 bg-gray-400" />
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-300" />
          <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-300" />
          <div className="absolute top-0 bottom-0 left-2/4 w-2 bg-gray-400" />
          <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-300" />
        </div>
      </div>

      {/* Pickup Location */}
      {pickupLocation && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <ApperIcon name="MapPin" size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap">
              Pickup
            </div>
          </div>
        </motion.div>
      )}

      {/* Destination */}
      {destination && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-3/4 right-1/3 transform translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <ApperIcon name="Flag" size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap">
              Destination
            </div>
          </div>
        </motion.div>
      )}

      {/* Driver Location */}
      {driverLocation && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="relative"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <ApperIcon name="Car" size={24} className="text-white" />
            </div>
            <div className="absolute -inset-2 bg-primary-400 rounded-full opacity-30 animate-pulse" />
          </motion.div>
        </motion.div>
      )}

      {/* Route Line */}
      {route && pickupLocation && destination && (
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0"
        >
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 33% 25% Q 50% 40% 66% 75%"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        </motion.div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ApperIcon name="Plus" size={20} className="text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ApperIcon name="Minus" size={20} className="text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ApperIcon name="Locate" size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default MapView;