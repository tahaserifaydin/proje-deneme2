require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tatilim', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes will be added here
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const favoriteRoutes = require('./routes/favorites');
const campaignRoutes = require('./routes/campaigns');
const cursorAIRoutes = require('./routes/cursorAI');

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/cursor-ai', cursorAIRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
