const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();


dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());

app.use(require('./routes/user'));
app.use(require('./routes/post'));

//server Port

const Port = process.env.Port;

app.listen(Port, () =>{
    console.log(`server is running at port ${Port}`)
})