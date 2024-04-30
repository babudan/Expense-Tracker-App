const express = require('express')

const app = express.Router()

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

module.exports = app