import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import BookRidePage from '@/components/pages/BookRidePage';
import ActiveRidePage from '@/components/pages/ActiveRidePage';
import RideHistoryPage from '@/components/pages/RideHistoryPage';
import PaymentPage from '@/components/pages/PaymentPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BookRidePage />} />
            <Route path="/book" element={<BookRidePage />} />
            <Route path="/active" element={<ActiveRidePage />} />
            <Route path="/history" element={<RideHistoryPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;