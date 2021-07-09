const mongoose = require('mongoose')
const Schema = mongoose.Schema
const msgSchema = new Schema({
    sender : {type :String},
    msgContent: {type :String, required: true},
    roomId:{type :String, required: true}
});

const msges  = mongoose.model('msges',msgSchema)
module.exports = msges