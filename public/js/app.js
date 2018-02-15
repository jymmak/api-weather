$(document).ready(function () {
  btnIntro.on('click', Week);
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let wind = $('#wind');
  let humidity = $('#humidity');
  let uvIndex = $('#uvindex');
  let pressure = $('#pressure');
  let btnIntro = $('#intro')
  let imageWeather = $('.imageWeather');
  let temperature = $('.temperature');
  let weekLook = $('#week');
 
  function Week() {
    window.location.href = 'views/week.html';
  }


  const getWeather = (data) => {
    console.log(data);
    let today = data.currently;
    let icon = today.icon;
    imageWeather.attr('src', `assets/images/${icon}.png`);
    wind.text(today.windSpeed + 'm/s');
    humidity.text(today.humidity + '%');
    uvIndex.text(today.uvIndex);
    pressure.text(today.pressure + 'hPa');
    temperature.text(today.temperature + '°');

  }
  const week = data.daily.data;
  week.length = 7;
  week.forEach((value, index) => {
    let html = `<div class = "row">
    <div class="col-xs-2"></div>
  <div class="col-xs-10"><img class=".imageWeather" src="../assets/images/${value.icon}.png"></div>
  <div class="col-xs-2"></div>
  <div class="col-xs-3"><p>${days[index]}</p></div>
  <div class="col-xs-2"><p>MIN-${value.temperatureMin}°</p></div>
  <div class="col-xs-2"><p>MAX-${value.temperatureMax}°</p></div>
  </div>`;
    weekLook.append(html);
  });

  function searchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let myPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var apiLinkDS = `https://api.darksky.net/forecast/b69fecec7874a3097ec9c6795044d318/${myPosition.lat},${myPosition.lng}?units=si`;

        $.ajax({
          url: proxy + apiLinkDS,
          success: getWeather
        });
      });
    } else {
      console.log('Su navegador no soporta Geolocalización');
    }
  } 
});