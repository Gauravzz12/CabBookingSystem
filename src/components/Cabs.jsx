import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cabs.css';

function Cabs() {
  const [cabs, setCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [updatedCabData, setUpdatedCabData] = useState({
    cabId: '',
    price: 0,
    currentPosition: '',
    isBooked: false
  });

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
  

  const handleUpdate = (cab) => {
    setSelectedCab(cab);
    console.log(cab);
    setUpdatedCabData(cab); 
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setUpdatedCabData({ ...updatedCabData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected cab ID:", selectedCab._id); 
    console.log(updatedCabData);
    axios
      .put(`http://localhost:5000/cabs/update/${selectedCab._id}`, updatedCabData)
      .then((res) => {
        console.log('Cab updated successfully');
        setSelectedCab(null);
        getCabs();
      })
      .catch((error) => {
        console.error('Error updating cab:', error);
      });
  };
  
  

  const handleCloseModal = () => {
    setSelectedCab(null);
  };
  useEffect(() => {
    getCabs();
  }, []);

  return (
    <div className="cab-container">
      
      {cabs.map((cab, index) => (
        <div key={index} className="card">
          <h2>{cab.cabId.toUpperCase()}</h2>
          <p>Price: {cab.price}</p>
          <p>Position: {cab.currentPosition}</p>
          <p>Status: {cab.isBooked ? 'Booked' : 'Available'}</p>
          <button onClick={() => handleUpdate(cab)}>Update</button>
        </div>
      ))}
      {selectedCab && (
        <div className="modal-container">
          <div className="modal">
            
            <h2>Update Cab</h2>
            <form >
            <button className="close-btn" onClick={handleCloseModal}>X</button>
              <label>Cab ID:</label>
              <input
                type="text"
                name="cabId"
                value={updatedCabData.cabId}
                onChange={handleInputChange}
                required
              />
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={updatedCabData.price}
                onChange={handleInputChange}
                required
              />
              <label>Position</label>
              <input
                type="text"
                name="currentPosition"
                value={updatedCabData.currentPosition}
                onChange={handleInputChange}
                required  
              />
          
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cabs;
