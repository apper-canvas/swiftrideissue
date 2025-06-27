import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import LocationInput from '@/components/molecules/LocationInput';
import RideTypeSelector from '@/components/molecules/RideTypeSelector';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { rideService } from '@/services/api/rideService';

const BookingPanel = ({ onBookingConfirm }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRideType, setSelectedRideType] = useState('standard');
  const [isBooking, setIsBooking] = useState(false);
  const [suggestions] = useState([
    { address: '123 Main St, Downtown', subtitle: 'Business District', type: 'suggestion' },
    { address: '456 Oak Ave, Midtown', subtitle: 'Shopping Center', type: 'suggestion' },
    { address: '789 Pine Rd, Uptown', subtitle: 'Residential Area', type: 'suggestion' },
    { address: 'Airport Terminal 1', subtitle: 'International Airport', type: 'suggestion' },
    { address: 'Central Train Station', subtitle: 'Public Transit', type: 'suggestion' },
  ]);

  useEffect(() => {
    // Set current location as pickup
    setPickupLocation('Current Location');
  }, []);

  const handleBookRide = async () => {
    if (!pickupLocation.trim() || !destination.trim()) {
      toast.error('Please enter both pickup and destination locations');
      return;
    }

    if (pickupLocation === destination) {
      toast.error('Pickup and destination cannot be the same');
      return;
    }

    setIsBooking(true);
    try {
      const rideData = {
        pickupLocation: { address: pickupLocation },
        destination: { address: destination },
        type: selectedRideType,
        status: 'searching',
      };

      const newRide = await rideService.create(rideData);
      toast.success('Searching for nearby drivers...');
      onBookingConfirm?.(newRide);
    } catch (error) {
      toast.error('Failed to book ride. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleSwapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(destination);
    setDestination(temp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-float p-6 space-y-6"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">
          Where to?
        </h1>
        <p className="text-gray-600">Book your ride in seconds</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <LocationInput
            label="Pickup Location"
            value={pickupLocation}
            onChange={setPickupLocation}
            placeholder="Enter pickup location"
            icon="MapPin"
            suggestions={suggestions}
          />
          
          <div className="absolute right-4 top-12 z-20">
            <button
              onClick={handleSwapLocations}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <ApperIcon name="ArrowUpDown" size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        <LocationInput
          label="Destination"
          value={destination}
          onChange={setDestination}
          placeholder="Where are you going?"
          icon="Flag"
          suggestions={suggestions}
        />
      </div>

      <RideTypeSelector
        selectedType={selectedRideType}
        onTypeSelect={setSelectedRideType}
      />

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        loading={isBooking}
        disabled={!pickupLocation.trim() || !destination.trim()}
        onClick={handleBookRide}
        icon="Navigation"
      >
        {isBooking ? 'Finding Driver...' : 'Book SwiftRide'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Safe, reliable rides at your fingertips
        </p>
      </div>
    </motion.div>
  );
};

export default BookingPanel;