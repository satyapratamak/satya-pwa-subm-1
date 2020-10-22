const CACHE_NAME = "firstpwa-v4";
var urlsToCache = [
    "/",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css",
    /*"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular",*/
    "https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
    "https://image.tmdb.org/t/p/w500/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
    "https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
    "https://image.tmdb.org/t/p/w500/zGVbrulkupqpbwgiNedkJPyQum4.jpg",
    "https://image.tmdb.org/t/p/w200/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
    "https://image.tmdb.org/t/p/w200/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
    "https://image.tmdb.org/t/p/w200/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
    "https://image.tmdb.org/t/p/w200/uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
    "https://image.tmdb.org/t/p/w200/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
    "https://image.tmdb.org/t/p/w200/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
    "https://image.tmdb.org/t/p/w200/sy6DvAu72kjoseZEjocnm2ZZ09i.jpg",
    "https://image.tmdb.org/t/p/w200/zGVbrulkupqpbwgiNedkJPyQum4.jpg",
    "https://image.tmdb.org/t/p/w200/elZ6JCzSEvFOq4gNjNeZsnRFsvj.jpg",
    "https://image.tmdb.org/t/p/w200/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", 
    "/icon.png",
    "img/food-1.png",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/gallery.html",
    "/pages/popmovie.html",
    "/pages/contact.html",
    "/css/main.css",
    "css/materialize-social.css",
    //"css/font-awesome.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
    "/js/nav.js"
  ];   // list of page that content Assets, JS, and styles


  self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });


// Using aset from cache
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

// Deleting older cache
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});