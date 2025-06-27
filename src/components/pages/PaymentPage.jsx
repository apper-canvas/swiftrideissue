import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import PaymentCard from '@/components/molecules/PaymentCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { paymentService } from '@/services/api/paymentService';

const PaymentPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [addingCard, setAddingCard] = useState(false);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      setLoading(true);
      setError('');
      const payments = await paymentService.getAll();
      setPaymentMethods(payments);
    } catch (err) {
      setError('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (paymentId) => {
    try {
      // Update all cards to not default
      const updates = paymentMethods.map(async (payment) => {
        return paymentService.update(payment.Id, {
          isDefault: payment.Id === paymentId
        });
      });
      
      await Promise.all(updates);
      toast.success('Default payment method updated');
      loadPaymentMethods();
    } catch (error) {
      toast.error('Failed to update default payment method');
    }
  };

  const handleDeleteCard = async (paymentId) => {
    try {
      await paymentService.delete(paymentId);
      toast.success('Payment method removed');
      loadPaymentMethods();
    } catch (error) {
      toast.error('Failed to remove payment method');
    }
  };

  const handleAddCard = async () => {
    if (!newCard.cardNumber || !newCard.expiryDate || !newCard.cvv || !newCard.cardholderName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newCard.cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('Please enter a valid card number');
      return;
    }

    setAddingCard(true);
    try {
      const cardType = getCardType(newCard.cardNumber);
      const cardLast4 = newCard.cardNumber.replace(/\s/g, '').slice(-4);
      
      const newPayment = {
        cardLast4: cardLast4,
        cardType: cardType,
        isDefault: paymentMethods.length === 0, // First card becomes default
      };

      await paymentService.create(newPayment);
      toast.success('Payment method added successfully');
      setShowAddCard(false);
      setNewCard({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
      });
      loadPaymentMethods();
    } catch (error) {
      toast.error('Failed to add payment method');
    } finally {
      setAddingCard(false);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    if (number.startsWith('6')) return 'discover';
    return 'visa';
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment options</p>
        </div>
        <Loading type="skeleton" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment options</p>
        </div>
        <Error 
          message={error} 
          onRetry={loadPaymentMethods}
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
        <h1 className="text-3xl font-bold gradient-text mb-4">Payment Methods</h1>
        <p className="text-gray-600">Manage your payment options</p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Add Payment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            icon="Plus"
            onClick={() => setShowAddCard(true)}
          >
            Add Payment Method
          </Button>
        </motion.div>

        {/* Payment Methods List */}
        {paymentMethods.length === 0 ? (
          <Empty
            type="payments"
            onAction={() => setShowAddCard(true)}
          />
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((payment) => (
              <PaymentCard
                key={payment.Id}
                paymentMethod={payment}
                isDefault={payment.isDefault}
                onSetDefault={handleSetDefault}
                onDelete={handleDeleteCard}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCard && (
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
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="CreditCard" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Add Payment Method
                </h3>
                <p className="text-gray-600">
                  Add a new card for quick and secure payments
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Cardholder Name"
                  value={newCard.cardholderName}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardholderName: e.target.value }))}
                  placeholder="John Doe"
                  icon="User"
                  required
                />

                <Input
                  label="Card Number"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                  placeholder="1234 5678 9012 3456"
                  icon="CreditCard"
                  maxLength="19"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />

                  <Input
                    label="CVV"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowAddCard(false);
                    setNewCard({
                      cardNumber: '',
                      expiryDate: '',
                      cvv: '',
                      cardholderName: '',
                    });
                  }}
                  disabled={addingCard}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleAddCard}
                  loading={addingCard}
                  disabled={addingCard}
                >
                  Add Card
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;