import React from 'react';
import './Bookings.css';
function Bookings() {
 
  function getCabs() {
    axios
      .get('http://localhost:5000/cabs')
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setCabs(data);
      })
      .catch((error) => {
        console.error('Error fetching cabs:', error);
      });
  }
  return (
    <div  className="booking-container">
      <h1>Booking History Of All Cabs</h1>
      <div className='Cabs'>    
      <button>Cab1</button>
      <button>Cab2</button>
      <button>Cab3</button>
      <button>Cab4</button>
      <button>Cab5</button>
      </div>
    <div className='Bookings'>
    

    </div>
    </div>
  );
}

export default Bookings;
