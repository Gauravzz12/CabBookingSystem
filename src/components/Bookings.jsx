import React from 'react';

function Bookings() {
  const cabs = [
    { name: 'Cab 1', bookings: ['Booking 1', 'Booking 2', 'Booking 3'] },
    { name: 'Cab 2', bookings: ['Booking 4', 'Booking 5', 'Booking 6'] },
    { name: 'Cab 3', bookings: ['Booking 7', 'Booking 8', 'Booking 9'] },
    { name: 'Cab 4', bookings: ['Booking 10', 'Booking 11', 'Booking 12'] },
    { name: 'Cab 5', bookings: ['Booking 13', 'Booking 14', 'Booking 15'] },
  ];
  
  return (
    <div>
      {cabs.map((cab) => (
        <div key={cab.name}>
          <h2>{cab.name}</h2>
          <div>
            {cab.bookings.map((booking) => (
              <div key={booking}>{booking}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookings;
