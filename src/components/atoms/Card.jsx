import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  gradient = false,
  ...props 
}) => {
  const baseClasses = gradient 
    ? 'bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-panel backdrop-blur-lg border border-gray-100'
    : 'card-float';
  
  const Component = onClick ? motion.div : 'div';
  
  const motionProps = onClick ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    className: `${baseClasses} ${className} cursor-pointer`,
    onClick,
  } : {
    className: `${baseClasses} ${className}`,
  };

  return (
    <Component {...motionProps} {...props}>
      {children}
    </Component>
  );
};

export default Card;