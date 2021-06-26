const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  key:'peerjs',
  host: 'debo-peerjs.herokuapp.com',
  port: '',
  secure:true,
   config: {'iceServers':[
    { url: 'stun:stun.l.google.com:19302' },
    //{"username":"QDH2xyHSMvT0UedE-MePIPjlEkRmXVRzCtoC6wdg5nNe6P_tC1q8IDvz7f8XcmCVAAAAAGDRkclzb21lb25lNDA0","urls":["stun:bn-turn1.xirsys.com","turn:bn-turn1.xirsys.com:80?transport=udp","turn:bn-turn1.xirsys.com:3478?transport=udp","turn:bn-turn1.xirsys.com:80?transport=tcp","turn:bn-turn1.xirsys.com:3478?transport=tcp","turns:bn-turn1.xirsys.com:443?transport=tcp","turns:bn-turn1.xirsys.com:5349?transport=tcp"],"credential":"d7a15dec-d32b-11eb-b581-0242ac140004"},
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'kXyzNqUpQqER3y!',
      username: 'debojeetjha@gmail.com'
  }
  ]}});
const myVideo = document.createElement('video')
myVideo.muted = true
var MyVideoStream;
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  MyVideoStream = stream;
  addVideoStream(myVideo, stream)
  socket.emit('message','a new user-connected')
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
  socket.on("ShowMessage", message => {
    let Msg = document.createElement('li')
    Msg.className='message'
    Msg.innerHTML = `<b>${message.sender}</b><br/> ${message.msgContent}`
    document.getElementById("messages").appendChild(Msg);
    scrollToBottom()
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



function scrollToBottom(){
  let chatWindow = document.getElementById('main-chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight
}
let text = document.getElementById("chat-message");
// when press enter send message
document.onkeydown = (function (key) {
  if (key.which == 13 && text.value.length !== 0) {
    socket.emit('message',{
        msgContent: text.value,
        sender : MY_NAME
    } );
    text.value ='';
  }
});