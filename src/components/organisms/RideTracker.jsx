import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MapView from '@/components/molecules/MapView';
import DriverInfo from '@/components/molecules/DriverInfo';
import StatusPill from '@/components/atoms/StatusPill';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { rideService } from '@/services/api/rideService';
import { driverService } from '@/services/api/driverService';

const RideTracker = ({ ride, onRideComplete, onOpenChat }) => {
  const [currentRide, setCurrentRide] = useState(ride);
  const [driver, setDriver] = useState(null);
  const [eta, setEta] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDriverInfo();
    simulateRideProgress();
  }, [ride]);

  const loadDriverInfo = async () => {
    try {
      if (currentRide?.driverId) {
        const driverData = await driverService.getById(currentRide.driverId);
        setDriver(driverData);
      }
    } catch (error) {
      console.error('Failed to load driver info:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateRideProgress = () => {
    const stages = ['searching', 'assigned', 'arriving', 'in-progress', 'completed'];
    let currentStageIndex = stages.indexOf(currentRide?.status || 'searching');
    
    const progressInterval = setInterval(() => {
      currentStageIndex++;
      if (currentStageIndex < stages.length) {
        const newStatus = stages[currentStageIndex];
        setCurrentRide(prev => ({ ...prev, status: newStatus }));
        
        // Update ETA based on status
        switch (newStatus) {
          case 'assigned':
            setEta(4);
            toast.success('Driver assigned! They are on their way.');
            break;
          case 'arriving':
            setEta(2);
            toast.info('Your driver is arriving soon!');
            break;
          case 'in-progress':
            setEta(0);
            toast.success('Ride started! Enjoy your journey.');
            break;
          case 'completed':
            toast.success('Ride completed! Thanks for choosing SwiftRide.');
            onRideComplete?.(currentRide);
            break;
        }
      } else {
        clearInterval(progressInterval);
      }
    }, 8000); // Progress every 8 seconds

    return () => clearInterval(progressInterval);
  };

  const handleCancelRide = async () => {
    try {
      await rideService.update(currentRide.Id, { status: 'cancelled' });
      toast.success('Ride cancelled successfully');
      onRideComplete?.(null);
    } catch (error) {
      toast.error('Failed to cancel ride');
    }
  };

  const handleCallDriver = () => {
    toast.info('Calling driver...');
  };

  const handleMessageDriver = () => {
    onOpenChat?.(currentRide);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ApperIcon name="Loader2" className="animate-spin mx-auto mb-2" size={32} />
          <p className="text-gray-600">Loading ride information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-float p-6 text-center"
      >
        <StatusPill status={currentRide.status} size="lg" />
        <h2 className="text-2xl font-bold gradient-text mt-4 mb-2">
          {currentRide.status === 'searching' && 'Finding your driver...'}
          {currentRide.status === 'assigned' && 'Driver assigned!'}
          {currentRide.status === 'arriving' && 'Driver is arriving'}
          {currentRide.status === 'in-progress' && 'Enjoy your ride'}
          {currentRide.status === 'completed' && 'Ride completed'}
        </h2>
        <p className="text-gray-600">
          {currentRide.pickupLocation.address} → {currentRide.destination.address}
        </p>
      </motion.div>

      {/* Map */}
      <div className="h-80 lg:h-96">
        <MapView
          pickupLocation={currentRide.pickupLocation}
          destination={currentRide.destination}
          driverLocation={driver?.location}
          route={currentRide.status !== 'searching'}
        />
      </div>

      {/* Driver Info */}
      <AnimatePresence>
        {driver && currentRide.status !== 'searching' && (
          <DriverInfo
            driver={driver}
            eta={eta}
            onMessage={handleMessageDriver}
            onCall={handleCallDriver}
          />
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {currentRide.status === 'searching' && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCancelRide}
            icon="X"
          >
            Cancel Ride
          </Button>
        )}
        
        {currentRide.status !== 'searching' && currentRide.status !== 'completed' && (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleMessageDriver}
              icon="MessageCircle"
            >
              Message
            </Button>
            <Button
              variant="success"
              className="flex-1"
              onClick={handleCallDriver}
              icon="Phone"
            >
              Call Driver
            </Button>
          </>
        )}
      </div>

      {/* Trip Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-float p-6"
      >
        <h3 className="font-bold text-gray-900 mb-4">Trip Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Fare</span>
            <span className="font-semibold">${currentRide.fare}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="font-semibold">{currentRide.distance} miles</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-semibold">{currentRide.duration} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment</span>
            <span className="font-semibold capitalize">{currentRide.paymentMethod}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RideTracker;