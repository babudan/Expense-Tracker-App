const express = require('express')
const route = express.Router()
const Transactionmodel = require("../model/transaction");

route.get("/", (req, res) => {
    res.json({ body: "test ok1111" })
})

route.post("/api/transaction", async (req, res) => {
    const { name, datetime, description, price } = req.body;
    const transaction = await Transactionmodel.create({ name, datetime, description, price });
    // console.log(transaction);
    res.json(transaction);
})

route.get("/api/transactions", async (req, res) => {
    const findtransactions = await Transactionmodel.find();
    // console.log(findtransactions);
    res.json(findtransactions);
})

module.exports = route