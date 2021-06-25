const muteUnmute = () => {
    const state = MyVideoStream.getAudioTracks()[0].enabled;
    if (state) {
      MyVideoStream.getAudioTracks()[0].enabled = false;
      document.getElementById('mute-button').src  = 'logos/unmute.png'
    } else {
      document.getElementById('mute-button').src = 'logos/mute.png'
      MyVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  const playStop = () => {
    var state = MyVideoStream.getVideoTracks()[0].enabled;
    if (state) {
      MyVideoStream.getVideoTracks()[0].enabled = false;
      document.getElementById('video-on-off-button').src = 'logos/video-off.png'
    } else {
  
      document.getElementById('video-on-off-button').src = 'logos/video-on.png'
  
      MyVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  document.getElementById('mute-button').onclick = muteUnmute;
  document.getElementById('video-on-off-button').onclick = playStop;
  