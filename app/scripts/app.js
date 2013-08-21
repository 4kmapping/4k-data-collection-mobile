var DataCollectionApp = window.DataCollectionApp = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// dunno where else to put it :#
Ember.Handlebars.helper('tagize', function(value, options) {
  return value.replace('/', '-').toLowerCase() ;
});


/* Order and include as you please. */

require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
