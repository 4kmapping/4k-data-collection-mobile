DataCollectionApp.Store = DS.Store.extend({
  revision: 13,
  adapter: DS.LSAdapter.create()
});
DS.JSONTransforms.array = {
  serialize: function(value) {
    return Em.isNone(value) ? [] : value ;
  },
  deserialize: function(value) {
    return Em.isNone(value) ? [] : value ;
  }
} ;