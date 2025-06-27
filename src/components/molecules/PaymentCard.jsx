import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PaymentCard = ({ paymentMethod, isDefault, onSetDefault, onDelete }) => {
  const getCardIcon = (type) => {
    const icons = {
      visa: 'CreditCard',
      mastercard: 'CreditCard',
      amex: 'CreditCard',
      discover: 'CreditCard',
    };
    return icons[type.toLowerCase()] || 'CreditCard';
  };

  const getCardColor = (type) => {
    const colors = {
      visa: 'from-blue-500 to-blue-600',
      mastercard: 'from-red-500 to-red-600',
      amex: 'from-green-500 to-green-600',
      discover: 'from-orange-500 to-orange-600',
    };
    return colors[type.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="card-float p-6 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-8 rounded-lg bg-gradient-to-r ${getCardColor(paymentMethod.cardType)} flex items-center justify-center`}>
            <ApperIcon 
              name={getCardIcon(paymentMethod.cardType)} 
              size={20} 
              className="text-white" 
            />
          </div>
          <div>
            <p className="font-bold text-gray-900">
              •••• •••• •••• {paymentMethod.cardLast4}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {paymentMethod.cardType}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isDefault && (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              Default
            </span>
          )}
          
          <div className="flex space-x-1">
            {!isDefault && (
              <button
                onClick={() => onSetDefault(paymentMethod.Id)}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                title="Set as default"
              >
                <ApperIcon name="Check" size={18} />
              </button>
            )}
            <button
              onClick={() => onDelete(paymentMethod.Id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete card"
            >
              <ApperIcon name="Trash2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentCard;