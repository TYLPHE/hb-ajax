'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
  .then((response) => response.text())
  .then((fortune) => {
    document.querySelector('#fortune-text').innerHTML = fortune;
  });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;

  fetch(url)
    .then((response) => response.json())
    .then((weatherInfo) => {
      const forecast = weatherInfo.forecast;
      document.querySelector('#weather-info').textContent = forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    const code = responseJson.code;
    const msg = responseJson.msg;

    const statusText = document.querySelector('#order-status');
    statusText.textContent = msg;

    if (code === 'ERROR') {
      statusText.classList.add('order-error');
    } else {
      statusText.classList.remove('order-error');
    }
  })
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

function getDogPic(evt) {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(dogData => {
      const photoUrl = dogData.message;
      document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<img src='${photoUrl}'></img>`);
    })
}

document.querySelector('#get-dog-image').addEventListener('click', getDogPic);

