import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Reservations from './pages/Reservations';
import OrdersPage from './pages/OrdersPage'; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/reservations" replace />} />
          <Route path="/reservations" element={<Reservations />} />
           <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;