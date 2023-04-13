const fs = require('fs');
const superagent = require("superagent");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('Could not find file.');
            resolve(data);
        });
    });
};


// * Write File.
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not find file.');
            resolve('File was written');
        });
    });
};


const getDogPic = async () => {

    try {
        
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);

        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image was saved to file.');
        
    } catch (err) {
        console.log(err);
        
    }
};
console.log('1: Will get dog pics');
getDogPic();
console.log('2: Done get dog pics');




// * Read File.
// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed: ${data}`);

    // will become a promise.
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// }).then(res => {
//     console.log(res.body.message);


//     return writeFilePro('dog-img.txt', res.body.message)

    // fs.writeFile('dog-img.txt', res.body.message, err => {
    //     if (err) return console.log(err.message);
    //     console.log('Random dog image was saved to file.');
    // });
// })
//     .then(() => {
//         console.log('Random dog image was saved to file.');
//     })
//     .catch(err => {
//         console.log(err.message);

//     });





// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    // console.log(`Breed: ${data}`);


    // superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
        
    //     console.log(res.body.message);

    //     fs.writeFile('dog-img.txt', res.body.message, err => {
    //         if (err) return console.log(err.message);
    //         console.log('Random dog image was saved to file.');
    //     });
    // }).catch(err => {
    //     console.log(err.message);

    // })
// });

        
        // ! .end((err, res) => {
        // ! if (err) return console.log(err.message);
        // ! console.log(res.body.message);
        // ! fs.writeFile('dog-img.txt', res.body.message, err => {
        // !    if (err) return console.log(err.message);
        // !    console.log('Random dog image was saved to file.');
        // ! });
    //! });