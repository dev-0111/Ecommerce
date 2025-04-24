const express = require('express')
const mongoose = require('mongoose')

const app = express();

const connectDB = async() => {
    mongoose.connect("")
}

connectDB()

if(connectDB)
{
    console.log("Database Connected Successfully")
}

else
{
    console.log("Error To connect DB")
}