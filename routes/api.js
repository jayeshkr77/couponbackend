const express = require('express');
const couponRouter = require('./coupon');

const app = express();

app.use('/coupon/',couponRouter)

module.exports = app;