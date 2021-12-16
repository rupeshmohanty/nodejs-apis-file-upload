const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');
const cors = require('cors');
const upload = require('express-fileupload');

// get the uri for db connection!
const uri = require('./config');

// set up the express app!
const app = express();

// upload!
app.use(upload());

// connect to mongodb!
mongoose.connect(uri,() => {
    console.log('Connected to mongo db!');
})

// middleware!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes!
app.use('/api',routes);

// listen at 5000!
app.listen(process.env.port || 5000,() => {
    console.log('Running at port 4000');
})