/**
* @Reading files in node
*
*/
const fs = require('fs');
const http = require('http');
const url = require('url');

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


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req, res) => {
    // console.log(req.url);
    // [true] -> query string.
    // console.log(url.parse(req.url, true));

    const { query, pathname } = url.parse(req.url, true);
    // const pathName = req.url;
    // * Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
                        //  el taking in the current object on each iteration.
        // * [el] now holds the data.
        // * dataObj is holding all of the products.
        // * in each iteration we will replace the placeholders in the tempCard with the el current iteration.
        const cardsHtml = dataObj.map(el => replaceTemplates(tempCard, el)).join('')
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);

        res.end(output);
        // res.end(tempOverview);

    // * Product page
    } else if (pathname === '/product') {
        // console.log(query);
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplates(tempProduct, product)
        // res.end('<h1>See The Product</h1>')
        res.end(output)

    // * API
    } else if (pathname == '/api') {

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data)
    // * NOT FOUND
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
 