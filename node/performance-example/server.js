const express = require('express');
const cluster = require('cluster');
const app = express();

function delay(md){
    const start = Date.now();
    while(Date.now() - start < md){
        // eventloop is blocked
    };
}

app.get('/', (req, res) => {
    res.send(`Performance Example ${process.pid}`);
})

app.get('/timer', (req, res) => {
    console.log(`/timer started on ${process.pid}`);
    delay(5000);
    console.log(`/timer finished on ${process.pid}`);
    res.send(`eventloop was blocked ${process.pid}`);
})
console.log(`Running server...`);
if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
    cluster.fork();
    cluster.fork();
}else{
    console.log(`Worker ${process.pid} started`);
    app.listen(3000, () => {
        console.log('server is listening on port 3000');
    })
}
