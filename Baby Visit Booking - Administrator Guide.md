# Baby Visit Booking - Administrator Guide

## Live Website
**URL:** https://lnh8imcdmg9o.manus.space

## Overview
The Baby Visit Booking website now includes a complete administrator interface that allows you to manage available time slots dynamically. The website has two main sections:

1. **Booking & Gifts** - For visitors to book appointments and view the gift registry
2. **Admin Panel** - For administrators to manage time slots

## Admin Panel Features

### Accessing the Admin Panel
1. Visit the website: https://lnh8imcdmg9o.manus.space
2. Click on the "Admin Panel" tab at the top of the page

### Managing Time Slots

#### Adding New Time Slots
1. In the Admin Panel, locate the "Timeslot Management" section
2. Enter a time in HH:MM format (24-hour format) in the input field
3. Click the "Add Timeslot" button
4. The new time slot will appear in the "Current Timeslots" list

#### Deactivating/Activating Time Slots
1. Find the time slot you want to modify in the "Current Timeslots" list
2. Click the "Deactivate" button to make it unavailable for booking
3. Click "Activate" to make it available again
4. Inactive slots will show as "Inactive" and appear grayed out

#### Deleting Time Slots
1. Find the time slot you want to remove
2. Click the red trash icon button
3. Confirm the deletion when prompted
4. **Note:** You cannot delete time slots that have existing bookings

### Viewing All Bookings
The Admin Panel includes an "All Bookings" section that shows:
- Visitor names
- Visit dates and times
- When each booking was made
- Complete booking history

## How the System Works

### For Visitors (Booking & Gifts Tab)
1. **Booking Process:**
   - Enter their name
   - Select a visit date
   - Choose from available time slots (only active slots are shown)
   - Click "Book Visit" to confirm

2. **Gift Registry:**
   - Click on any gift item to mark it as "taken"
   - Items marked as taken show with strikethrough and gray background
   - Click again to unmark an item

### For Administrators (Admin Panel Tab)
1. **Time Slot Management:**
   - Add new time slots as needed
   - Activate/deactivate slots based on availability
   - Delete unused slots (only if no bookings exist)

2. **Booking Oversight:**
   - View all scheduled visits
   - Monitor booking patterns
   - Track visitor information

## Technical Features

### Data Persistence
- All bookings and time slots are stored in a SQLite database
- Data persists between sessions and server restarts
- Booking conflicts are automatically prevented

### Default Time Slots
The system comes pre-configured with these default time slots:
- 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00

### Booking Validation
- Prevents double-booking of the same time slot on the same date
- Ensures all required fields are filled before booking
- Only allows booking of active time slots

## Best Practices

### For Administrators
1. **Regular Monitoring:** Check the Admin Panel regularly to see new bookings
2. **Slot Management:** Add or remove time slots based on your availability
3. **Advance Planning:** Deactivate slots when you're not available
4. **Backup Consideration:** The database is stored locally - consider regular backups for important data

### For Visitors
1. **Early Booking:** Book visits in advance to secure preferred time slots
2. **Gift Coordination:** Check the gift registry before purchasing to avoid duplicates
3. **Contact Information:** Consider adding contact details for coordination

## Troubleshooting

### Common Issues
1. **Time Slot Not Showing:** Check if the slot is active in the Admin Panel
2. **Booking Failed:** Ensure the time slot isn't already booked for that date
3. **Can't Delete Slot:** Slots with existing bookings cannot be deleted

### Support
The website is fully functional and self-contained. All features work offline once loaded, with data stored locally in the browser and server database.

