import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';

// Placeholder Page Imports
import Home from '../pages/public/Home';
import EventList from '../pages/public/EventList';
import EventDetails from '../pages/public/EventDetails';
import Checkout from '../pages/public/Checkout';
import TicketPage from '../pages/public/TicketPage';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Dashboard from '../pages/organizer/Dashboard';
import CreateEvent from '../pages/organizer/CreateEvent';
import MyEvents from '../pages/organizer/MyEvents';

import QRScanner from '../pages/scanner/QRScanner';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.EVENT_LIST} element={<EventList />} />
                <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />
                <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                <Route path={ROUTES.TICKET} element={<TicketPage />} />

                {/* Auth Routes */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />

                {/* Protected Organizer Routes */}
                <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
                    <Route path={ROUTES.ORGANIZER_DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.CREATE_EVENT} element={<CreateEvent />} />
                    <Route path={ROUTES.MY_EVENTS} element={<MyEvents />} />
                </Route>

                {/* Protected Scanner Routes */}
                <Route element={<ProtectedRoute allowedRoles={['organizer', 'staff']} />}>
                    <Route path={ROUTES.SCANNER} element={<QRScanner />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
