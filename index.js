const mongoose = require('mongoose');
const {mongodb_URL} = require('./utils/config');
const app = require('./app');
mongoose.connect(mongodb_URL)
.then(() => {
    console.log('Connected to MongoDB...');
    app.listen(3001, () => {
        console.log('Server is running on port 3001 at http://localhost:3001');
    });
})
.catch(err => console.error('Could not connect to MongoDB...', err));
