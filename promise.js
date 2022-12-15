'use strict'

// Creating Simple Promise
// It takes only one arguments, which is called 'executer function'
// And Executer function takes 2 arguments (resolve, reject)
const lotteryPriomise = new Promise(function (resolve, reject) {
  console.log('Start')
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You Win 💰')
    } else {
      reject(new Error('You lost your money 💩'))
    }
  }, 2000)
  console.log('End')
})

lotteryPriomise
  .then(res => console.log(res))
  .catch(err => console.error(`${err}`))

/////////////////////////
// Promisifying setTimeout
const wait = function (second) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, second * 1000)
  })
}
wait(1)
  .then(() => {
    console.log(`I waited for 2 seconds`)
    return wait(1)
  })
  .then(() => {
    console.log(`I waited for 3 seconds`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for 4 seconds`);
    return wait(1);
  })
  .then(() => console.log(`I waited for 5 second`))

// setTimeout(() => {
//     console.log('1 seconds');
//     setTimeout(() => {
//         console.log('2 seconds');
//         setTimeout(() => {
//             console.log('3 seconds');
//             setTimeout(() => {
//                 console.log('4 seconds');
//             })
//         }, 1000)
//     }, 1000)
// }, 1000)


////////////////////////////
Promise.resolve('abc').then(x => console.log(x))
Promise.reject(new Error('Problem!')).catch(x => console.error(x))
