/**
* @Reading files in node
*
*/
const fs = require('fs');
const http = require('http');
const url = require('url');
const PORT = 8000; 
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');



// ####################### Working with files ############################



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


// creating a new array based on the data objects
const slug = dataObj.map(el => slugify(el.productName, { lower: true }))
console.log(slug);

// ####################### Working with Server ############################
// console.log(slugify('omikunle build', {lower: true}));
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
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);

        res.end(output);
        // res.end(tempOverview);

    // * Product page
    } else if (pathname === '/product') {
        // console.log(query);
        res.writeHead(200, { 'Content-type': 'text/html' });
        // * [dataObj] is an array, [query.id] -> we are retriving the elements at the  position that is coming from our {query.id}
        // * will get a particular data for the particular id that owns it.
        const product = dataObj[query.id];
        // * replace all the placeholders with whatsoever that is coming from the json. 
        const output = replaceTemplate(tempProduct, product)
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
 