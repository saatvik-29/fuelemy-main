const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { config } = require('dotenv');

config();
const app = express();

connectDB();

app.use(cors());
app.use(cors({
  origin: ["https://deploy-mern-1whq.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/v1/user', require('./routes/auth'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
