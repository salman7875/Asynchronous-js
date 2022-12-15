'use strict';

const getJSON = async function(url, errorMsg = 'Something went wrong') {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error(`${errorMsg} (${err.status})`)
        return res.json();
    })
}

// (async function() {
//     const res = await Promise.race([
//       getJSON(`https://restcountries.com/v2/name/india?fullText=true`),
//       getJSON(`https://restcountries.com/v2/name/egypt?fullText=true`),
//       getJSON(`https://restcountries.com/v2/name/italy?fullText=true`),
//     ]);
//     console.log(res[0]);
// })();

// Promise.race:- Recieves an Array of promises and it also returns a promise. This promise returned by promise.race is settled as soon as one of the input promises settles. The first settled promise WINS the race.
// And settled simply means that a value is available, but it does'nt matter if the promise is rejected or fulfilled. 
const race = async function() {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v2/name/india?fullText=true`),
      getJSON(`https://restcountries.com/v2/name/egypt?fullText=true`),
      getJSON(`https://restcountries.com/v2/name/italy?fullText=true`),
    ]);
    console.log(res[0]);
}
race();

// Real World example

const wait = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(() => {
            reject(new Error(`Request took too long!`))
        }, sec * 1000);
    })
}

Promise.race([
    getJSON(`https://restcountries.com/v2/name/egypt?fullText=true`),
    wait(1)
]).then(res => console.log(res[0])).catch(err => console.error(err))

//////////////////////////////////
// Promise.allSettled:- It will return all the settled promise from an Array
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Rejected'),
    Promise.resolve('Another Success')
]).then(res => console.log(res))


/////////////////////////////////////////
// Promise.any [ES2021]:- It returns first succesfull promise and ignore rejected promises
Promise.any ([
    Promise.resolve('Success'),
    Promise.reject('Rejected'),
    Promise.resolve('Another Success')
]).then(res => console.log(res))