DataCollectionApp.Location = DS.Model.extend({
  tags: DS.attr('array'),
  desc: DS.attr('string'),
  lat: DS.attr('number'),
  long: DS.attr('number'),
  syncedWithServer: DS.attr('boolean', { defaultValue: false })
}) ;