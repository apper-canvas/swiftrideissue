import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = 'Something went wrong', 
  onRetry, 
  showRetry = true,
  type = 'general' 
}) => {
  const getErrorConfig = (errorType) => {
    const configs = {
      network: {
        icon: 'WifiOff',
        title: 'Connection Problem',
        description: 'Please check your internet connection and try again.',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
      },
notFound: {
        icon: 'Search',
        title: 'Not Found',
        description: 'The information you're looking for could not be found.',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      },
      general: {
        icon: 'AlertCircle',
        title: 'Oops! Something went wrong',
        description: message,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
      },
    };
    return configs[errorType] || configs.general;
  };

  const config = getErrorConfig(type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center py-12"
    >
      <div className={`text-center p-8 rounded-2xl ${config.bgColor} ${config.borderColor} border-2 max-w-md mx-auto`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`w-16 h-16 mx-auto mb-4 rounded-full ${config.bgColor} flex items-center justify-center`}
        >
          <ApperIcon name={config.icon} size={32} className={config.color} />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {config.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-6"
        >
          {config.description}
        </motion.p>
        
        {showRetry && onRetry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onRetry}
              variant="primary"
              icon="RefreshCw"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Error;