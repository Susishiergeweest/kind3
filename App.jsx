import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Calendar, Gift, Clock, User, Settings, Plus, Trash2, Lock, LogOut } from 'lucide-react'
import './App.css'

function App() {
  // State for booking system
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeslotId, setSelectedTimeslotId] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [bookings, setBookings] = useState([])
  const [timeslots, setTimeslots] = useState([])
  const [availability, setAvailability] = useState([])

  // State for present list
  const [presents, setPresents] = useState([
    { id: 1, name: 'Baby Clothes (0-3 months)', taken: false },
    { id: 2, name: 'Baby Clothes (3-6 months)', taken: false },
    { id: 3, name: 'Baby Clothes (6-12 months)', taken: false },
    { id: 4, name: 'Diapers (Newborn)', taken: false },
    { id: 5, name: 'Diapers (Size 1)', taken: false },
    { id: 6, name: 'Baby Blanket', taken: false },
    { id: 7, name: 'Baby Bottles', taken: false },
    { id: 8, name: 'Pacifiers', taken: false },
    { id: 9, name: 'Baby Monitor', taken: false },
    { id: 10, name: 'Stroller', taken: false },
    { id: 11, name: 'Car Seat', taken: false },
    { id: 12, name: 'High Chair', taken: false },
    { id: 13, name: 'Baby Toys', taken: false },
    { id: 14, name: 'Baby Books', taken: false },
    { id: 15, name: 'Baby Bath Set', taken: false }
  ])

  // Admin state
  const [newTimeslotTime, setNewTimeslotTime] = useState('')
  const [editingTimeslot, setEditingTimeslot] = useState(null)

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  // API base URL - use relative path for deployment
  const API_BASE = '/api'

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus()
    fetchTimeslots()
    fetchBookings()
  }, [])

  // Fetch availability when date changes
  useEffect(() => {
    if (selectedDate) {
      checkAvailability(selectedDate)
    }
  }, [selectedDate])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/check`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
  }

  const handleLogin = async () => {
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setAuthError('Please enter both username and password')
      return
    }

    setIsLoading(true)
    setAuthError('')

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword
        }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setLoginUsername('')
        setLoginPassword('')
        fetchTimeslots() // Refresh data after login
      } else {
        const error = await response.json()
        setAuthError(error.error || 'Login failed')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setAuthError('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const fetchTimeslots = async () => {
    try {
      const endpoint = isAuthenticated ? `${API_BASE}/admin/timeslots` : `${API_BASE}/timeslots`
      const response = await fetch(endpoint, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setTimeslots(data)
      }
    } catch (error) {
      console.error('Error fetching timeslots:', error)
    }
  }

  const fetchBookings = async () => {
    try {
      const endpoint = isAuthenticated ? `${API_BASE}/admin/bookings` : `${API_BASE}/bookings`
      const response = await fetch(endpoint, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const checkAvailability = async (date) => {
    try {
      const response = await fetch(`${API_BASE}/bookings/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visit_date: date }),
      })
      if (response.ok) {
        const data = await response.json()
        setAvailability(data)
      }
    } catch (error) {
      console.error('Error checking availability:', error)
    }
  }

  // Handle booking submission
  const handleBooking = async () => {
    if (selectedDate && selectedTimeslotId && visitorName.trim()) {
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visitor_name: visitorName,
            visit_date: selectedDate,
            timeslot_id: parseInt(selectedTimeslotId)
          }),
        })

        if (response.ok) {
          const booking = await response.json()
          alert(`Booking confirmed for ${visitorName} on ${selectedDate}`)
          setSelectedDate('')
          setSelectedTimeslotId('')
          setVisitorName('')
          fetchBookings()
          if (selectedDate) {
            checkAvailability(selectedDate)
          }
        } else {
          const error = await response.json()
          alert(error.error || 'Booking failed')
        }
      } catch (error) {
        console.error('Error creating booking:', error)
        alert('Booking failed')
      }
    } else {
      alert('Please fill in all fields to book a visit.')
    }
  }

  // Handle present marking
  const togglePresent = (id) => {
    setPresents(presents.map(present => 
      present.id === id ? { ...present, taken: !present.taken } : present
    ))
  }

  // Admin functions
  const addTimeslot = async () => {
    if (!newTimeslotTime.trim()) return

    try {
      const response = await fetch(`${API_BASE}/timeslots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ time: newTimeslotTime }),
      })

      if (response.ok) {
        setNewTimeslotTime('')
        fetchTimeslots()
        alert('Timeslot added successfully')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add timeslot')
      }
    } catch (error) {
      console.error('Error adding timeslot:', error)
      alert('Failed to add timeslot')
    }
  }

  const deleteTimeslot = async (timeslotId) => {
    if (!confirm('Are you sure you want to delete this timeslot?')) return

    try {
      const response = await fetch(`${API_BASE}/timeslots/${timeslotId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        fetchTimeslots()
        alert('Timeslot deleted successfully')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete timeslot')
      }
    } catch (error) {
      console.error('Error deleting timeslot:', error)
      alert('Failed to delete timeslot')
    }
  }

  const toggleTimeslotActive = async (timeslot) => {
    try {
      const response = await fetch(`${API_BASE}/timeslots/${timeslot.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ is_active: !timeslot.is_active }),
      })

      if (response.ok) {
        fetchTimeslots()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update timeslot')
      }
    } catch (error) {
      console.error('Error updating timeslot:', error)
      alert('Failed to update timeslot')
    }
  }

  // Login form component
  const LoginForm = () => (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="text-blue-500" />
          Admin Login
        </CardTitle>
        <CardDescription>
          Enter your credentials to access the admin panel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Enter password"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>
        {authError && (
          <div className="text-red-500 text-sm">{authError}</div>
        )}
        <Button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <div className="text-sm text-gray-600 text-center">
          Default credentials: admin / babyvisit2025
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div 
      className="min-h-screen p-4"
      style={{
        backgroundImage: 'url(/baby-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="min-h-screen bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 py-8">
            <h1 className="text-7xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-4 drop-shadow-lg">
              <Calendar className="text-pink-500 text-8xl" />
              Baby Visit Booking
            </h1>
            <p className="text-xl text-gray-700 font-medium drop-shadow-sm">Schedule your visit and see our gift registry</p>
          </div>

        <Tabs defaultValue="booking" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="booking">Booking & Gifts</TabsTrigger>
            <TabsTrigger value="admin">Admin Panel</TabsTrigger>
          </TabsList>

          <TabsContent value="booking" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="text-blue-500" />
                    Book Your Visit
                  </CardTitle>
                  <CardDescription>
                    Choose a date and time to visit our little one
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="visitor-name">Your Name</Label>
                    <Input
                      id="visitor-name"
                      type="text"
                      placeholder="Enter your name"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="visit-date">Visit Date</Label>
                    <Input
                      id="visit-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {availability.map((slot) => (
                        <Button
                          key={slot.timeslot.id}
                          variant={selectedTimeslotId === slot.timeslot.id.toString() ? "default" : "outline"}
                          disabled={!slot.is_available}
                          onClick={() => setSelectedTimeslotId(slot.timeslot.id.toString())}
                          className={`${!slot.is_available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {slot.timeslot.time}
                          {!slot.is_available && ' (Booked)'}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    disabled={!selectedDate || !selectedTimeslotId || !visitorName.trim()}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Book Visit
                  </Button>
                </CardContent>
              </Card>

              {/* Present List Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="text-green-500" />
                    Gift Registry
                  </CardTitle>
                  <CardDescription>
                    Click on items you'd like to bring (they'll be marked as taken)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {presents.map((present) => (
                      <div
                        key={present.id}
                        onClick={() => togglePresent(present.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          present.taken 
                            ? 'bg-gray-100 border-gray-300 line-through text-gray-500' 
                            : 'bg-white border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={present.taken ? 'line-through' : ''}>
                            {present.name}
                          </span>
                          <span className={`text-sm ${present.taken ? 'text-red-500' : 'text-green-500'}`}>
                            {present.taken ? 'Taken' : 'Available'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booked Visits Display */}
            {bookings.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Upcoming Visits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-2 bg-blue-50 rounded border">
                        {booking.visitor_name} - {booking.visit_date} at {booking.timeslot?.time}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="admin" className="space-y-8">
            {!isAuthenticated ? (
              <LoginForm />
            ) : (
              <>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="text-purple-500" />
                        Timeslot Management
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Add, edit, or remove available time slots
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add new timeslot */}
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={newTimeslotTime}
                        onChange={(e) => setNewTimeslotTime(e.target.value)}
                        placeholder="HH:MM"
                      />
                      <Button onClick={addTimeslot} className="bg-green-500 hover:bg-green-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Timeslot
                      </Button>
                    </div>

                    {/* Existing timeslots */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">Current Timeslots</h3>
                      {timeslots.map((timeslot) => (
                        <div key={timeslot.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${!timeslot.is_active ? 'text-gray-400 line-through' : ''}`}>
                              {timeslot.time}
                            </span>
                            <span className={`text-sm px-2 py-1 rounded ${
                              timeslot.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {timeslot.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleTimeslotActive(timeslot)}
                            >
                              {timeslot.is_active ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTimeslot(timeslot.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bookings Management */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>
                      View all scheduled visits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings yet</p>
                      ) : (
                        bookings.map((booking) => (
                          <div key={booking.id} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">{booking.visitor_name}</span>
                                <span className="text-gray-600 ml-2">
                                  {booking.visit_date} at {booking.timeslot?.time}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                Booked: {new Date(booking.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
  )
}

export default App

