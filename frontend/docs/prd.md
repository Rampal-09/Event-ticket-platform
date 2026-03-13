# Event Ticket Platform

Product Requirement Document (PRD)

## 1. Product Overview

The Event Ticket Platform is a simple web application that allows organizers to create events and sell tickets online. Users can browse events, purchase tickets, and receive a QR-code ticket for event entry.

At the event gate, staff can scan QR codes to verify ticket validity and mark entry.

The system contains four main modules:

1. Public Event Website
2. Ticket Purchase System
3. Organizer Dashboard
4. Ticket QR Scanner

---

# 2. Product Goals

Primary objectives:

* Allow users to discover events easily
* Allow organizers to create and manage events
* Generate QR-code tickets automatically after purchase
* Provide a fast ticket validation system at entry gates

---

# 3. Target Users

## Event Attendees

Users who browse events and purchase tickets.

## Event Organizers

Users who create and manage events.

## Entry Staff

Staff responsible for scanning tickets at the event entry gate.

---

# 4. Core Modules

## Public Website

Allows visitors to:

* Browse upcoming events
* Search for events
* View event details
* Purchase tickets

Pages:

* Homepage
* Event List
* Event Details

---

## Ticket Purchase System

Users can:

* Enter their personal details
* Select ticket quantity
* Make payment
* Receive a ticket with QR code

Pages:

* Checkout Page
* Ticket Confirmation Page

---

## Organizer Dashboard

Organizers can manage their events.

Features:

* Create new events
* View all created events
* Monitor tickets sold

Pages:

* Dashboard
* Create Event
* My Events

---

## Ticket Validation System

Used by entry staff at the event gate.

Functions:

* Scan ticket QR code
* Verify ticket validity
* Mark ticket as used

Page:

* QR Scanner

---

# 5. Database Entities (SQL)

## Users

Columns:

* id
* name
* email
* password
* role

---

## Events

Columns:

* id
* title
* description
* location
* event_date
* ticket_price
* total_tickets
* organizer_id

---

## Tickets

Columns:

* id
* event_id
* buyer_email
* qr_code
* status

Status values:

* unused
* used

---

# 6. Key Features

Core features include:

* Event browsing
* Ticket purchasing
* QR code ticket generation
* Ticket scanning
* Organizer event management

Additional Platform Capabilities

• Real-time ticket tracking for organizers
• Email ticket confirmation after purchase
• Mobile optimized event pages
• QR-based entry scanning system

---

# 7. Future Enhancements (Phase 2)

Future upgrades may include:

* Dynamic QR codes
* Mobile ticket wallet
* Event promotion tools
* Advanced scanner for large events
* Organizer analytics dashboard

---

# Phase 1 Extended Features

These features expand the platform capabilities but must not modify existing modules or architecture. They are add-on features to be implemented later.

---

## 1. Event Gallery (Multiple Photos)

**Feature Description:**
Allow event organizers to upload and manage multiple photos for an event to showcase the venue, previous events, or speakers.

**User Benefits:**
- **Organizers:** Better presentation of events, leading to higher conversion rates.
- **Attendees:** Visual confirmation of event quality and atmosphere.

**Basic Workflow:**
1. Organizer navigates to event creation/edit page.
2. Uses a drag-and-drop interface or file picker to upload multiple images (Required: Support drag & drop ordering).
3. Preview images before publishing.
4. Images are displayed in a responsive gallery slider on the public event page.

**Future Considerations:**
- Image compression for faster loading.
- CDN delivery for global performance.
- Lazy loading to optimize initial page load.

---

## 2. Event Approval System

**Feature Description:**
Introduce a workflow where newly created events must be reviewed and approved by a platform administrator before becoming public.

**User Benefits:**
- **Platform Owners:** Ensure content quality and prevent spam or fraudulent events.
- **Attendees:** Increased trust in listed events.

**Basic Workflow:**
1. Organizer submits an event.
2. Event state is set to `Pending Approval`.
3. Admin views a list of pending events in the Admin Dashboard.
4. Admin can `Approve`, `Reject`, or `Request Edits`.
5. Once approved, the event status changes to `Approved` and appears in public listings.

**Status Values:**
- `Draft`
- `Pending`
- `Approved`
- `Rejected`

---

## 3. Promo Codes

**Feature Description:**
Enable organizers to create and manage discount codes (fixed amount or percentage) that users can apply during checkout.

**User Benefits:**
- **Organizers:** Run marketing campaigns and boost early sales.
- **Attendees:** Get tickets at a discounted price.

**Basic Workflow:**
1. Organizer creates a promo code (e.g., `EARLYBIRD`) during event setup.
2. Defines discount type (Fixed OR Percentage), value, expiration date, and usage limit.
3. Buyer enters the code on the checkout page during checkout.
4. System validates the code and updates the total price before payment.

**Examples:**
- `CODE10` -> 10% discount
- `EARLYBIRD` -> ₹100 off

---

## 4. Free Events

**Feature Description:**
Support events that do not require any monetary payment for registration.

**User Benefits:**
- **Organizers:** Host community meetups, webinars, or open-house events easily.
- **Attendees:** Register for events without providing payment information.

**Basic Workflow:**
1. Organizer sets the ticket price to ₹0.
2. User proceeds to registration without payment.
3. System still generates a valid ticket and QR code.
4. Free tickets still count toward event capacity.

---

## 5. Private Events

**Feature Description:**
Allow organizers to restrict event visibility to specific invited users or those with a direct link.

**User Benefits:**
- **Organizers:** Host private parties, corporate meetings, or exclusive workshops.
- **Attendees:** Access exclusive events not visible to the general public.

**Basic Workflow:**
1. Organizer sets visibility mode to `Private`.
2. Event is hidden from the public "Upcoming Events" list and search results.
3. Access is only possible via a direct unique link.
4. (Optional) Organizer sets a password for extra security.

---

## 6. Ticket Urgency Indicator (Selling Fast)

**Feature Description:**
Display visual cues on the event page to indicate low ticket availability and encourage faster purchase decisions.

**User Benefits:**
- **Organizers:** Improved conversion through scarcity/urgency.
- **Attendees:** Awareness of limited availability so they don't miss out.

**Rules:**
- If tickets remaining < 20% -> show "🔥 Selling Fast"
- If tickets remaining < 10% -> show "⚠ Almost Sold Out"

---

## 7. Event Promotion Tools

**Feature Description:**
Provide organizers with built-in tools to share and promote their events across various platforms.

**User Benefits:**
- **Organizers:** Faster distribution and higher reach for their events.

**Basic Workflow:**
1. System automatically generates a unique QR code for each event.
2. QR redirects to the event page.
3. One-click share buttons for social media platforms and shareable event link.

**Future Integrations:**
- WhatsApp sharing
- Instagram sharing
- Telegram sharing

---

## 8. FAQ Page

**Feature Description:**
A dedicated page for platform-wide frequently asked questions to reduce support queries.

**User Benefits:**
- **All Users:** Quick answers to common questions regarding tickets, refunds, and usage.

**Sections Include:**
- Ticket purchase questions
- Refund policies
- Event access instructions
- QR ticket scanning

**Admin Control:**
- Administrators can add, edit, or remove FAQ items later through the admin panel.

---

# 8. Homepage Marketing Sections

The homepage will include additional marketing sections designed to communicate the platform's value and features to visitors.

These sections include:

1. Platform Features
2. Supported Event Types
3. Transparent Pricing
4. Trust Banner

