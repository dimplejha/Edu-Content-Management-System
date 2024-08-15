const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');
const searchRoutes = require('./routes/search.routes');

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
