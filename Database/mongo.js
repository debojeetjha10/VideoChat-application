const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const env = require('./env')
const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.mongo.cosmos.azure.com:10255/?ssl=true`

function connect(){
    return mongoose.connect(mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true });

}
module.exports = {
    connect,
    mongoose
}