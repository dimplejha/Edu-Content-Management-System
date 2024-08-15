require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');
const searchRoutes = require('./routes/search.routes');
const sequelize = require('./models/index');  // Sequelize instance

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api', searchRoutes);


sequelize.sync({ force: true })
    .then(() => {
        console.log('Database connected and synchronized successfully.');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to EduNodeCMS API!');
});

// Export the app instance for testing
module.exports = app;
