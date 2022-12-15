'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags?.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name?.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${Math.round(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${Object.keys(
                data.languages
              )}</p>
              <p class="country__row"><span>💰</span>${Object.keys(
                data.currencies
              )}</p>
            </div>
        </article>
        `
  countriesContainer.insertAdjacentHTML('beforeend', html)
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg)
}

///////////////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest()
//   request.open('Get', `https://restcountries.com/v3.1/name/${country}`)
//   request.send()
//   // console.log((request.responseText));   // This will Not work

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText) // JSON To JS Object
//     console.log(data)

//     const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${Math.round(+data.population / 1000000).toFixed(1)}M people</p>
//           <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
//           <p class="country__row"><span>💰</span>${data.currencies.INR.name}</p>
//         </div>
//     </article>
//     `
//     countriesContainer.insertAdjacentHTML('beforeend', html)
//     countriesContainer.style.opacity = 1
//   })
// }
// getCountryData('india');

// const getCountryAndNeighbour = function (country) {
//     // AJAX call country 1
//   const request = new XMLHttpRequest()
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   request.send()

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText) // JSON To JS Object
//     console.log(data);

//     // Render Country
//     renderCountry(data);

//     // Get Neighbour Country
//     const neighbour = data.borders?.[0]
//     console.log(neighbour);

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function() {
//         const [data2] = JSON.parse(this.responseText);
//         console.log(data2);
//         renderCountry(data2, 'neighbour');
//     })
//   })
// }
// getCountryAndNeighbour('usa')

////////////////////////////////////////////////////////////////////
// Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function(response) {
//       console.log(response)
//       return response.json()     // .json() Method is Async. It return a Promise.
//     })
//     .then(function(data) {
//       renderCountry(data[0]);
//     })
// }

const getJSON = function (url, errorMsg = 'Something Went Wrong: ') {
  return fetch(url).then(response => {
    if (response.ok === false) {
      throw new Error(`${errorMsg} ${response.status}: Country not found`)
    } else {
      return response.json() // .json() Method is Async. It return a Promise.
    }
  })
}

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//         if (response.ok === false) {
//             throw new Error(`${response.status}: Country not found`);
//         } else {
//             return response.json();
//         }
//     })
//     .then(data => {
//       renderCountry(data[0])
//       const neighbour = data[0].borders?.[0]
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🎇🎇`)
//       renderError(`Something Went Wrong: ${err.message}`)
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// }

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data)
      renderCountry(data[0])
      const neighbour = data[0].borders?.[0]

      if (!neighbour) throw new Error(`No neighbour found!`)

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      )
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 🎇🎇`)
      renderError(`Something Went Wrong: ${err.message}`)
    })
    .finally(() => (countriesContainer.style.opacity = 1))
}

// btn.addEventListener('click', function () {
//   getCountryData('india')
// })

// getCountryData('qwehwd')
// getCountryData('australia')

//////////////////////////
// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.log(err))
// console.log('Getting Position');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

getPosition()
  .then(res => console.log(res))
  .catch();

const whereAmI = function () {
  getPosition().then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  }).then(response => {
      if (response.status === 403) {
        throw new Error(`Problem With geocoding (${response.status})`)
      } else {
        return response.json()
      }
    })
    .then(data => {
      console.log(data)
      console.log(`You are in ${data.region}, ${data.country}`)
      return fetch(`https://restcountries.com/v3.1/rest/v2/${data.country}`)
    })
    .then(response => {
      if (response === false) {
        throw new Error(`Country Not Found (${response.status})`)
      }
      return response.json()
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message} 🧨🎇`)
    })
    .finally(() => (countriesContainer.style.opacity = 1))
}

btn.addEventListener('click', whereAmI);