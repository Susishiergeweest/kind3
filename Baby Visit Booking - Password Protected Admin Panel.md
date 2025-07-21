# Baby Visit Booking - Password Protected Admin Panel

## Live Website
**URL:** https://3dhkilcq3pgw.manus.space

## Overview
Your baby visit booking website now includes password protection for the admin panel. The website maintains all previous functionality while adding secure access control for administrative features.

## Authentication Details

### Admin Credentials
- **Username:** admin
- **Password:** babyvisit2025

### Security Features
- **Session-based Authentication:** Login sessions are maintained securely
- **Protected Admin Routes:** All admin functions require authentication
- **Automatic Logout:** Sessions expire for security
- **Password Validation:** Secure password hashing and verification

## How to Access Admin Panel

### Step 1: Navigate to Admin Panel
1. Visit the website: https://3dhkilcq3pgw.manus.space
2. Click on the "Admin Panel" tab

### Step 2: Login
1. Enter username: `admin`
2. Enter password: `babyvisit2025`
3. Click "Login" button

### Step 3: Admin Functions
Once logged in, you can:
- **Add Time Slots:** Enter time in HH:MM format and click "Add Timeslot"
- **Activate/Deactivate Slots:** Control which time slots are available for booking
- **Delete Time Slots:** Remove unused slots (only if no bookings exist)
- **View All Bookings:** See complete booking history with visitor details
- **Logout:** Click the "Logout" button when finished

## Security Benefits

### For Administrators
- **Controlled Access:** Only authorized users can modify time slots
- **Data Protection:** Booking information is secure from unauthorized access
- **Session Management:** Automatic logout prevents unauthorized access from unattended devices

### For Visitors
- **Unchanged Experience:** Booking and gift registry functions work exactly the same
- **Data Privacy:** Personal booking information is protected
- **Reliable Service:** Admin controls ensure consistent availability management

## Admin Panel Features

### Time Slot Management
- **Add New Slots:** Create custom time slots beyond the default hours
- **Toggle Availability:** Temporarily disable slots without deleting them
- **Smart Deletion:** Prevents deletion of slots with existing bookings
- **Real-time Updates:** Changes immediately reflect in the booking interface

### Booking Management
- **Complete Overview:** View all scheduled visits with timestamps
- **Visitor Information:** Access to visitor names and contact details
- **Booking History:** Track when each appointment was made
- **Conflict Prevention:** System automatically prevents double-booking

### Session Management
- **Secure Login:** Password-protected access to admin functions
- **Session Persistence:** Stay logged in during admin tasks
- **Easy Logout:** One-click logout for security
- **Auto-expiration:** Sessions expire automatically for security

## Technical Implementation

### Backend Security
- **Password Hashing:** Passwords are securely hashed using industry standards
- **Session Tokens:** Secure session management with server-side validation
- **Route Protection:** All admin endpoints require authentication
- **CORS Configuration:** Proper cross-origin request handling

### Frontend Security
- **Authentication State:** Secure management of login status
- **Protected Components:** Admin interface only accessible after login
- **Error Handling:** Clear feedback for authentication issues
- **Credential Validation:** Client-side validation before submission

## Default Configuration

### Pre-configured Time Slots
The system includes these default time slots:
- 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00

### Database Storage
- **SQLite Database:** All data stored persistently
- **Automatic Backup:** Data survives server restarts
- **Conflict Resolution:** Prevents booking conflicts automatically

## Best Practices

### For Security
1. **Change Default Password:** Consider updating the default password for production use
2. **Regular Logout:** Always logout when finished with admin tasks
3. **Secure Access:** Only share credentials with authorized administrators
4. **Monitor Activity:** Regularly check booking logs for any issues

### For Management
1. **Regular Updates:** Check the admin panel regularly for new bookings
2. **Proactive Planning:** Add or disable slots based on your availability
3. **Visitor Communication:** Use booking information to coordinate with visitors
4. **Data Maintenance:** Periodically review and clean up old bookings if needed

## Troubleshooting

### Login Issues
- **Invalid Credentials:** Ensure username is "admin" and password is "babyvisit2025"
- **Session Expired:** Simply login again if prompted
- **Browser Issues:** Try refreshing the page or clearing browser cache

### Admin Functions
- **Can't Delete Slot:** Slots with existing bookings cannot be deleted
- **Changes Not Showing:** Refresh the page to see latest updates
- **Booking Conflicts:** System automatically prevents double-booking

The website now provides secure, professional-grade admin functionality while maintaining the same great user experience for visitors!

