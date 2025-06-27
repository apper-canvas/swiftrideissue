import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import RideCard from '@/components/molecules/RideCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { rideService } from '@/services/api/rideService';

const RideHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rideToRate, setRideToRate] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadRides();
    
    // Check if we need to show rating modal
    if (location.state?.showRating && location.state?.completedRide) {
      setRideToRate(location.state.completedRide);
      setShowRatingModal(true);
    }
  }, [location.state]);

  const loadRides = async () => {
    try {
      setLoading(true);
      setError('');
      const rideData = await rideService.getAll();
      // Sort by most recent first
      const sortedRides = rideData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRides(sortedRides);
    } catch (err) {
      setError('Failed to load ride history');
    } finally {
      setLoading(false);
    }
  };

  const handleRebook = (ride) => {
    navigate('/book', {
      state: {
        pickupLocation: ride.pickupLocation.address,
        destination: ride.destination.address,
        rideType: ride.type,
      }
    });
  };

  const handleViewDetails = (ride) => {
    toast.info('Ride details feature coming soon!');
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      await rideService.update(rideToRate.Id, {
        rating: rating,
        comment: comment,
        status: 'completed'
      });
      
      toast.success('Thank you for your feedback!');
      setShowRatingModal(false);
      setRideToRate(null);
      setRating(0);
      setComment('');
      loadRides(); // Refresh the list
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleBookNewRide = () => {
    navigate('/book');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">Ride History</h1>
          <p className="text-gray-600">Your past trips and journeys</p>
        </div>
        <Loading type="skeleton" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">Ride History</h1>
          <p className="text-gray-600">Your past trips and journeys</p>
        </div>
        <Error 
          message={error} 
          onRetry={loadRides}
          type="general"
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
        <h1 className="text-3xl font-bold gradient-text mb-4">Ride History</h1>
        <p className="text-gray-600">Your past trips and journeys</p>
      </motion.div>

      {rides.length === 0 ? (
        <Empty
          type="rides"
          onAction={handleBookNewRide}
        />
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {rides.length} ride{rides.length !== 1 ? 's' : ''} found
            </p>
            <Button
              variant="outline"
              size="sm"
              icon="RefreshCw"
              onClick={loadRides}
            >
              Refresh
            </Button>
          </div>

          <div className="space-y-4">
            {rides.map((ride) => (
              <RideCard
                key={ride.Id}
                ride={ride}
                onRebook={handleRebook}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Rating Modal */}
      <AnimatePresence>
        {showRatingModal && rideToRate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="CheckCircle" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Trip Completed!
                </h3>
                <p className="text-gray-600">
                  How was your ride experience?
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-colors"
                  >
                    <ApperIcon
                      name="Star"
                      size={32}
                      className={`${
                        star <= rating
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment (optional)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all resize-none"
                  rows="3"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowRatingModal(false);
                    setRideToRate(null);
                    setRating(0);
                    setComment('');
                  }}
                >
                  Skip
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                >
                  Submit Rating
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RideHistoryPage;