
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from './Authentication';
import { eventsData } from './data';
import EventDetails from './EventDetails';
import './App.css';

function EventBookingSystem() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  useEffect(() => {
    setTimeout(() => {
      setEvents(eventsData);
      setLoading(false);
    }, 1000);
  }, []);

  
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      (!category || event.category === category) &&
      (!search || event.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [events, category, search]);

  const handleBook = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId && event.availableSeats > 0
          ? { ...event, availableSeats: event.availableSeats - 1 }
          : event
      )
    );
  };
  
  

  return (
    <div className="container">
      <h1>Event Booking System</h1>

      {!user ? (
        <div class="login-form">
          <h2>Login to book events</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => !login(username, password) && alert('Invalid credentials')}>
            Login
          </button>
          
        </div>
      ) : (
        <div>
          <button onClick={logout} className="logout-btn" >Logout</button>
          <p>Welcome, {user.username}</p>

          
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="">All Categories</option>
            <option value="Business">Business</option>
            <option value="Creative">Creative</option>
            <option value="Fitness">Fitness</option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
          </select>

          
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          
          {filteredEvents.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Available Seats</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.category}</td>
                    <td>{event.date}</td>
                    <td>{event.availableSeats}</td>
                    <td>₹{event.price}</td>
                    <td>
                      <button onClick={() => setSelectedEvent(event)}>View Details</button></td>
                    <td><button
                        onClick={() => handleBook(event.id)}
                        disabled={event.availableSeats === 0}
                      >
                        {event.availableSeats > 0 ? 'Book Ticket' : 'Fully Booked'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No events found</p>
          )}

          
          {selectedEvent && (
            <div className="event-details">
              <EventDetails event={selectedEvent} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventBookingSystem;
