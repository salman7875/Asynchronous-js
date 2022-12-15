'use strict';

console.log('Test Start');
setTimeout(() => console.log('0 sec Timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved Promise 2:- It does heavy Tasks').then(res => {
    for (let i = 0; i < 1000000000; i++) {}
    console.log(res);
})
console.log('Test End');