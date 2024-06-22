import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function Driver() {
  const [expanded, setExpanded] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    vehicleAssigned: "",
    rcImage: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]); // State for vehicles

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/user/drivers', {
          headers: {
            'x-auth-token': localStorage.getItem('token'), // Ensure the token is included
          },
        });
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers', error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/user/vehicles', {
          headers: {
            'x-auth-token': localStorage.getItem('token'), // Ensure the token is included
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchDrivers();
    fetchVehicles();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver((prevDriver) => ({ ...prevDriver, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewDriver((prevDriver) => ({
      ...prevDriver,
      rcImage: file,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicleAssigned.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', newDriver.name);
    formData.append('phoneNumber', newDriver.phoneNumber);
    formData.append('email', newDriver.email);
    formData.append('vehicleAssigned', newDriver.vehicleAssigned);
    formData.append('rcImage', newDriver.rcImage);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        // Handle the case where no token is available, maybe redirect to login
        return;
      }

      await axios.post('http://localhost:3001/api/v1/user/drivers', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowPopup(false);
      const response = await axios.get('http://localhost:3001/api/v1/user/drivers', {
        headers: {
          'x-auth-token': token,
        },
      });
      setDrivers(response.data);
    } catch (error) {
      console.error('Error adding driver', error);
    }
  };

  return (
    <div className="p-10 relative w-screen h-full">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      <div className="flex flex-col justify-start md:max-w-xs">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 bg-[#414141] rounded w-full pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-white" />
        </div>
        <button
          onClick={() => setShowPopup(true)}
          className="mb-4 bg-white text-black rounded float-right self-end px-3 py-2 tracking-wide text-xs font-medium"
        >
          + Add Driver
        </button>
        <div className="clear-both"></div>
      </div>

      <div className="overflow-y-auto mb-6">
        {filteredDrivers.map((driver) => (
          <div
            key={driver._id}
            className="mb-4 bg-[#414141] rounded-2xl w-full md:w-[90%] text-white"
          >
            <div
              className="p-3 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(driver._id)}
            >
              <span className="md:text-xl md:font-semibold">{`${driver.name} - (${driver._id})`}</span>
              <span>{expanded[driver._id] ? "^" : "⌄"}</span>
            </div>
            {expanded[driver._id] && (
              <div className="p-3 md:flex justify-between px-4 py-4">
                <div className="flex flex-col md:gap-4 md:mt-2">
                  <p>
                    <strong>Phone Number:</strong> {driver.phoneNumber}
                  </p>
                  <p>
                    <strong>Email ID:</strong> {driver.email}
                  </p>
                  <p>
                    <strong>Vehicle Assigned:</strong> {driver.vehicleAssigned}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:flex flex-col-reverse gap-2">
                  <p>
                    <strong>Driver Photo</strong>
                  </p>
                  <div className="border border-gray-300 w-48 h-32 flex items-center justify-center">
                    <img
                      src={`data:${driver.rcImageType};base64,${driver.rcImage}`}
                      alt="RC"
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-40 overflow-y-auto">
          <div className="bg-black text-white p-8 rounded-lg w-11/12 max-w-md mx-auto relative max-h-full overflow-y-auto">
            <button
              onClick={() => setShowPopup(false)}
              className="mb-4 p-2 bg-black text-white"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Driver</h2>
            <div className="mb-4">
              <label className="block mb-2">Driver Name</label>
              <input
                type="text"
                name="name"
                value={newDriver.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={newDriver.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email ID</label>
              <input
                type="email"
                name="email"
                value={newDriver.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Assigned</label>
              <select
                name="vehicleAssigned"
                value={newDriver.vehicleAssigned}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              >
                <option value="">Select a Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle.name}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle RC</label>
              <div className="w-full h-32 flex items-center justify-center bg-stone-700 rounded">
                {newDriver.rcImage ? (
                  <img
                    src={URL.createObjectURL(newDriver.rcImage)}
                    alt="RC"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full h-full opacity-0 absolute cursor-pointer"
                    />
                    <span className="text-gray-500">&#8593;</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 p-2 bg-white text-black rounded w-full my-10"
            >
              Add Driver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
