window.addEventListener("load", () => {
  if (typeof videoID !== 'undefined')
    gapi.load("client", () => {
      gapi.client
        .init({
          apiKey: "AIzaSyDvBf27b-puODMK8vkYNyMRnqZMuZBo-vE",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
          ],
        })
        .then(() => {
          // console.log("gapi loaded")
          gapi.client.youtube.videos
            .list({
              part: ["snippet"],
              id: [videoID],
            })
            .then(({ result }) => {
              let description = document.createElement('p');
              description.innerText = result.items[0].snippet.description;
              document.querySelector('#main-content hr').insertAdjacentElement("afterend", description);
            })
        })
    })
})
