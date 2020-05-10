    var mediaBlobs = [];
    var mediaTypes = [];
    var mediaLoaded = [];
    var button = document.querySelector("button");
    var loading = document.getElementById("loading");
    var curr = void 0;
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
 
    var loadMedia = () => {
      loading.style.display = "block";
      button.setAttribute("disabled", "disabled");
      return Promise.all([
        // `RETURN` by smiling cynic are licensed under a Creative Commons Attribution 3.0 Unported License
        fetch(proxyurl + "https://storage.googleapis.com/20200509-ktv-service-mp3/%E6%80%8E%E9%BA%BC%E4%BA%86.mp3?GoogleAccessId=gcs-ro%40ktv-service.iam.gserviceaccount.com&Expires=16447046400&Signature=uCSEbTs78dYBGPX8HuQjW%2Bzr4H%2BLs5wB45flYT%2B2V3kiV9kK2GKwBFxoPM98idcG7k9XYA0UNIdwTNQztq5wvGr0%2BbFOywJwDaU5DMScbQTkL%2Bihm%2BogetcjOT3fYZFp60ImJ9QJJnLQgEjiz6Fntt48olsA9bviwYJSCBL%2BfYoUV8dfINki%2BPamkL3ZLUylPNZ8nUAog1x533gv9SUIBpE3YECm%2FWtKb87er3WKvBO0LnlsAt6JHnc3qZt6iO9gk3fpCtPo3hD3exvpbm3FQhCLHKPTBMkj%2BPZLDV%2FvbbQsRkVw6hBZ0V0Sx75K5f05LYLAAFqw8peHrstEU3HXvw%3D%3D")
      , fetch(proxyurl + "https://storage.googleapis.com/20200509-ktv-service-mp3/%E6%80%8E%E9%BA%BC%E4%BA%86.mp4?GoogleAccessId=gcs-ro%40ktv-service.iam.gserviceaccount.com&Expires=16447046400&Signature=cSximeKAcp%2BIfoEJZYB%2BqCqO%2BjfDP08zmJq3VLG89b9ZW7O3E5IyXXwQwGWlq2pHoFQwqtR7Yclk0G0A6eLPC3GLY9wDk6sBl%2FtYnyilgB%2B6zLNxwofDCTbiKy1CatnFKbS2OS47k6Lpz%2BQ0WsQRkjtou74bHviW6DtGEB6UX7IarYUiCeGpTDQ0OK8jVe5vZsYzof1uI6CBG4R1A5ZRn6smqsMpxW4Sd6RcYZROUiQKlqWs66fMrJrhxy5QoXOhfHr1RmIMlgs4Q5rWLN997JeSvtplFtHHInCbAytS%2F3ueh3okfC4X249aU7E0OR%2FV4iumL5krgNzgxEF5nD9T%2Bg%3D%3D")
        ])
        .then(responses => responses.map(media => ({
          [media.headers.get("Content-Type").split("/")[0]]: media.blob()
        })))
        .then(data => {
          for (var currentMedia = 0; currentMedia < data.length; currentMedia++) {
            (function(i) {
              var type = Object.keys(data[i])[0];
              mediaTypes.push(type);
              console.log(data[i]);
              var mediaElement = document.createElement(type);
              mediaElement.id = type;
              var label = document.createElement("label");
              mediaElement.setAttribute("controls", "controls");
              mediaElement.oncanplaythrough = () => {
                mediaLoaded.push(true);
                if (mediaLoaded.length === data.length 
                   && mediaLoaded.every(Boolean)) {
                    loading.style.display = "none";
                    for (var track = 0; track < mediaTypes.length; track++) {
                      document.getElementById(mediaTypes[track]).play();
                      console.log(document.getElementById(mediaTypes[track]));
                    }
                }
              }
              var seek = (e) => {
                if (!curr || new Date().getTime() - curr > 20) {
                  document.getElementById(
                    mediaTypes.filter(id => id !== e.target.id)[0]
                  ).currentTime = e.target.currentTime;
                  curr = new Date().getTime();
                }
              }
              mediaElement.onseeked = seek;
              mediaElement.onended = () => {
                for (var track = 0; track < mediaTypes.length; track++) {
                  document.getElementById(mediaTypes[track]).pause()
                }
              }
              mediaElement.ontimeupdate = (e) => {
                e.target.previousElementSibling
                .innerHTML = `${mediaTypes[i]} currentTime: ${Math.round(e.target.currentTime)}<br>`;
              }
              data[i][type].then(blob => {
                mediaBlobs.push(URL.createObjectURL(blob));
                mediaElement.src = mediaBlobs[mediaBlobs.length - 1];
                document.body.appendChild(mediaElement);
                document.body.insertBefore(label, mediaElement);
              })
            }(currentMedia));
          }
        })
    };
    