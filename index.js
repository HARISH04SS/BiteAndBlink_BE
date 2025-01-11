const mongoose = require('mongoose');
const {mongodb_URL} = require('./utils/config');
mongoose.connect(mongodb_URL)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
