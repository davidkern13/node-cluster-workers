var express = require( 'express' );
var path    = require( 'path' );

var pid = process.pid;

var app    = express();
var port    = 3000;
var root    = path.dirname( __dirname );

app.listen(port, () => {
    console.log(`Server port ${3000}!, Server pId: ${pid}`)
})


process.on('SIGINT', () => {
  console.log('SIGINT Signal');
  app.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM Signal');
  app.close(() => {
      process.exit(0);
  });
});

process.on('SIGUSER2', () => {
  console.log('SIGUSER2 Signal');
  app.close(() => {
      process.exit(1);
  });
});