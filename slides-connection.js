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