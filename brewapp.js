//require('dotenv').config()

//geo-location of user
document.querySelector('#button').addEventListener('click',geoFindMe);
function geoFindMe(){
   //we don't really need this to display on webpage or anything between line 7 and 19
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#mapLink');
    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.gps-coordinates.net/`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
//send location in fetch to brew
//data should have brew in areay of user
