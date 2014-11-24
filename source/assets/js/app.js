/**
 * App namespace
 */
 App = function() {
  this.viewport = null;
  this.viewportMedium = 768;
  this.viewportLarge = 1025;
  this.viewportXLarge = 1440;
};

App.prototype.calculateViewport = function() {
  if (window.innerWidth >= window.App.viewportXLarge) {
    window.App.viewport = 'xlarge';
  } else if (window.innerWidth >= window.App.viewportLarge) {
    window.App.viewport = 'large';
  } else if (window.innerWidth >= window.App.viewportMedium) {
    window.App.viewport = 'medium';
  } else {
    window.App.viewport = 'small';
  }
};

window.App = new App();
window.App.calculateViewport();


/**
 * Any time window width changed, update our viewport.
 */
$(window).resize(function() {
  App.calculateViewport();
});

$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});

