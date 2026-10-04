import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Reservations from './pages/Reservations';
import ReservationDetails from './pages/ReservationDetails';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import ModalExamples from './pages/ModalExamples';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/:id" element={<ReservationDetails />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/modal-examples" element={<ModalExamples />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}
