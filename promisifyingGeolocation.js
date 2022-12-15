'use strict'

const containerCountries = document.querySelector('.countries')
const btn = document.querySelector('.btn-country');


const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Math.round(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages?.[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
          </div>
      </article>
      `
  containerCountries.insertAdjacentHTML('beforeend', html)
}

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => resolve(position) , err => reject(err));
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

getPosition().then(pos => console.log(pos))

const whereAmI = function () {
  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log(lat, lng);
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  }).then(response => {
      if (!response.ok) {
        throw new Error(`Problem With geocoding (${response.status})`)
      } else {
        return response.json()
      }
    })
    .then(data => {
      console.log(data)
      console.log(`You are in ${data.region}, ${data.country}`)
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })
    .then(response => {
      if (response === false) {
        throw new Error(`Country Not Found (${response.status})`)
      }
      return response.json()
    })
    .then(data => renderCountry(data))
    .catch(err => {
      console.error(`${err.message} 🧨🎇`)
    })
    .finally(() => (countriesContainer.style.opacity = 1))
}

btn.addEventListener('click', whereAmI)

