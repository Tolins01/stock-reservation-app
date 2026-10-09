import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Reservations from './pages/Reservations';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/reservations" replace />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;