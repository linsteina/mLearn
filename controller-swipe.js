// Swiping is relatively simple to implement and very effective to
// use.  Three events are needed, touchstart, touchmove, and
// touchend.  Touchstart sets the original position.
swipe.addEventListener('touchstart', function(e) {
  originalX = e.touches[0].pageX;
}, true);

// Touchmove updates the end position.
swipe.addEventListener('touchmove', function(e) {
  e.preventDefault();
  x = e.touches[0].pageX;
}, true);

// Touchend determines if a swipe occurred.
swipe.addEventListener('touchend', function(e) {
  // If swipe is forward, advance.
  if ((originalX - x) > swipeThreshold) {
    xhr(server + 'advance');
  }

  // If swipe is backward, recede.
  if ((x - originalX) > swipeThreshold) {
    xhr(server + 'recede');
  }
}, true);