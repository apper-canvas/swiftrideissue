import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import StatusPill from '@/components/atoms/StatusPill';

const RideCard = ({ ride, onRebook, onViewDetails, expanded = false }) => {
  const getRideTypeIcon = (type) => {
    const icons = {
      standard: 'Car',
      premium: 'Star',
      carpool: 'Users',
    };
    return icons[type] || 'Car';
  };

  const getRideTypeColor = (type) => {
    const colors = {
      standard: 'text-gray-600',
      premium: 'text-primary-600',
      carpool: 'text-emerald-600',
    };
    return colors[type] || 'text-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="card-float p-6 mb-4"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${getRideTypeColor(ride.type)}`}>
              <ApperIcon name={getRideTypeIcon(ride.type)} size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">
                {format(new Date(ride.timestamp), 'MMM d, yyyy')}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(ride.timestamp), 'h:mm a')}
              </p>
            </div>
            <StatusPill status={ride.status} size="sm" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text">${ride.fare}</p>
          <p className="text-sm text-gray-500">{ride.distance} miles</p>
        </div>
      </div>

      {/* Route Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{ride.pickupLocation.address}</p>
            <p className="text-sm text-gray-500">Pickup location</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{ride.destination.address}</p>
            <p className="text-sm text-gray-500">Destination</p>
          </div>
        </div>
      </div>

      {/* Rating */}
      {ride.rating && (
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600">Your rating:</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                size={16}
                className={`${
                  i < ride.rating
                    ? 'text-amber-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={() => onRebook(ride)}
          className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          <ApperIcon name="RotateCcw" size={20} className="mr-2" />
          Book Again
        </button>
        <button
          onClick={() => onViewDetails(ride)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          <ApperIcon name="Eye" size={20} className="mr-2" />
          Details
        </button>
      </div>
    </motion.div>
  );
};

export default RideCard;