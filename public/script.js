const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  key:'peerjs',
  host: 'debo-peerjs.herokuapp.com',
  port: '',
  secure:true,
  debug: 3, config: {'iceServers':[
    //{"username":"QDH2xyHSMvT0UedE-MePIPjlEkRmXVRzCtoC6wdg5nNe6P_tC1q8IDvz7f8XcmCVAAAAAGDRkclzb21lb25lNDA0","urls":["stun:bn-turn1.xirsys.com","turn:bn-turn1.xirsys.com:80?transport=udp","turn:bn-turn1.xirsys.com:3478?transport=udp","turn:bn-turn1.xirsys.com:80?transport=tcp","turn:bn-turn1.xirsys.com:3478?transport=tcp","turns:bn-turn1.xirsys.com:443?transport=tcp","turns:bn-turn1.xirsys.com:5349?transport=tcp"],"credential":"d7a15dec-d32b-11eb-b581-0242ac140004"},
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'kXyzNqUpQqER3y!',
      username: 'debojeetjha@gmail.com'
  },
    { url: 'stun:stun.l.google.com:19302' }
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
  // input value
  let text = $("#chat-message");
  // when press enter send message
  $('html').keydown(function (e) {
    if (e.which == 13 && text.val().length !== 0) {
      socket.emit('message', text.val());
      text.val('')
    }
  });
  socket.on("ShowMessage", message => {
    $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
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
  var chatWindow = $('.main-chat-window');
  chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
}


const muteUnmute = () => {
  const state = MyVideoStream.getAudioTracks()[0].enabled;
  if (state) {
    MyVideoStream.getAudioTracks()[0].enabled = false;
    document.getElementById('mute-button').innerHTML = 'unmute'
    //setUnmuteButton();
  } else {
    //setMuteButton();
    document.getElementById('mute-button').innerHTML = 'mute'
    MyVideoStream.getAudioTracks()[0].enabled = true;
  }
}
const playStop = () => {
  var state = MyVideoStream.getVideoTracks()[0].enabled;
  if (state) {
    MyVideoStream.getVideoTracks()[0].enabled = false;
    document.getElementById('video-on-off-button').innerHTML = 'video off'
  } else {

    document.getElementById('video-on-off-button').innerHTML = 'video on'

    MyVideoStream.getVideoTracks()[0].enabled = true;
  }
}
document.getElementById('mute-button').onclick = muteUnmute;
document.getElementById('video-on-off-button').onclick = playStop;

const handleCalenderDisplay = ()=>{
  if(document.getElementById('google-calender').style.display == 'none'){
    document.getElementById('google-calender').style.display = 'block';
  }
  else{
  document.getElementById('google-calender').style.display = 'none'
  }
  console.log(document.getElementById('google-calender').style.display)
}
document.getElementById('google-calender').style.display = 'none'
document.getElementById('calender-img-container').onclick = handleCalenderDisplay;