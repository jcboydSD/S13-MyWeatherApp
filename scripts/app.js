// handles
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

// function to update ui
const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;
  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `;
  // update icon image
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  // update day/night image with ternary operator
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);
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
