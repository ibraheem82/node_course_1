/**
* @Reading files in node
*
*/

const fs = require('fs');
const http = require('http');
const PORT = 8000; 

// ####################### Working with files ############################
// will read the data from the file.
// const readText = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `This is what we know about ibraheem: ${readText}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log(readText);
// console.log('File was written!');


// !  Callback Hell !
// Non Blocking way of writing in (node js) / Asynchronously.
// * Nodejs is reading the file in background.
// when has already been read, it will log the result.
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    // the result of the first one is depending on the result or the output of the second  second one
    // * using the data of the file name.
    // fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    //      console.log(data2);
    //     fs.readFile(`./txt/add.txt`, 'utf-8', (err, data3) => {
    //         console.log(data3);
            // if the file is not avaliable it will be created.
//             fs.writeFile('./txt/write.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('the file has been written.');
//             });

//         });
//     });
// });
// console.log('Will read file.');

// ####################### Working with Server ############################

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' ||  pathName === '/overview') {
        res.end('<h1>See The overview</h1>');

    } else if(pathName === '/product') {
        res.end('<h1>See The Product</h1>')
    } else if (pathName == '/api') {

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data)
          
    }  else {
        res.writeHead(404, {
            // this is the request HEADER
            'Content-type': 'text/html',
            // CUSTOM HEADER
            'My-Header': 'Ibraheem'
        })
        res.end('<h1 style="color:red";> Page not found</h1>')

    }

    // res.end('<h1>Ibraheem Omikunle</h1>');
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Listening to requests on port ${PORT}`);
})
