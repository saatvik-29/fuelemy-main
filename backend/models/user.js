const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  vehicleAssigned: String,
  rcImage: String, // Base64 string for the image
  rcImageType: String, // MIME type for the image
});

const VehicleSchema = new mongoose.Schema({
  name: String,
  number: String,
  category: String,
  model: String,
  fuelTankCapacity: String,
  rcImage: String, // Base64 string for the image
  rcImageType: String, // MIME type for the image
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  vehicles: [VehicleSchema], // Array of vehicles
  drivers: [DriverSchema], // Array of drivers
});

module.exports = mongoose.model('User', UserSchema);
