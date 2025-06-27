import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MapView from '@/components/molecules/MapView';
import BookingPanel from '@/components/organisms/BookingPanel';

const BookRidePage = () => {
  const navigate = useNavigate();
  const [currentBooking, setCurrentBooking] = useState(null);

  const handleBookingConfirm = (rideData) => {
    setCurrentBooking(rideData);
    // Navigate to active ride page
    navigate('/active', { state: { ride: rideData } });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold font-display gradient-text mb-2">
          SwiftRide
        </h1>
        <p className="text-gray-600 text-lg">
          Premium rides at your fingertips
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="order-2 lg:order-1"
        >
          <div className="h-96 lg:h-[600px]">
            <MapView
              pickupLocation={{ address: 'Current Location' }}
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Booking Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="order-1 lg:order-2"
        >
          <BookingPanel onBookingConfirm={handleBookingConfirm} />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">⚡</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Booking</h3>
          <p className="text-gray-600">Book rides in seconds with our streamlined interface</p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">🛡️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
          <p className="text-gray-600">Verified drivers and secure payment processing</p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">💰</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
          <p className="text-gray-600">Competitive rates with transparent pricing</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BookRidePage;