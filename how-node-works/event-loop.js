const fs = require('fs');
// ! Password encryption
const crypto = require('crypto');
// * getting the current [date] in milliseconds that we are currently on.
const start = Date.now();
// reducing the numbers of threadpool size.
// ! WILL HAVE ONE THREAD POOL, CHANGE THE SIZE OF THE THREADPOOL.
// process.env.UV_THREADPOOL_SIZE = 1;
// process.env.UV_THREADPOOL_SIZE = 4;


// * it is not running inside the event loop, because it is not inside of any callback function.
setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immedaite 1 finished'));

fs.readFile('text-file.txt', () => {
    console.log('I/O finished💢');
    console.log("*********************");



    // * are coming from the event loop.
    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Immediate 2 finished'));

    // * will run before the others run
    process.nextTick(() => console.log('Process.nextTick'));
    
    // * ['password] -> secret string, ['salt'] -> using string to slat the password, [200000] -> numbers of iterations, [3098] -> key length, ['sha512] -> algorithm used to encrypt the password.
    // ! by default the size of the thread pool is 4.

    // ! -> [Synchronous version], but will block the code executions and move on to the next line.
    // ! Sync code are not always running inside of the event loop
    crypto.pbkdf2Sync('password', 'salt', 200000, 3098, 'sha512');
     console.log(Date.now() - start, 'Password encrypted');

    crypto.pbkdf2('password', 'salt', 200000, 3098, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    })

    crypto.pbkdf2('password', 'salt', 200000, 3098, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    })

    crypto.pbkdf2('password', 'salt', 200000, 3098, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    })

    crypto.pbkdf2('password', 'salt', 200000, 3098, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    })

    crypto.pbkdf2('password', 'salt', 200000, 3098, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    })
});

// not inside a callback
console.log('Hello from the top level code');