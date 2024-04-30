const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const Transactionmodel = require("./model/transaction");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB,
    { useNewUrlParser: true }).then(() => console.log('MongoDb is connected')).catch(err => console.log(err))


app.get("/", (req, res) => {
    res.json({ body: "api is wroking" })
})

app.get("/api/test", (req, res) => {
    res.json({ body: "test ok1111" })
})

app.post("/api/transaction", async (req, res) => {
    const { name, datetime, description, price } = req.body;
    const transaction = await Transactionmodel.create({ name, datetime, description, price });
    // console.log(transaction);
    res.json(transaction);
})

app.get("/api/transactions", async (req, res) => {
    const findtransactions = await Transactionmodel.find();
    // console.log(findtransactions);
    res.json(findtransactions);
})
app.listen(process.env.PORT, function () {
    console.log("Express app running on port" + process.env.PORT);
})