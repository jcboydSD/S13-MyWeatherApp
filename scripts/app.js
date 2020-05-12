// handles
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// function to update ui
const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;
  // update day/night image with ternary operator
  let timeSrc = weather.IsDayTime ? 'img/day.webp' : 'img/night.webp';
  time.setAttribute('src', timeSrc);
  // set icon image variable
  const iconSrc = `img/weatherIcons/${weather.WeatherIcon}.png`;
  // update details template including icon image
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="icon mx-auto text-center">
      <img src="${iconSrc}">
    </div>
    <div class="temperature my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F = </span>
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `;
  // remove d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

// function to use city name to get city weather
const updateCity = async (city) => {
  console.log(city);  //del
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  // object shorthand notation (same field name and variable name)
  return { cityDets, weather };
};

// get city name upon submit and call function
cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  // get city name (value)
  const city = cityForm.city.value.trim();
  cityForm.reset();
  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
