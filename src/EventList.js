
import React, { useState, useMemo } from 'react';
import { eventsData } from './data';

const EventsPerPage = 5;

const EventList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EventsPerPage;
    return eventsData.slice(startIndex, startIndex + EventsPerPage);
  }, [currentPage]);

  return (
    <div>
      {paginatedEvents.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === Math.ceil(eventsData.length / EventsPerPage)}>
        Next
      </button>
    </div>
  );
};

export default EventList;
