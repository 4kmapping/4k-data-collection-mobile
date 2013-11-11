DataCollectionApp.Location = persistence.define('Location', {
  tags: 'JSON',
  desc: 'TEXT',
  lat: 'INT',
  lon: 'INT',
  email: 'TEXT',
  phone: 'TEXT',
  website: 'TEXT',
  security_level: 'INT',
  created_at: 'DATE',
  contact_info_is_authorized: 'BOOL',
  syncedWithServer: 'BOOL',
});