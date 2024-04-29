const { parentPort } = require('worker_threads');

parentPort.on('message', (jobs) => {
    jobs.forEach(job => {
        let count = 0;
        for(let i=0; i<job; i++) {
            count++;
        }
    });

    parentPort.postMessage('done');
});