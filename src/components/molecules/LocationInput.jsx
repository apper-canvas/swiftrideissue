import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const LocationInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  icon,
  suggestions = [],
  onSuggestionSelect 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.address);
    onSuggestionSelect?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <ApperIcon name={icon} size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="input-field pl-12 pr-12"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setShowSuggestions(false);
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <ApperIcon name="X" size={20} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-panel border border-gray-100 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center space-x-3">
                <ApperIcon 
                  name={suggestion.type === 'recent' ? 'Clock' : 'MapPin'} 
                  size={18} 
                  className="text-gray-400" 
                />
                <div>
                  <p className="font-medium text-gray-900">{suggestion.address}</p>
                  {suggestion.subtitle && (
                    <p className="text-sm text-gray-500">{suggestion.subtitle}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;