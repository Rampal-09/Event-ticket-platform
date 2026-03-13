import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';

// Placeholder Page Imports
import Home from '../pages/public/Home';
import EventList from '../pages/public/EventList';
import EventDetails from '../pages/public/EventDetails';
import CheckoutPage from '../pages/public/CheckoutPage';
import OrderSuccessPage from '../pages/public/OrderSuccessPage';
import TicketPage from '../pages/public/TicketPage';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Dashboard from '../pages/organizer/Dashboard';
import CreateEvent from '../pages/organizer/CreateEvent';
import MyEvents from '../pages/organizer/MyEvents';
import EditEvent from '../pages/organizer/EditEvent';
import OrganizerReports from '../pages/organizer/OrganizerReports';

import QRScanner from '../pages/scanner/QRScanner';

import FaqPage from '../pages/public/FaqPage';
import AdminEventsPage from '../pages/admin/AdminEventsPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import ReviewHistoryPage from '../pages/admin/ReviewHistoryPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';

import PublicLayout from '../layouts/PublicLayout';
import OrganizerLayout from '../layouts/OrganizerLayout';
import AdminLayout from '../layouts/AdminLayout';
import ScannerLayout from '../layouts/ScannerLayout';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes with PublicLayout */}
                <Route element={<PublicLayout />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.EVENT_LIST} element={<EventList />} />
                    <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />
                    <Route path={ROUTES.CHECKOUT_EVENT} element={<CheckoutPage />} />
                    <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccessPage />} />
                    <Route path={ROUTES.TICKET} element={<TicketPage />} />
                    <Route path={ROUTES.FAQ} element={<FaqPage />} />
                </Route>

                {/* Auth Routes (Standalone) */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />

                {/* Protected Organizer Routes */}
                <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
                    <Route element={<OrganizerLayout />}>
                        <Route path={ROUTES.ORGANIZER_DASHBOARD} element={<Dashboard />} />
                        <Route path={ROUTES.CREATE_EVENT} element={<CreateEvent />} />
                        <Route path={ROUTES.MY_EVENTS} element={<MyEvents />} />
                        <Route path={ROUTES.EDIT_EVENT} element={<EditEvent />} />
                        <Route path={ROUTES.ORGANIZER_REPORTS} element={<OrganizerReports />} />
                    </Route>
                </Route>

                {/* Protected Scanner Routes */}
                <Route element={<ProtectedRoute allowedRoles={['organizer', 'staff']} />}>
                    <Route element={<ScannerLayout />}>
                        <Route path={ROUTES.SCANNER} element={<QRScanner />} />
                    </Route>
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<AdminLayout />}>
                        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
                        <Route path={ROUTES.ADMIN_EVENTS} element={<AdminEventsPage />} />
                        <Route path={ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
                        <Route path={ROUTES.ADMIN_REVIEW_HISTORY} element={<ReviewHistoryPage />} />
                    </Route>
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
