import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isCurrentUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-xs px-4 py-3 rounded-2xl
          ${isCurrentUser
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
            : 'bg-gray-100 text-gray-900'
          }
        `}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-100' : 'text-gray-500'}`}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;