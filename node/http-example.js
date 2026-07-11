const {get} = require('https');
 get('https://www.google.com',(res) => {
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    })
     res.on('end', () => {
        console.log('No more data in response.');
    })
});

// google.end();

// google.end((res) => {
//     res.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     })
//  })
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!\n');
// });