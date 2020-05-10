//const Storage  = require('@google-cloud/storage')({keyFilename: 'ktv-service-a22f4c985698.json'});
const path = require('path');
const express = require('express');
const gcsHelpers = require('./gcp/cloudstorage');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

if (module === require.main) {
  // Start the server
  
  const server = app.listen(8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;