import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function Vehicle() {
  const [expanded, setExpanded] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    number: "",
    category: "",
    model: "",
    fuelTankCapacity: "",
    rcImage: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
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
    setNewVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewVehicle((prevVehicle) => ({
      ...prevVehicle,
      rcImage: file,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', newVehicle.name);
    formData.append('number', newVehicle.number);
    formData.append('category', newVehicle.category);
    formData.append('model', newVehicle.model);
    formData.append('fuelTankCapacity', newVehicle.fuelTankCapacity);
    formData.append('rcImage', newVehicle.rcImage);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        // Handle the case where no token is available, maybe redirect to login
        return;
      }

      await axios.post('http://localhost:3001/api/v1/user/vehicles', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowPopup(false);
      const response = await axios.get('http://localhost:3001/api/v1/user/vehicles', {
        headers: {
          'x-auth-token': token,
        },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error('Error adding vehicle', error);
    }
  };

  return (
    <div className="p-10 relative w-screen">
      <h1 className="text-2xl font-bold mb-4">Vehicle Dashboard</h1>
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
          + Add Vehicle
        </button>
        <div className="clear-both"></div>
      </div>

      <div className="overflow-y-auto mb-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="mb-4 bg-[#414141] rounded-2xl w-full md:w-[90%] text-white"
          >
            <div
              className="p-3 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(vehicle._id)}
            >
              <span className="md:text-xl md:font-semibold">{`${vehicle.name} - (${vehicle._id})`}</span>
              <span>{expanded[vehicle._id] ? "^" : "⌄"}</span>
            </div>
            {expanded[vehicle._id] && (
              <div className="p-3 md:flex justify-between px-4 py-4">
                <div className="flex flex-col md:gap-4 md:mt-2">
                  <p>
                    <strong>Vehicle Number:</strong> {vehicle.number}
                  </p>
                  <p>
                    <strong>Vehicle Category:</strong> {vehicle.category}
                  </p>
                  <p>
                    <strong>Vehicle Model:</strong> {vehicle.model}
                  </p>
                  <p>
                    <strong>Fuel Tank Capacity:</strong> {vehicle.fuelTankCapacity}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:flex flex-col-reverse gap-2">
                  <p>
                    <strong>Vehicle RC</strong>
                  </p>
                  <div className="border border-gray-300 w-48 h-32 flex items-center justify-center">
                    <img
                      src={`data:${vehicle.rcImageType};base64,${vehicle.rcImage}`}
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
            <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Name</label>
              <input
                type="text"
                name="name"
                value={newVehicle.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Number</label>
              <input
                type="text"
                name="number"
                value={newVehicle.number}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Category</label>
              <input
                type="text"
                name="category"
                value={newVehicle.category}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle Model</label>
              <input
                type="text"
                name="model"
                value={newVehicle.model}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Fuel Tank Capacity</label>
              <input
                type="number"
                name="fuelTankCapacity"
                value={newVehicle.fuelTankCapacity}
                onChange={handleInputChange}
                className="w-full p-2 bg-stone-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Vehicle RC</label>
              <div className="w-full h-32 flex items-center justify-center bg-stone-700 rounded">
                {newVehicle.rcImage ? (
                  <img
                    src={URL.createObjectURL(newVehicle.rcImage)}
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
              Add Vehicle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
