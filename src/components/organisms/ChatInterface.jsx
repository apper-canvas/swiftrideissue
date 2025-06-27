import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ChatMessage from '@/components/molecules/ChatMessage';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { messageService } from '@/services/api/messageService';

const ChatInterface = ({ ride, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const quickMessages = [
    "I'm on my way down",
    "Please call when you arrive",
    "Running 2 minutes late",
    "Thank you!",
  ];

  useEffect(() => {
    loadMessages();
  }, [ride]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const rideMessages = await messageService.getByRideId(ride.Id);
      setMessages(rideMessages);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageContent = newMessage) => {
    if (!messageContent.trim()) return;

    try {
      const messageData = {
        rideId: ride.Id,
        senderId: 'user',
        content: messageContent,
        timestamp: new Date().toISOString(),
      };

      const savedMessage = await messageService.create(messageData);
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage('');

      // Simulate driver response after 2 seconds
      setTimeout(async () => {
        const driverResponse = {
          rideId: ride.Id,
          senderId: 'driver',
          content: getDriverResponse(messageContent),
          timestamp: new Date().toISOString(),
        };
        
        const driverMessage = await messageService.create(driverResponse);
        setMessages(prev => [...prev, driverMessage]);
      }, 2000);

    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const getDriverResponse = (userMessage) => {
    const responses = {
      "I'm on my way down": "Great! I'll be waiting outside.",
      "Please call when you arrive": "Will do! I'll call you when I'm here.",
      "Running 2 minutes late": "No problem, take your time.",
      "Thank you!": "You're welcome! Have a great day!",
    };
    
    return responses[userMessage] || "Got it, thanks for letting me know!";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50 lg:items-center"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="w-full max-w-md bg-white rounded-t-3xl lg:rounded-3xl shadow-2xl flex flex-col h-3/4 lg:h-96"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="MessageCircle" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Chat with Driver</h3>
              <p className="text-sm text-gray-500">Quick messages available</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <ApperIcon name="Loader2" className="animate-spin" size={24} />
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.Id}
                  message={message}
                  isCurrentUser={message.senderId === 'user'}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Quick Messages */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(msg)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm transition-colors"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim()}
              className="w-12 h-12 rounded-full p-0"
              icon="Send"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatInterface;