var http = require("http");
var ShareDB = require("sharedb");
var connect = require("connect");
var express = require('express');
var serveStatic = require('serve-static');
var ShareDBMingoMemory = require('sharedb-mingo-memory');
var WebSocketJSONStream = require('websocket-json-stream');
var WebSocket = require('ws');
var util = require('util');
var constants = require('./constants');

var backend = ShareDB({db: new ShareDBMingoMemory()});

// var db = require('sharedb-mongo')(constants.MONGO_URL);
// var backend = new ShareDB({db});

createDoc(startServer);


const uniqId = val => {
  return Math.random()
      .toString(36)
      .substr(2, 6)
}


function createDoc(callback) {
  var connection = backend.connect();
  connection.createFetchQuery('players', {}, {}, function(err, results) {
    if (err) { throw err; }

    if (results.length === 0) {
      var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                   "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];

      names.forEach(function(name, index) {
        var doc = connection.get('players', ''+index);
        var data = {name: name, score: Math.floor(Math.random() * 10) * 5, uid: uniqId(), tales: [1,2,3] };
        doc.create(data);
      });

      
    }
    callback();
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
    backend.listen(stream);
  });

  server.listen(8081);
  console.log('Listening on http://localhost:8081. Build will serve from here /dist folder');
}