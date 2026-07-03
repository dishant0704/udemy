const EventEmitter = require('events');
const celebrity = new EventEmitter();

//subscribe to the event
celebrity.on('greet', () => {
    console.log('Hello, everyone! I am a celebrity!');
})

celebrity.on('greet', () => {
    console.log('Hello, everyone! I am ketan!');
})

process.on('exit', () => {
    console.log('Goodbye, everyone! I am leaving now.');
});

celebrity.emit('greet');


function printHello() {
    console.log("Hello, World!");
}
printHello();
console.log("This is a simple JavaScript file.");