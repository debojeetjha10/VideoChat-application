
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