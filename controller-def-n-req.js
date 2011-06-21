var server = 'http://tabdeveloper.com:1987/';

// Luckily a response from the server is never required. So
// a basic XHR GET request to the server will trigger the
// action appropriately.
function xhr(url) {
  var request = new window.XMLHttpRequest();
  request.open('GET', url, true);
  request.send(null);
}

// The values of the buttons correspond with the Node.js server
// routes.
var buttons = [].slice.call(document.getElementsByTagName('button'));
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    xhr(server + button.value);
  }, true);
});
