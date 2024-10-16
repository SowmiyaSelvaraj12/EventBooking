import React from 'react';
import { AuthProvider } from './Authentication';
import EventBookingSystem from './EventBookingSystem';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <EventBookingSystem />
    </AuthProvider>
  );
}

export default App;
