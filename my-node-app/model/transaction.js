const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({

    name: {type: String,required: true},
    price : {type : Number ,requuired : true},
    datetime: { type: Date, required: true },
    description: { type: String, required: true}
},
    { timestamps: true }
)

module.exports = mongoose.model("transaction",TransactionSchema)