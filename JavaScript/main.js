document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      alert("Bem-vindo ao website!");
  }, 5000);

});


document.addEventListener("DOMContentLoaded", function() {
  const rssFeedElement = document.getElementById("rss-feed");

  
  const rssUrl = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";

  
  function carregarRss() {
      fetch(rssUrl)
          .then(response => response.text())
          .then(xmlText => {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(xmlText, "text/xml");
              const items = xmlDoc.querySelectorAll("item");

              rssFeedElement.innerHTML = "";

            
              for (let i = 0; i < Math.min(5, items.length); i++) {
                  const item = items[i];
                  const title = item.querySelector("title").textContent;
                  const link = item.querySelector("link").textContent;
                  const enclosure = item.querySelector("enclosure");

                  const entryDiv = document.createElement("div");
                  entryDiv.classList.add("entry");

                  const titleElement = document.createElement("h2");
                  titleElement.textContent = title;

                  const linkElement = document.createElement("p");
                  const linkAnchor = document.createElement("a");
                  linkAnchor.href = link;
                  linkAnchor.textContent = "Leia mais";
                  linkElement.appendChild(linkAnchor);

                  entryDiv.appendChild(titleElement);

                  if (enclosure) {
                      const imageUrl = enclosure.getAttribute("url");
                      if (imageUrl) {
                          const imageElement = document.createElement("img");
                          imageElement.src = imageUrl;
                          imageElement.classList.add("entry-image");
                          entryDiv.appendChild(imageElement);
                      }
                  }

                  entryDiv.appendChild(linkElement);

                  rssFeedElement.appendChild(entryDiv);
              }
          })
          .catch(error => {
              console.error("Erro ao carregar o feed RSS:", error);
          });
  }

  carregarRss();
});



function initMap() {
  var officeLocation = { lat: 41.161758, lng: -8.583933 }; 
  var map = new google.maps.Map(document.getElementById('map'), {
      center: officeLocation,
      zoom: 14
  });

  var streetView = new google.maps.StreetViewService();
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'));


  streetView.getPanorama({ location: officeLocation, radius: 50 }, function (data, status) {
      if (status === 'OK') {
          panorama.setPano(data.location.pano);
          panorama.setPov({
              heading: 270,
              pitch: 0
          });
          panorama.setVisible(true);
      } else {
          console.error('Erro ao carregar street view: ' + status);
      }
  });

  var marker = new google.maps.Marker({
      position: officeLocation,
      map: map,
      title: 'Imovi - Escritório'
  });
}

