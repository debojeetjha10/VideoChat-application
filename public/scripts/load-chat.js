fetch('/api/chat/'+ROOM_ID).then(res => res.json()).then(
    data=>{
        data = JSON.parse(data)
        const n = data.length
        for(let i = 0;i<n;i++){
            let message = data[i]
            let Msg = document.createElement('li')
            Msg.className='message multiline'
            Msg.innerHTML = `<b>${message.sender}</b><br/> <p>${message.msgContent}</p>`
            document.getElementById("messages").appendChild(Msg);
        }
    }
)
