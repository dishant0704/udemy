const http = require('http');
const PORT = 3000;

const server = http.createServer();
server.on('request', (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    if (req.url === '/hello'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }else if (req.url === '/friend'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('{"name": "John", "age": 30}');
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
    }
})

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})