const msges = require('./msg-model')
const ReadPreference = require('mongodb').ReadPreference
require('./mongo').connect();
function get(req,res,roomId){
    const docquery = msges.find({roomId:"ccceb7f3-080e-4f69-9ce1-bc4cf4aa3354"}).read(ReadPreference.NEAREST)

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