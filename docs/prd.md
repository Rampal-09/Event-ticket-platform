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

---

# 7. Future Enhancements (Phase 2)

Future upgrades may include:

* Dynamic QR codes
* Mobile ticket wallet
* Event promotion tools
* Advanced scanner for large events
* Organizer analytics dashboard
