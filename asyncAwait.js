'use strict'

const btn = document.querySelector('.btn-country')
const container = document.querySelector('.countries')

const renderCountry = function (data) {
  const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${Math.round(
            +data.population / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${data.languages?.[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
        </div>
    </article>
    `
  container.insertAdjacentHTML('beforeend', html)
  container.style.opactiy = 1
}

const getJSON = function(url, errorMsg = 'Something went wrong') {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error(`${errorMsg} (${err.status})`)
        return res.json();
    })
}

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// Auth key:- 110144079768451e15832181x43336

const whereAmI = async function (country) {
  try {
    // Geo location
    const position = await getPosition()
    const { latitude: lat, longitude: lng } = position.coords

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=110144079768451e15832181x43336`)
    if(!resGeo.ok) throw new Error(`Problem getting location data!`)
    const dataGeo = await resGeo.json()

    // Country data
    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}?fullText=true`)
    if (!res.ok) throw new Error(`Country not found!`)
    const data = await res.json()
    renderCountry(data[0])

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err.message)

    // Reject promise returned from async function
    throw err;
  }
}

// btn.addEventListener('click', function () {
//   whereAmI()
// })

console.log('1. Will get location');
// const city = whereAmI();
// console.log(city);

/*
// Old Style using THEN METHOD 
whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3. Finished getting location'));
*/

// USING ASYNC AWAIT FUNCTION
(async function() {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
    } catch(err) {
        console.error(`2: ${err}`);
    } finally {
        console.log(`3: Finished getting location`);
    }
})();


/////////////////////////////
// Promise.all
// const get3Countries = async function(c1, c2, c3) {
//     try {
//         // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}?fullText=true`);
//         // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}?fullText=true`);
//         // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}?fullText=true`);
//         // console.log([data1.capital, data2.capital, data3.capital]);

//         // Parallel Promise
//         const data = await Promise.all([
//             getJSON(`https://restcountries.com/v2/name/${c1}?fullText=true`),
//             getJSON(`https://restcountries.com/v2/name/${c2}?fullText=true`),
//             getJSON(`https://restcountries.com/v2/name/${c3}?fullText=true`)
//         ])
//         console.log(data.map(d => d[0].capital));
//     } catch (err) {
//         console.error(err.message);
//     }
// }
// get3Countries('india', 'pakistan', 'nepal')

