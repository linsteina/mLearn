var state = 1
  , clients = [];

var socket = io.listen(app);
socket.on('connection', function(client){
  clients.push(client);
});

app.get('/advance', function(req, res) {
  state++;
  clients.forEach(function(client) {
    if(client._open) {
      client.send({ state: state });
    }
  });

  res.send(''+state);
});

app.get('/recede', function(req, res) {
  state--;
  clients.forEach(function(client) {
    if(client._open) {
      client.send({ state: state });
    }
  });

  res.send(''+state);
});

app.get('/refresh', function(req, res) {
  clients.forEach(function(client) {
    if(client._open) {
      client.send({ refresh: true });
    }
  });

  res.send(''+state);
});

app.get('/reset', function(req, res) {
  state = 1;
  clients.forEach(function(client) {
    if(client._open) {
      client.send({ state: state });
    }
  });

  res.send(''+state);
});

app.get('/cornify', function(req, res) {
  clients.forEach(function(client) {
    if(client._open) {
      client.send({ cornify: true });
    }
  });

  res.send(''+state);
});

app.get('*', function(req, res) {
  res.send('Cloud slide syncing shiz!');
});

app.listen(your_port);