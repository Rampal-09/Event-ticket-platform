const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../../config/db');
const { requireAuth, requireRole } = require('../../middlewares/authMiddleware');

const router = express.Router();

/**
 * @route GET /api/admin/events/moderation-stats
 * @desc  Get stats for moderation dashboard
 */
router.get('/events/moderation-stats', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    try {
        const [pendingCount, suspendedUsers, totalReviewed, approvedCount] = await Promise.all([
            prisma.event.count({ where: { status: 'PENDING' } }),
            prisma.user.count({ where: { status: 'SUSPENDED' } }),
            prisma.event.count({
                where: {
                    status: { in: ['APPROVED', 'REJECTED'] }
                }
            }),
            prisma.event.count({ where: { status: 'APPROVED' } })
        ]);

        const approvalRate = totalReviewed > 0 
            ? Math.round((approvedCount / totalReviewed) * 100) 
            : 0;

        res.json({
            pendingCount,
            suspendedUsers,
            approvalRate,
            flaggedReports: 0 // Placeholder for future report system
        });
    } catch (error) {
        console.error('Moderation stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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
 * @route GET /api/admin/events/history
 * @desc  Get history of reviewed events (Approved/Rejected)
 */
router.get('/events/history', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    try {
        const history = await prisma.event.findMany({
            where: {
                status: { in: ['APPROVED', 'REJECTED'] }
            },
            include: {
                user_event_organizerIdTouser: {
                    select: { name: true }
                },
                user_event_reviewedByIdTouser: {
                    select: { name: true }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        const mappedHistory = history.map(e => ({
            id: e.id,
            eventName: e.title,
            organizer: e.user_event_organizerIdTouser?.name || 'Unknown',
            decision: e.status === 'APPROVED' ? 'Approved' : 'Rejected',
            reviewedBy: e.user_event_reviewedByIdTouser?.name || 'Platform Admin',
            reason: e.rejectionReason,
            date: e.updatedAt || e.createdAt
        }));

        res.json(mappedHistory);
    } catch (error) {
        console.error('Error fetching review history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route GET /api/admin/dashboard
 * @desc  Get system-wide stats and recent events for admin dashboard
 */
router.get('/dashboard', requireAuth, requireRole(['ADMIN']), async (req, res) => {
    try {
        const [totalEvents, pendingEvents, totalUsers, totalTickets, recentEvents] = await Promise.all([
            prisma.event.count(),
            prisma.event.count({ where: { status: 'PENDING' } }),
            prisma.user.count(),
            prisma.ticket.count(),
            prisma.event.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    user_event_organizerIdTouser: {
                        select: { name: true }
                    }
                }
            })
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
            totalTicketsSold: totalTickets,
            totalRevenue,
            recentEvents: recentEvents.map(e => ({
                ...e,
                organizerName: e.user_event_organizerIdTouser?.name || 'Unknown'
            }))
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @route GET /api/admin/stats
 * @desc  Get system-wide stats for admin dashboard (Legacy/Compact)
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

    const validRoles = ['ADMIN', 'ORGANIZER', 'TENANT', 'STAFF'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role }
        });
        res.json(user);
    } catch (error) {
        console.error('Update role error:', error);
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

    const validStatus = ['ACTIVE', 'SUSPENDED'];
    if (!validStatus.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    // Safety: Prevent self-suspension
    if (parseInt(id) === req.user.id && status === 'SUSPENDED') {
        return res.status(403).json({ error: 'Safety Guard: You cannot suspend your own account.' });
    }

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        res.json(user);
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
