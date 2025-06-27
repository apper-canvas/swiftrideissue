import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = 'No data found',
  description = 'There\'s nothing here yet.',
  icon = 'Inbox',
  actionLabel,
  onAction,
  type = 'default'
}) => {
  const getEmptyConfig = (emptyType) => {
    const configs = {
      rides: {
        icon: 'Car',
        title: 'No rides yet',
        description: 'Your ride history will appear here once you take your first trip.',
        actionLabel: 'Book Your First Ride',
        gradient: 'from-primary-400 to-primary-600',
        bgGradient: 'from-primary-50 to-purple-50',
      },
      payments: {
        icon: 'CreditCard',
        title: 'No payment methods',
        description: 'Add a payment method to start booking rides quickly and securely.',
        actionLabel: 'Add Payment Method',
        gradient: 'from-emerald-400 to-emerald-600',
        bgGradient: 'from-emerald-50 to-green-50',
      },
      messages: {
        icon: 'MessageCircle',
        title: 'No messages',
        description: 'Start a conversation with your driver when you have an active ride.',
        gradient: 'from-blue-400 to-blue-600',
        bgGradient: 'from-blue-50 to-indigo-50',
      },
      default: {
        icon: icon,
        title: title,
        description: description,
        actionLabel: actionLabel,
        gradient: 'from-gray-400 to-gray-600',
        bgGradient: 'from-gray-50 to-slate-50',
      },
    };
    return configs[emptyType] || configs.default;
  };

  const config = getEmptyConfig(type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center py-16"
    >
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${config.bgGradient} flex items-center justify-center`}
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-lg`}>
            <ApperIcon name={config.icon} size={32} className="text-white" />
          </div>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-900 mb-3"
        >
          {config.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {config.description}
        </motion.p>
        
        {(config.actionLabel || actionLabel) && onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className="shadow-lg hover:shadow-xl"
            >
              {config.actionLabel || actionLabel}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;