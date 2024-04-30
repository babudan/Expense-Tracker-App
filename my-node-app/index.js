const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const Transactionmodel = require("./model/transaction");
const route = require('./route')
const app = express();

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB,
    { useNewUrlParser: true }).then(() => console.log('MongoDb is connected')).catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT, function () {
    console.log("Express app running on port" + process.env.PORT);
})