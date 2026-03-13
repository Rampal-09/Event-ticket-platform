const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../../config/db');
const { requireAuth, requireRole } = require('../../middlewares/authMiddleware');

const router = express.Router();

/**
 * @route GET /api/admin/events
 * @desc  Get all events for moderation
 */
router.get('/events', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                user_event_organizerIdTouser: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                user_event_reviewedByIdTouser: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Map responses for frontend
        const mappedEvents = events.map(e => ({
            ...e,
            organizer: e.user_event_organizerIdTouser,
            reviewedBy: e.user_event_reviewedByIdTouser
        }));

        res.json(mappedEvents);
    } catch (error) {
        console.error('Error fetching admin events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route GET /api/admin/stats
 * @desc  Get system-wide stats for admin dashboard
 */
router.get('/stats', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    try {
        const [totalEvents, pendingEvents, totalUsers, totalTickets] = await Promise.all([
            prisma.event.count(),
            prisma.event.count({ where: { status: 'PENDING' } }),
            prisma.user.count(),
            prisma.ticket.count()
        ]);

        const revStats = await prisma.event.findMany({
            select: {
                ticketsSold: true,
                ticketPrice: true
            }
        });

        const totalRevenue = revStats.reduce((sum, ev) => sum + ((ev.ticketsSold || 0) * ev.ticketPrice), 0);

        res.json({
            totalEvents,
            pendingEvents,
            totalUsers,
            ticketsSold: totalTickets,
            revenue: totalRevenue
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route PATCH /api/admin/events/:id/status
 * @desc  Update event status
 */
router.patch('/events/:id/status', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    const { id } = req.params;
    const { status, reason } = req.body;

    try {
        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                status,
                reviewedById: req.user.id,
                rejectionReason: status === 'REJECTED' ? reason : null
            }
        });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route GET /api/admin/users
 * @desc  Get all users
 */
router.get('/users', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route PATCH /api/admin/users/:id/role
 * @desc  Change user role
 */
router.patch('/users/:id/role', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route PATCH /api/admin/users/:id/status
 * @desc  Update user status (SUSPENDED/ACTIVE)
 */
router.patch('/users/:id/status', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
