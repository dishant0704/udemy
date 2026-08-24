const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
    flightNumber: { type:Number, require: true},
    mission: { type:Number, String: true},
    rocket: { type:Number, String: true},
    launchDate: { type:Date, String: true},
    target: { type:String, String: true},
    customers: { type:[String], String: true},
    upcoming: { type:Boolean, String: true},
    success: { type:Boolean, String: true, default: true},
})

//Connect launchesSchema with the "Loanches" Collection
module.exports = mongoose.model('launch', launchesSchema)