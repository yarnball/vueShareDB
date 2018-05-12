var http = require("http");
var ShareDB = require("sharedb");
var connect = require("connect");
var express = require('express');
var serveStatic = require('serve-static');
var ShareDBMingoMemory = require('sharedb-mingo-memory');
var WebSocketJSONStream = require('websocket-json-stream');
var WebSocket = require('ws');
var util = require('util');

var share = ShareDB({db: new ShareDBMingoMemory()});

createDoc(startServer);

function createDoc(callback) {
  var connection = share.connect();
  
  // var doc = connection.get('examples', 'counter');
  // doc.fetch(function(err) {
  //   if (err) throw err;
  //   if (doc.type === null) {
  //     doc.create({numClicks: 0}, callback);
  //     return;
  //   }
  //   callback();
  // });
  connection.createFetchQuery('players', {}, {}, function(err, results) {
    if (err) { throw err; }

    if (results.length === 0) {
      var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                   "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];

      names.forEach(function(name, index) {
        var doc = connection.get('players', ''+index);
        var data = {name: name, score: Math.floor(Math.random() * 10) * 5};
        doc.create(data);
      });
      callback();
    }
  });
}

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  var app = express();
  app.use(express.static('dist'));
  var server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    share.listen(stream);
  });

  server.listen(8081);
  console.log('Listening on http://localhost:8081. Build will serve from here /dist folder');
}