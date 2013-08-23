window.ArrayMapHelpers = {} ;

ArrayMapHelpers.stringToTagObject = function(name){
  return Ember.Object.create({
    name: name,
    tag: name.toLowerCase().replace(/\//g, '-').replace(/ /g, '-'),
    checked: false
  }) ;
} ;