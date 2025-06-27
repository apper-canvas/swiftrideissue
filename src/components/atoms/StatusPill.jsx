import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const StatusPill = ({ status, icon, size = 'md' }) => {
  const statusConfig = {
    searching: {
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: 'Search',
    },
    assigned: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: 'UserCheck',
    },
    arriving: {
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: 'Navigation',
    },
    'in-progress': {
      color: 'bg-primary-100 text-primary-800 border-primary-200',
      icon: 'Car',
    },
    completed: {
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: 'CheckCircle',
    },
    cancelled: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: 'XCircle',
    },
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  const config = statusConfig[status] || statusConfig.searching;

  return (
    <span className={`status-pill ${config.color} ${sizes[size]} border inline-flex items-center`}>
      <ApperIcon 
        name={icon || config.icon} 
        size={iconSizes[size]} 
        className="mr-2" 
      />
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  );
};

export default StatusPill;