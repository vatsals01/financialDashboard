require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cors());
const mongo_url = process.env.MONGO_URI;
mongoose.connect(mongo_url);
const secret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server is running");
})