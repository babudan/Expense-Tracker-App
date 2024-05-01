const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const route = require('./route/route')
const app = express();

app.use(cors(
    {
        origin: ["https://expense-tracker-app-frontend-five.vercel.app", "https://expense-tracker-app-frontend-1swru4006-babudans-projects.vercel.app"],
        methods: ['GET', 'POST'],
        credentials: true
    }
));
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB,
    { useNewUrlParser: true }).then(() => console.log('MongoDb is connected')).catch(err => console.log(err))


app.use('/', route);

//----------handling wrong api edge case--------------------------------------------
app.use((req, res, next) => {
    res.status(404).send({ status: false, error: "path not found" });
})

app.listen(process.env.PORT, function () {
    console.log("Express app running on port" + process.env.PORT);
})
