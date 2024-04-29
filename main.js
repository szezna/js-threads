const { Worker } = require('worker_threads');

const jobs = Array.from({ length: 100}, () => 1e9);

let completedWorkers = 0

function chunkify(array, n) {
    let chunks = [];
    for (let i=n; i>0; i--) {
        chunks.push(array.splice(0, Math.ceil(array.length / i )));
    }
    return chunks;
}
function run(jobs, workers) {
    const chunks = chunkify(jobs, workers);

    const tick = performance.now();
    let completedWorkers = 0;

    chunks.forEach((data, i) => {
        const worker = new Worker("./worker.js");
        worker.postMessage(data);
        worker.on("message", () => {
            console.log(`Worker ${i+1} completed`);
            completedWorkers++;

            if(completedWorkers === workers) {
                console.log(`${workers} worker(s) took ${performance.now() - tick} ms.`);
                process.exit();
            }
        });
    });
}

run(jobs, 6);