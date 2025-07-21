# Baby Visit Booking Website

## Live Website
**URL:** https://hhcbhiqe.manus.space

## Project Overview
A complete website for booking baby visit time slots and managing a gift registry where visitors can mark presents as taken.

## Features Implemented

### 🗓️ Booking System
- **Name Input**: Visitors enter their name
- **Date Selection**: Choose any future date
- **Time Slots**: 10 available slots from 9:00 AM to 6:00 PM
- **Double-booking Prevention**: Booked slots become unavailable
- **Confirmation**: Success message and form reset after booking

### 🎁 Gift Registry
- **15 Pre-loaded Items**: Baby clothes, diapers, toys, and essential items
- **Interactive Marking**: Click to mark items as "taken"
- **Visual Feedback**: Strikethrough effect and color change for taken items
- **Toggle Functionality**: Click again to unmark items

### 📱 Design & User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean cards with shadows and hover effects
- **Color-coded Status**: Green for available, red for taken/booked
- **Professional Styling**: Gradient background and consistent typography
- **Icons**: Lucide icons for visual enhancement

### 📋 Additional Features
- **Upcoming Visits Display**: Shows all booked appointments
- **Form Validation**: Prevents incomplete bookings
- **Real-time Updates**: Immediate feedback on all interactions

## Technical Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Manus hosting platform

## Project Structure
```
baby-visit-booking/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styling configuration
│   └── components/ui/   # UI component library
├── dist/                # Production build
└── package.json         # Dependencies and scripts
```

## Usage Instructions

### For Website Visitors:
1. Enter your name in the "Your Name" field
2. Select a visit date using the date picker
3. Choose an available time slot (highlighted buttons)
4. Click "Book Visit" to confirm
5. Browse the Gift Registry and click items you plan to bring

### For Website Owners:
- The website automatically prevents double bookings
- All data is stored in browser memory (resets on page refresh)
- For persistent data, consider adding a backend database

## Customization Options
- **Present List**: Edit the `presents` array in App.jsx to modify gift items
- **Time Slots**: Modify the `timeSlots` array to change available times
- **Styling**: Update colors and design in App.css or component styles
- **Features**: Add new functionality by extending the React components

## Deployment
The website is deployed and accessible at: https://hhcbhiqe.manus.space

The deployment is permanent and will remain accessible for ongoing use.

