const fs = require('fs');
// * another way of creating a server
const server = require('http').createServer();


server.on('request', (req, res) => {
    // ! [] shouldnt be use in a production readdy application.
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(`<h1>${data}</h1>`);
    // });

    // * Using streams to read large bunchs of datas.
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
        // * the [res] is a writable stream.
        // writing teh chunk to the res.
        // * we are streaming the content from the file right to the client.
        // already sent this to the client.
    //     res.write(`<h2>${chunk}</h2>`)
    // })

    // readable.on('end', () => {
        // * the [res] is also a stream
    //     res.end()
    // })
 
    // * another event we can listen to
    // ! in the callback function we have access to the callback function.
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('<h1>File not found.</h1>');
    // })

    // * FINAL SOLUTION
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    // we must be albe to write a stream.
    // ? readableSource.pipe(writableDest)
});


server.listen(8000, '127.0.0.1', () => {
    console.log('Listening');
})

