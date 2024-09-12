require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRouter=require('./routes/userRoute');

// Use a default port if SERVER_PORT is not set
const port = process.env.SERVER_PORT || 3001;
app.use('/api',userRouter);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/krushna', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server Listening on port: ${port}`);
});
