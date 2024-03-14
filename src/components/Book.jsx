import React, { useState } from "react";
import axios from "axios";
import "./Book.css";
import Logo from "../assets/Logo.jpg";

function Book() {
  const [cabs, setCabs] = useState([]);

 

  function findShortestDistance(locations, src, dest) {
    const distances = {};
    const visited = {};
    locations.forEach((location) => {
      distances[location.name] = Infinity;
      visited[location.name] = false;
    });

    distances[src] = 0;

    for (let i = 0; i < locations.length - 1; i++) {
      let minDist = Infinity;
      let minIndex = -1;
      Object.keys(distances).forEach((location) => {
        if (!visited[location] && distances[location] <= minDist) {
          minDist = distances[location];
          minIndex = location;
        }
      });

      visited[minIndex] = true;

      const connections = locations.find((loc) => loc.name === minIndex)
        .connections;
      connections.forEach((connection) => {
        const adjLocation = connection.to;
        const weight = connection.time;
        if (
          !visited[adjLocation] &&
          distances[minIndex] !== Infinity &&
          distances[minIndex] + weight < distances[adjLocation]
        ) {
          distances[adjLocation] = distances[minIndex] + weight;
        }
      });
    }

    return distances[dest];
  }

  const showcabs = (e) => {
    getlocation();
    e.preventDefault();
  };

  function getCabs(shortestDistance) {
    axios.get("http://localhost:5000/cabs")
      .then((res) => res.data)
      .then((data) => {
        console.log(shortestDistance);
        if (shortestDistance !== null) {
          const updatedCabData = data[0].cabs.map((cab) => ({ 
            cab: cab.cabId,
            fare: cab.price * shortestDistance,
          }));
          setCabs(updatedCabData);
          console.log(updatedCabData);
        }
      })
      .catch((error) => {
        console.error("Error fetching cabs:", error);
      });
  }
  

 function getlocation() {
  axios.get("http://localhost:5000/location")
    .then((res) => res.data)
    .then((data) => {
      const pickupLocation = document.getElementById("pickup").value;
      const dropoffLocation = document.getElementById("dropoff").value;
      if(pickupLocation === dropoffLocation) {
        alert('Pickup and Dropoff locations cannot be same');
      } 
      else{
      const distance = findShortestDistance(data[0].locations, pickupLocation, dropoffLocation);
      console.log("Shortest distance:", distance);
      getCabs(distance);
      }
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
    });
}


  return (
    <div>
      <h1>Book a CAB</h1>
      <div className="container">
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="pickup">Pickup Location:</label>
          <select id="pickup" name="pickup" required defaultValue="">
            <option value="" disabled hidden>
              Pickup
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
          <label htmlFor="dropoff">Drop-off Location:</label>
          <select id="dropoff" name="dropoff" required defaultValue="">
            <option value="" disabled hidden>
              Drop-off
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
          <button type="button" onClick={showcabs}>
            Book Now
          </button>
        </form>

        <div className="image-container">
          <img src={Logo} alt="Logo" />
        </div>
      </div>

      <div className="Bookings">
        {cabs.map((data, index) => (
          <div key={index}>
            <p>
              {data.cab} - Fare: {data.fare} - <button>Book</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Book;
