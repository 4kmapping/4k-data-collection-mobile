DataCollectionApp.Location = DS.Model.extend({
  tags: DS.attr('array'),
  desc: DS.attr('string'),
  lat: DS.attr('number'),
  lon: DS.attr('number'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  website: DS.attr('string'),
  security_level: DS.attr('number'),
  syncedWithServer: DS.attr('boolean', { defaultValue: false })
}) ;