var cluster = require( 'cluster' );
var cCPUs   = require('os').cpus().length;

var pid = process.pid;

if(cluster.isMaster) {

    console.log('Total cCPUs: ' + cCPUs);
    console.log('isMaster pId: ' + pid);

    for(let i = 0; i < cCPUs - 1; i++){
        const worker = cluster.fork();

        worker.on('exit', (code, signal) => {
            if (signal) {
                console.log(`worker was killed by signal: ${signal}`);
            } else if (code !== 0) {
                console.log(`worker exited with error code: ${code}, worker pId: ${worker.process.pid} died.`);
                cluster.fork();
            } else {
                console.log( 'worker died without param' );
            }

        });
        worker.send('hello from worker ' + worker.process.pid);
        worker.on('message', (msg) => {
            console.log( 'worker message: ' + msg );
        });
    }

}

if(cluster.isWorker) {

    require('./worker.js');

    process.on('message', message => {
      console.log(message);
    });

    process.send('Hi isWorker');
}

//var exec = require('child_process').exec;
//exec('tasklist', function(err, stdout, stderr) {
//  console.log(stdout);
//});
