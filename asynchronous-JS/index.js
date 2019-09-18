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

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const final = await writeFilePro(`${__dirname}/dog.txt`, res.body.message);

    console.log(final);
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
