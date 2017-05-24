Backbone.history.on('route', onRoute);

// Trigger 'route' event on router instance.
router.on('route', function(name, args) {
  console.log(name === 'routeEvent');
});

location.replace('http://example.com#route-event/x');
Backbone.history.checkUrl();
