Ember.Handlebars.helper('tagize', function(value, options) {
  return value.replace('/', '-').toLowerCase() ;
}) ;