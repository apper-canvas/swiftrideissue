import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const RideTypeSelector = ({ selectedType, onTypeSelect }) => {
  const rideTypes = [
    {
      id: 'standard',
      name: 'SwiftRide',
      description: 'Affordable rides',
      icon: 'Car',
      price: 12.50,
      eta: '3-5 min',
      color: 'text-gray-700',
      gradient: 'from-gray-50 to-gray-100',
      border: 'border-gray-200',
    },
    {
      id: 'premium',
      name: 'SwiftRide Premium',
      description: 'High-end vehicles',
      icon: 'Star',
      price: 22.50,
      eta: '2-4 min',
      color: 'text-primary-700',
      gradient: 'from-primary-50 to-purple-100',
      border: 'border-primary-200',
    },
    {
      id: 'carpool',
      name: 'SwiftPool',
      description: 'Share & save',
      icon: 'Users',
      price: 8.50,
      eta: '5-8 min',
      color: 'text-emerald-700',
      gradient: 'from-emerald-50 to-green-100',
      border: 'border-emerald-200',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Choose your ride</h3>
      {rideTypes.map((type) => (
        <motion.div
          key={type.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTypeSelect(type.id)}
          className={`
            p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
            ${selectedType === type.id 
              ? `${type.border} bg-gradient-to-r ${type.gradient} shadow-lg` 
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${selectedType === type.id 
                  ? `bg-gradient-to-r ${type.gradient} ${type.color}` 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                <ApperIcon name={type.icon} size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{type.name}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
                <p className="text-xs text-gray-500 mt-1">{type.eta} away</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">${type.price}</p>
              {selectedType === type.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1"
                >
                  <ApperIcon name="CheckCircle" size={20} className="text-emerald-500" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RideTypeSelector;