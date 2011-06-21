(function(window, document) {

  // The end user should be allowed to disable synchronization.  This button
  // is optional on the page
  var syncAllow = true;
  var syncButton = document.querySelector('.sync-button');

  // If the sync button exists bind a click event and toggle the syncAllow
  // boolean.  Set the value of the button.
  if(syncButton) {
    syncButton.addEventListener('click', function() {
      syncAllow = !syncAllow;
      syncButton.setAttribute('value', syncAllow ? 'Turn Sync Off' : 'Turn Sync On');
    }, true);
  }

  // The socket.io client side library connects to your server, the node address can
  // be a domain name or an ip address.
  var socket = new io.Socket('tabdeveloper.com', { port: 1987 });

  // Connect the websocket (or fallback)
  socket.connect();

  // When the server pushes a message handle it accordingly
  socket.on('message', function(e) {
    // Set the hash to match the state
    if(syncAllow && e.state) {
      location.hash = e.state;
    }

    // If the message is cornify and cornify_add is a function, trigger.
    if(e.cornify && typeof cornify_add === 'function') {
      cornify_add();
    }

    // Reload the page to clear all the cornification.
    if(e.refresh) {
      location.reload(true);
    }
  });

})(this, this.document);