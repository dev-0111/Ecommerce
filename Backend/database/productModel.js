const express = require('express')
const mongoose  = require('mongoose')

const app = express();

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category: String,
    userId: String,
    company: String


});

const product = mongoose.model('product',productSchema);

module.exports = product