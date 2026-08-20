const {isMainThread, workerData, Worker} = require('worker_threads');

if (isMainThread) {
   new Worker(__filename,{
        workerData: [85, 65, 74,25, 45, 95, 100]
    });
   new Worker(__filename,{
        workerData: [8, 65, 74, 25, 4, 59]
    })

}else{
    console.log(`worker process id: ${process.pid}`);
    console.log(`worker data: ${workerData} sorted data: ${workerData.sort((a, b)=> a - b)}`);
    
}