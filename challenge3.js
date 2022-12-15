'use strict'

const containerImage = document.querySelector('.images')

const wait = function (second) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, second * 1000)
  })
}

const createImage = function(imgPath) {
  return new Promise(function(resolve, reject) {
    const img = document.createElement('img')
    img.src = imgPath;

    img.addEventListener('load', function(e) {
      containerImage.append(img);
      resolve(img);
    })

    img.addEventListener('error', function(e) {
      reject(new Error('Image not found!'));
    })
  })
}


const loadNPause = async function() {
  try {
    let img = await createImage('img/galaxy.jpeg');
    console.log('Image 1 is loaded');
    await wait(2);
    img.style.display = 'none';
  
    img = await createImage('img/vincentiu-solomon-f0KPCu4wXBg-unsplash.jpg');
    console.log('Image 2 is loaded');
    await wait(2);
    img.style.display = 'none';
  
    img = await createImage('img/knxrt-nFyxEGdLWas-unsplash.jpg');
    console.log('Image 3 is loaded');
    await wait(2);
    img.style.display = 'none';
  } catch(err) {
    console.error(err);
  }
}
// loadNPause();

const loadAll = async function(imgArr) {
  try {
    const imgs = imgArr.map(async img => {
      return await createImage(img)
    })
    const res = await Promise.all(imgs)

    res.forEach(img => img.classList.add('parallel'))
  } catch(err) {
    console.error(err);
  }
}
loadAll(['img/galaxy.jpeg', 'img/knxrt-nFyxEGdLWas-unsplash.jpg', 'img/vincentiu-solomon-f0KPCu4wXBg-unsplash.jpg'])