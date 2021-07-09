const msges = require('./msg-model')
const ReadPreference = require('mongodb').ReadPreference
require('./mongo').connect();
function get(req,res,ROOM_ID){
    const docquery = msges.find({roomId:ROOM_ID}).read(ReadPreference.NEAREST)

    docquery.exec().then(msges => res.json(msges)).catch((err)=>{
        res.status(500).send(err)
    })
}
function create(sender,msgContent,roomId){
const msg = new msges({sender,msgContent,roomId})

msg.save().then(()=>{
    return true;
}).catch((err) => {
    console.error(err)
})
}
module.exports = {
    get,create
}