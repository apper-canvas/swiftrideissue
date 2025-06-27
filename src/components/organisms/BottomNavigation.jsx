import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/book', icon: 'Navigation', label: 'Book' },
    { path: '/active', icon: 'Car', label: 'Active' },
    { path: '/history', icon: 'Clock', label: 'History' },
    { path: '/payment', icon: 'CreditCard', label: 'Payment' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 backdrop-blur-lg bg-opacity-95 z-50 lg:relative lg:bg-transparent lg:border-t-0 lg:backdrop-blur-none">
      <div className="container mx-auto px-4 max-w-7xl lg:hidden">
        <nav className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center py-2 px-4 min-w-[60px]"
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' 
                        : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                      }
                    `}
                  >
                    <ApperIcon name={item.icon} size={24} />
                  </motion.div>
                  <span className={`
                    text-xs font-medium mt-1 transition-colors duration-300
                    ${isActive ? 'text-primary-600' : 'text-gray-500'}
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center justify-center space-x-8 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 hover:bg-primary-50"
              >
                {({ isActive }) => (
                  <>
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' 
                        : 'text-gray-500 hover:text-primary-600 bg-gray-100'
                      }
                    `}>
                      <ApperIcon name={item.icon} size={20} />
                    </div>
                    <span className={`
                      font-semibold transition-colors duration-300
                      ${isActive ? 'text-primary-600' : 'text-gray-700'}
                    `}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeDesktopTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl -z-10"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;