const Enmap = require('enmap');

// non-cached, auto-fetch enmap: 
const database = new Enmap({
  name: "EnmapDatabase",
  autoFetch: true,
  fetchAll: false
});

module.exports = database;