import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RideTracker from '@/components/organisms/RideTracker';
import ChatInterface from '@/components/organisms/ChatInterface';
import Empty from '@/components/ui/Empty';
import { rideService } from '@/services/api/rideService';

const ActiveRidePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRide, setActiveRide] = useState(location.state?.ride || null);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(!activeRide);

  useEffect(() => {
    if (!activeRide) {
      checkForActiveRide();
    }
  }, []);

  const checkForActiveRide = async () => {
    try {
      setLoading(true);
      const rides = await rideService.getAll();
      const currentRide = rides.find(ride => 
        ['searching', 'assigned', 'arriving', 'in-progress'].includes(ride.status)
      );
      setActiveRide(currentRide);
    } catch (error) {
      console.error('Failed to check for active ride:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRideComplete = (completedRide) => {
    if (completedRide) {
      // Navigate to rating/completion page
      navigate('/history', { 
        state: { 
          completedRide,
          showRating: true 
        } 
      });
    } else {
      // Ride was cancelled
      setActiveRide(null);
    }
  };

  const handleOpenChat = (ride) => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const handleBookNewRide = () => {
    navigate('/book');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking for active rides...</p>
        </div>
      </div>
    );
  }

  if (!activeRide) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-4">Active Ride</h1>
          <p className="text-gray-600">Track your current ride in real-time</p>
        </motion.div>

        <Empty
          type="rides"
          title="No active rides"
          description="You don't have any active rides at the moment. Book a new ride to get started!"
          onAction={handleBookNewRide}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-4">Active Ride</h1>
        <p className="text-gray-600">Track your ride in real-time</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <RideTracker
          ride={activeRide}
          onRideComplete={handleRideComplete}
          onOpenChat={handleOpenChat}
        />
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <ChatInterface
            ride={activeRide}
            onClose={handleCloseChat}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActiveRidePage;