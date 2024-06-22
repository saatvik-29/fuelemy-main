const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const multer = require('multer');
const router = express.Router();
const auth = require('../middleware/auth');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtToken,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, message: 'User registered successfully' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtToken,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, message: 'User logged in successfully' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/vehicles', auth, upload.single('rcImage'), async (req, res) => {
  const { name, number, category, model, fuelTankCapacity } = req.body;
  const rcImage = req.file ? req.file.buffer.toString('base64') : null;
  const rcImageType = req.file ? req.file.mimetype : null;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newVehicle = {
      name,
      number,
      category,
      model,
      fuelTankCapacity,
      rcImage,
      rcImageType,
    };

    user.vehicles.push(newVehicle);
    await user.save();

    res.status(200).json(user.vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get all vehicles for a user
router.get('/vehicles', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json(user.vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/drivers', auth, upload.single('rcImage'), async (req, res) => {
  const { name, phoneNumber, email, vehicleAssigned } = req.body;
  const rcImage = req.file ? req.file.buffer.toString('base64') : null;
  const rcImageType = req.file ? req.file.mimetype : null;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newDriver = {
      name,
      phoneNumber,
      email,
      vehicleAssigned,
      rcImage,
      rcImageType,
    };

    user.drivers.push(newDriver);
    await user.save();

    res.status(200).json(user.drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all drivers for a user
router.get('/drivers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json(user.drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
