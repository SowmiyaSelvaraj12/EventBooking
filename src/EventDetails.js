
import React from 'react';

const EventDetails = ({ event }) => {
  return (
    <div>
      <h2>Event Details</h2>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Category: {event.category}</p>
      <p>Date: {event.date}</p>
      <p>Seats Available: {event.availableSeats}</p>
      <p>Price: ${event.price}</p>
    </div>
  );
};

export default EventDetails;
