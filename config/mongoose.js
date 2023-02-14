const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.Connection;

db.on('error',console.error.bind(console,"Error connecting the MongoDB"));

db.once('open',function(){
   console.log('Connecting to Database :: MongoDB');
});

module.exports = db;