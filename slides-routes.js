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

  res.send(state.toString());
});

// Send the controller for any other request to this
// Node.js server.
app.get('*', function(req, res) {
  fs.readFile('controller.html', function(err, buffer) {
    res.send(buffer.toString());
  });
});
