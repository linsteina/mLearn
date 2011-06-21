// To assist with swipe calculation originalX holds the starting 
// touch X position, and x holds the ending X position.  Swipe
// is an area for moving between slides.  You may want to increase
// the swipe threshold variable if you find its too sensitive.
var originalX, x;
var swipe = document.querySelector('.swipe'); 
var swipeThreshold = 50;
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
