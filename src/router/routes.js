export const ROUTES = {
    // Public
    HOME: '/',
    EVENT_LIST: '/events',
    EVENT_DETAILS: '/events/:id',
    CHECKOUT: '/checkout',
    CHECKOUT_EVENT: '/checkout/:eventId',
    TICKET: '/ticket/:ticketId',
    ORDER_SUCCESS: '/order-success',

    // Auth
    LOGIN: '/login',
    REGISTER: '/register',

    // Organizer
    ORGANIZER_DASHBOARD: '/organizer',
    CREATE_EVENT: '/organizer/create-event',
    MY_EVENTS: '/organizer/my-events',
    ORGANIZER_REPORTS: '/organizer/reports',

    // Scanner
    SCANNER: '/scanner',

    // Phase 1 Extended
    FAQ: '/faq',
    ADMIN_DASHBOARD: '/admin',
    ADMIN_EVENTS: '/admin/events',
    ADMIN_USERS: '/admin/users',
    ADMIN_REVIEW_HISTORY: '/admin/review-history',
};
