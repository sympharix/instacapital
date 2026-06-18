import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LandingPage from './pages/LandingPage';
import CustomerLogin from './pages/CustomerLogin';
import CustomerApply from './pages/CustomerApply';
import CustomerSupport from './pages/CustomerSupport';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import DashboardLayout from './layouts/DashboardLayout';
import CustomerLayout from './layouts/CustomerLayout';
import CustomerSignup from './pages/CustomerSignup';
import CustomerDashboard from './pages/CustomerDashboard';
import Leads from './pages/Leads';
import Customers from './pages/Customers';
import Applications from './pages/Applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Documents from './pages/Documents';
import Automations from './pages/Automations';
import Integrations from './pages/Integrations';
import SupportTickets from './pages/SupportTickets';
import DashboardOverview from './pages/DashboardOverview';
import TeamManagement from './pages/TeamManagement';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { WebSocketProvider } from './context/WebSocketContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Customer Protected Routes */}
        <Route path="/customer" element={<ProtectedRoute><CustomerLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="apply" element={<CustomerApply />} />
          <Route path="support" element={<CustomerSupport />} />
        </Route>

        {/* Admin/Agent Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="leads" element={<Leads />} />
          <Route path="customers" element={<Customers />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="documents" element={<Documents />} />
          <Route path="automations" element={<Automations />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="support-tickets" element={<SupportTickets />} />
          <Route path="team" element={<TeamManagement />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
