const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 🔥');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('dog-img.txt', data, err => {
      if (err) reject('I could not write that file 🔥');
      resolve('Random Dog Image Successfully saved');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body);
//     return writeFilePro(`${__dirname}/dog.txt`, res.body.message);
//   })
//   .then(result => console.log(result))
//   .catch(err => {
//     console.log(err.message);
//   });

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);

    console.log(`Breed: ${data}`);

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el => el.body.message);

    console.log(imgs);

    const final = await writeFilePro(`${__dirname}/dog.txt`, imgs.join('\n'));

    console.log(final);
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2: Ready 🙈';
};

(async () => {
  try {
    console.log('1: will get dog promise');
    const x = await getDogPic();
    console.log(x);
    console.log('3: will run before promise');
  } catch (err) {
    console.log('Error 🔥');
  }
})();

// console.log('1: will get dog promise');
// getDogPic()
//   .then(x => {
//     console.log(x);
//     console.log('3: will run before promise');
//   })
//   .catch(err => {
//     console.log('Error 🔥');
//   });
