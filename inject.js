(function(window, document) {
  // This function is a simple way of getting remote JavaScript into the page.
  window.injectScript = function(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  };
})(window, document);