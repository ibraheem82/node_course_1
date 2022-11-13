const EventEmitter = require('events');
const http = require('http')
const clientName = 'Ibraheem'
// const myEmitter = new EventEmitter();

// INHERITANCE
// * [Sales] <-> [EventEmitter],inheriting the event emitter class.
class Sales extends EventEmitter {
    constructor() {
        // getting access to the eventemitter class, i.e all the propertise and methods inside of the EventEmitter.
        super();
    }
}
const myEmitter = new Sales();


// * LISTENERS
// ! can also be called [observer pattern]
// * OBSERVERS
myEmitter.on('newSale', () => {
    console.log('A new sale was made.');
})
myEmitter.on('newSale', () => {
    console.log(`Customer name -> : ${clientName}`);
})
myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`);
})
// * object emiting the event
// myEmitter.emit('newSale');
myEmitter.emit('newSale', 20);


// #############################################
const server = http.createServer();

// listening for an event
server.on('request', (req, res) => {
    console.log('A request was recieved 📥.');
    res.end('Request recieved');
})

server.on('request', (req, res) => {
    console.log('Another request 📥📥.');
    // res.end('Request recieved');
})



server.on('request', (req, res) => {
    console.log('Another request was recieved 📥📥📥.');
    // res.end('Request recieved');
})

server.on('close', (req, res) => {
    console.log('Server Closed 🔒.');
    // res.end('Request recieved');
})

server.listen(7000, '127.0.0.1', () => {
    console.log('Waiting for request.....');
})