// Required dependancies
var io = require('socket.io');
var app = require('express').createServer();

// State is the current slide position
var state = 1
// Clients is a list of users who have connected
var clients = [];
// Bind socket.io to express
var socket = io.listen(app);

// For each connection made add the client to the
// list of clients.
socket.on('connection', function(client) {
  clients.push(client);
});

// This is a simple wrapper for sending a message
// to all the connected users and pruning out the
// disconnected ones.
function send(message) {
  // Iterate through all potential clients
  clients.forEach(function(client) {
    // User is still connected, send message
    if(client._open) {
      client.send(message);
    }
    // Prune out disconnected user
    else {
      delete client;
    }
  });
}

// Advancing will... move the slides forward!
app.get('/advance', function(req, res) {
  // Increment and send over socket
  state++;
  send({ state: state });

  // Send the state as a response
  res.send(state.toString());
});

// Receding will... move the slides backwards!
app.get('/recede', function(req, res) {
  state--;
  send({ state: state });

  res.send(state.toString());
});

// This will allow the presenter to clear the
// slides of any cornification.
app.get('/refresh', function(req, res) {
  client.send({ refresh: true });

  res.send(state.toString());
});

// Reset will not refresh cornfication, but
// will send the slides back to the beginning.
app.get('/reset', function(req, res) {
  state = 1;
  send({ state: state });

  res.send(state.toString());
});

// Give your viewers what they really want...
// an unrepentable amount of unicorns.
app.get('/cornify', function(req, res) {
  send({ cornify: true });

  res.send(''+state);
});

// Listen on some high level port to avoid dealing
// with authbind or root user privileges.
app.listen(9001);
