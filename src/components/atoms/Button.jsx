import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 bg-white',
    ghost: 'text-primary-600 hover:bg-primary-50',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="animate-spin mr-2" size={iconSizes[size]} />
      ) : (
        icon && iconPosition === 'left' && (
          <ApperIcon name={icon} className="mr-2" size={iconSizes[size]} />
        )
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className="ml-2" size={iconSizes[size]} />
      )}
    </motion.button>
  );
};

export default Button;