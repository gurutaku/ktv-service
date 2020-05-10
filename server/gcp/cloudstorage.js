  	const Storage = require('@google-cloud/storage');
const storage = Storage({
	  projectId: '20200509-ktv-service'
	});
const bucket = storage.bucket('20200509-ktv-service-mp3');
const mp3 = '怎麼了.mp3'
const mp4 = '怎麼了.mp4'
var mp3_file = bucket.file(mp3);
var mp4_file = bucket.file(mp4);
var mp3_url = '';
var mp4_url = '';
//-
// Generate a URL that allows temporary access to list files in a bucket.
//-
const request = require('request');

const config = {
  action: 'read',
  expires: '03-09-2491'
};

mp3_file.getSignedUrl(config, function(err, url) {
  if (err) {
    console.error(err);
    return;
  }

  // The mp3_file is now available to be listed from this URL.
  request(url, function(err, resp) {
    // resp.statusCode = 200
  });
});
mp4_file.getSignedUrl(config, function(err, url) {
  if (err) {
    console.error(err);
    return;
  }

  // The mp4_file is now available to be listed from this URL.
  request(url, function(err, resp) {
    // resp.statusCode = 200
  });
});

//-
// If the callback is omitted, we'll return a Promise.
//-
mp3_file.getSignedUrl(config).then(function(data) {
  mp3_url = data[0];
  console.log(mp3_url);
});
mp4_file.getSignedUrl(config).then(function(data) {
  mp4_url = data[0];
  console.log(mp4_url);
});