const mongoose = require('mongoose');

const dbName = 'travelr';

//const uri  = `mongodb://127.0.0.1:27017/${dbName}`;
const uri  = `mongodb+srv://7aken:aLffW6wCs7HByLB@cluster0.otu3fel.mongodb.net/?retryWrites=true&w=majority`;

async function dbConnect() {
    await mongoose.connect(uri);
}

module.exports = dbConnect;