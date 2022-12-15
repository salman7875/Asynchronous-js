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
          <p class="country__row"><span>👫</span>${Math.round(+data.population / 1000000).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${data.languages?.[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
        </div>
    </article>
    `
  containerCountries.insertAdjacentHTML('beforeend', html)
}

const getJSON = function(url, errorMsg = 'Something Went Wrong ') {
  return fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error(`${errorMsg}(${res.status})`)
    }
    return res.json() 
  })
}

const getCountryData = function(country) {
  getJSON(`https://restcountries.com/v2/name/${country}?fullText=true`, 'Country not found')
  .then(data => {
    renderCountry(data[0])
    console.log(data[0])
    const neighbour = data[0]?.borders[0];

    if (!neighbour) throw new Error(`No neighbour found!`);

    return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found')
  })
  .then(data => {
    renderCountry(data, 'neighbour');
    console.log(data);
  })
  .catch(err => console.error(err))
  .finally(() => containerCountries.style.opacity = 1)
}

btn.addEventListener('click', function() {
  getCountryData('australia');
})

getCountryData('germany');