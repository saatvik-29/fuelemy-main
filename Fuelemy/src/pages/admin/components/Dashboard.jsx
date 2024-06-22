import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const vehiclesResponse = await axios.get('http://localhost:3001/api/v1/user/vehicles', {
          headers: {
            'x-auth-token': token,
          },
        });

        const driversResponse = await axios.get('http://localhost:3001/api/v1/user/drivers', {
          headers: {
            'x-auth-token': token,
          },
        });

        setVehicles(vehiclesResponse.data);
        setDrivers(driversResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  // Calculate the number of assigned vehicles
  const assignedVehicles = drivers.filter(driver => driver.vehicleAssigned).length;

  return (
    <div className="flex flex-col items-center justify-center mx-auto py-8 w-screen overflow-y-auto mb-6">
      <div className="mt-1 text-2xl font-bold">Admin Dashboard</div>
      
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <div className="bg-gray-300 bg-opacity-20 p-4 rounded-lg flex-1 min-w-[45%] max-w-[45%]">
          <div className="font-satoshi text-lg font-bold text-left">Vehicles On Road</div>
          <div>{vehicles.length}</div>
          
        </div>
        <div className="bg-gray-300 bg-opacity-20 p-4 rounded-lg flex-1 min-w-[45%] max-w-[45%]">
          <div className="font-satoshi text-lg font-bold text-left">Driver/Payer Active</div>
          <div>{assignedVehicles}</div>
          
        </div>
        <div className="bg-gray-300 bg-opacity-20 p-4 rounded-lg flex-1 min-w-[45%] max-w-[45%]">
          <div className="font-satoshi text-lg font-bold text-left">Total Balance Left</div>
          <div>50,000</div>
        </div>
        <div className="bg-gray-300 bg-opacity-20 p-4 rounded-lg flex-1 min-w-[45%] max-w-[45%]">
          <div className="font-satoshi text-lg font-bold text-left">Alerts</div>
          <div>5</div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-300 bg-opacity-20 p-8 rounded-lg">
        <div className="font-satoshi text-lg font-bold text-left">Map</div>
        <img src="/map.png" alt="Map" className="h-auto rounded-lg" />
      </div>
    </div>
  );
}
