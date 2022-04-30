const express = require("express");
const mongoose = require('mongoose');
var cors = require("cors");


const Coupons = require('./modals/coupon');
var apiRouter = require("./routes/api");

require("dotenv").config();
var MONGODB_URL = process.env.MONGODB_URL;

var app = express();

var port = process.env.PORT || 3334;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => {
        console.error("Unable to connect to the Database:\n", err.message);
        process.exit(1);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cors());


app.get('/', (req, res) => {
    res.send('Works <br/> <a href="/p"> party </a>')
})
app.get('/p', (req,res) => {
    res.sendFile(__dirname+'/public/jparty.html');
})
app.use("/api/", apiRouter);



// throw 404 if URL not found
app.all("*", (req, res) => {
    return res.status(404).json({ "message": "Url not found." });
});


app.listen(port, () => {
    console.log(`Server is listening on Port:${port}`)
});