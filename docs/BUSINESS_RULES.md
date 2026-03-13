# Business Rules & Logic Definitions

This document encapsulates all enforced permissions, validations, structural rules, and state changes implied by the locked frontend views. The backend strictly follows these rules with Prisma (MySQL).

## 1. Authentication & Role Definitions
The platform enforces role-based access strictly through verified JSON Web Tokens (JWT). Roles include Admin, Organizer, and Tenant.
- **ADMIN:** Full structural authority. Can list, view, and change the moderation standing (`status`) of any event globally.
- **ORGANIZER:** Can create new events, view events exclusively tied to their user ID, export specific reports on event sales and revenues natively restricted to their own ownership boundary.
- **TENANT / GENERAL / PUBLIC:** Allowed to browse all public events, initiate checkouts unconditionally (guest checkout accepted), and view event details.
- **NO REDIS:** All robust actions (like refresh validation or invalidation) happen purely by polling MySQL using Prisma.

## 2. Event Lifecycle & Moderation
The frontend defines an event's workflow implicitly via `status`.
- **Created State:** `Pending Approval`. An Organizer creates an event, it automatically joins a protected queue inaccessible to the public. 
- **Admin Review:** Admin fetches `/api/admin/events` and sends a `PATCH` changing state from `Pending Approval` to `Approved`.
- **Public List:** ONLY events with a `status: Approved` render on the public `Home` and `Event List` endpoints.

## 3. Data Consistency & Pricing Calculations
- The checkout mock demonstrates real formulas (e.g., ticket capacity calculation, total amount deductions based on simple percentage-fee or static discounts). The backend mathematically verifies the final price of `/api/tickets/purchase` utilizing Prisma data.
- It prevents duplicate spending. A ticket purchase must decrease available capacity atomically to avoid overselling.
- **Selling Fast Indicators:** Governed dynamically. When calculated remaining tickets hit a specific percentage threshold (< 20%), the returned `tags` indicate urgency natively.

## 4. Tickets & Validations
- Checkouts implicitly link a newly minted "hashed" QR string (ticket identity) against an `Event` relation.
- A ticket exists functionally in two dimensions: `UNUSED` and `USED`.
- Once verified by `/api/tickets/validate` on the scanner end, the state irrevocably flips to `USED`. Subsequent pings on that specific payload throw a 400 Error.

## 5. Development to Deployment Guarantee
- The implementation strictly relies on native JS Promises, raw Prisma definitions, and pure relational logic to guarantee that shifting the environment variable target to Railway simply connects and operates exactly identically to local development without any custom or hacked lifecycle hooks.
