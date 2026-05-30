# Smart Notification Dashboard - Design Document

## Overview

This application displays notifications fetched from the Affordmed Notification API.

Users can:

- View notifications
- Filter notifications by category
- Search notifications
- View top priority notifications

---

## Architecture

Frontend Application

React (Vite)
|
App.jsx
|
+-----------------------+
|                       |
AlertTile Component
|
Priority Engine
|
Notification API Service

---

## Components

### App.jsx

Main application component.

Responsibilities:

- Fetch notifications
- Store notifications in state
- Handle search
- Handle filtering
- Display priority notifications

### AlertTile.jsx

Reusable UI component used for displaying notification information.

### priorityEngine.js

Calculates notification priority using:

- Notification type
- Notification freshness

### activityTracker.js

Logs application events.

### api.js

Handles communication with Affordmed APIs.

---

## Priority Calculation

Priority Score Formula:

Priority Score =
Category Weight +
Recency Bonus

Weights:

Placement = 12

Result = 8

Event = 5

Recent notifications receive higher priority.

---

## Search Feature

Users can search notifications using notification message text.

Search is case-insensitive.

---

## Filtering

Supported Filters:

- All
- Placement
- Result
- Event

---

## Logging

The application tracks:

- Fetch started
- Fetch success
- Fetch failure
- Filter changes

---

## Future Improvements

- Pagination
- Notification sorting
- Dark/Light themes
- User preferences
- Real-time updates
