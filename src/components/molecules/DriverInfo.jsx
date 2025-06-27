import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const DriverInfo = ({ driver, eta, onMessage, onCall }) => {
  if (!driver) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-float p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <ApperIcon name="Check" size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{driver.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <ApperIcon name="Star" size={16} className="text-amber-400 fill-current" />
                <span className="text-sm font-semibold text-gray-700 ml-1">
                  {driver.rating}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{driver.vehicle.make} {driver.vehicle.model}</span>
            </div>
            <p className="text-sm text-gray-500">{driver.vehicle.licensePlate}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text">{eta}</p>
          <p className="text-sm text-gray-500">minutes away</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onMessage}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          <ApperIcon name="MessageCircle" size={20} className="mr-2" />
          Message
        </button>
        <button
          onClick={onCall}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          <ApperIcon name="Phone" size={20} className="mr-2" />
          Call
        </button>
      </div>
    </motion.div>
  );
};

export default DriverInfo;