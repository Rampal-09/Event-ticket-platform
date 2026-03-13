# System Roles

This document defines the Role-Based Access Control (RBAC) structure for the Event Ticket Platform. The system utilizes four distinct roles to manage permissions and access levels across the platform.

---

## 1. Attendee

**Description:**
Represents a user who interacts with the platform to discover and participate in events. Attendees are the primary consumers of the ticket services.

**Permissions:**
- Browse and search for public events.
- Purchase tickets for available events.
- Apply promo codes at checkout.
- Receive unique QR-coded tickets via confirmation.
- View and manage a personal list of purchased tickets.
- Access detailed event information including location, date, and description.

**Responsibilities:**
- Responsible for maintaining their own account details.
- Responsible for presenting their valid QR ticket for scanning at the event entry.

**Restrictions:**
- Attendees have **no management permissions** and cannot access any dashboard or scanner tools.

---

## 2. Organizer

**Description:**
Represents a user or entity responsible for creating, managing, and promoting events on the platform.

**Permissions:**
- Access the Organizer Dashboard to manage their portfolio of events.
- Create new events and edit details of existing events.
- Upload images to event galleries.
- Create and manage promo codes for event discounts.
- View real-time ticket sales and attendee analytics.
- Generate and share event promotion links.
- Generate event-specific QR promotion codes for marketing materials.

**Responsibilities:**
- Ensure all event content is accurate and professional.
- Manage event capacity and ticket availability.
- Provide support or information to attendees regarding specific event details.

**Note:**
- Organizer actions may require **Admin approval** depending on the event status workflow (e.g., publishing a new event).

---

## 3. Entry Staff

**Description:**
Represents staff members stationed at the venue responsible for facilitating the entry process by validating attendee tickets.

**Permissions:**
- Access the platform's mobile-optimized QR Scanner tool.
- Scan attendee QR tickets using a device camera.
- View instant ticket status (Valid / Already Used / Invalid).
- Mark a valid ticket as "Used" upon entry to prevent duplicate usage.

**Responsibilities:**
- Facilitate a smooth and fast entry flow at the venue gate.
- Ensure only valid ticket holders are granted access to the event.

**Restrictions:**
- Entry Staff cannot create events, modify ticket pricing, or access financial dashboard data.

---

## 4. Admin (Platform Owner)

**Description:**
Represents the platform-level administrator responsible for the overall governance, moderation, and policy enforcement of the entire ecosystem.

**Permissions:**
- Global oversight of all events, organizers, and transactions across the platform.
- Review pending event submissions from organizers.
- Approve or reject events based on platform guidelines.
- Moderate and edit event content to ensure compliance with standards.
- Manage platform-wide policies (e.g., FAQ content, global settings).
- Remove or suspend inappropriate events or accounts if necessary.

**Responsibilities:**
- Maintain the integrity and quality of the platform's event listings.
- Mediate disputes between organizers and attendees if required.
- Ensure the platform remains a safe and reliable marketplace for ticket sales.

**Note:**
- The Admin role has **global oversight** but typically does not act as a primary organizer or attendee for individual events.

---

# RBAC Permission Matrix

This matrix provides a quick reference for understanding the access levels and functional boundaries for each role within the platform.

| Feature | Attendee | Organizer | Entry Staff | Admin |
| :--- | :---: | :---: | :---: | :---: |
| Browse events | ✓ | ✓ | ✓ | ✓ |
| Buy ticket | ✓ | ✓ | ✗ | ✓ |
| Create event | ✗ | ✓ | ✗ | ✗ |
| Edit event | ✗ | ✓ | ✗ | ✓ |
| Approve event | ✗ | ✗ | ✗ | ✓ |
| Scan tickets | ✗ | ✗ | ✓ | ✗ |

---

## Permission Rules & Definitions

### Browse events
- **Definition:** Ability to view public event listings, search for activities, and access the "Event Details" pages.
- **Rule:** This is a public-facing permission available to all authenticated roles and anonymous visitors.

### Buy ticket
- **Definition:** Ability to select tickets, apply promo codes, and complete the checkout process.
- **Rule:** Attendees and Organizers can purchase tickets. Admins have this permission primarily for testing and validation of the payment flow. Entry Staff are restricted from purchasing in their staff capacity.

### Create event
- **Definition:** Access to the event creation wizard and the ability to submit a new event listing for review.
- **Rule:** Strictly limited to the **Organizer** role.

### Edit event
- **Definition:** Ability to modify event details (description, time, gallery, ticket price) after the initial creation.
- **Rule:** **Organizers** can edit events they own. **Admins** have global edit permissions for moderation and policy enforcement.

### Approve event
- **Definition:** The authority to transition an event from "Pending" to "Approved" or "Rejected".
- **Rule:** Only **Admins** (Platform Owners) can perform this action to ensure platform safety and quality.

### Scan tickets
- **Definition:** Ability to use the integrated QR scanner to verify ticket validity and mark attendees as checked-in.
- **Rule:** Exclusively reserved for **Entry Staff** at the venue.

