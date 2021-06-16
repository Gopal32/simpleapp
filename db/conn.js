const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false }).then(() =>{
    console.log('connection successful');
}).catch((err) => {
    console.log("Database connection failed.");
});
