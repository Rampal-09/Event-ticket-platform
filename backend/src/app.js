const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const organizerRoutes = require('./modules/owner/organizer.routes');
const tenantRoutes = require('./modules/tenant/tenant.routes');
const publicRoutes = require('./modules/tenant/public.routes');

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/organizer', organizerRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/tickets', tenantRoutes);

module.exports = app;
