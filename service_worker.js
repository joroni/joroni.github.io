// Cached core static resources
/* self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("./static").then((cache) => {
            return cache.addAll(["./", "./android-chrome-192x192.png"]);
        })
    );
});
 */

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("v1").then((cache) => {
            return cache.addAll([
                "./",
                "./index.html",
                "./style/style.css",
                "./style/all.min.css",
                "./bootstrap5.2/css/bootstrap.min.css",
                "./style/bootstrap5-toggle.min.css",
                "./style/font-awesome.min.css",
                "./style/Chart.css",
                "./style/userList.css",
                "./index.js",
                "./script/script.js",
                "./bootstrap5.2/js/bootstrap.bundle.min.js",
                "./script/bootstrap5-toggle.ecmas.min.js",
                "./script/popper.min.js",
                "./script/Chart.js",
                "./script/charts.js",
                "./script/jquery.min.js",
                "./manifest.json",
                "./favicon-72x72.png",
                "./favicon-96x96.png",
                "./favicon-128x128.png",
                "./fndroid-chrome-144x144.png",
                "./fndroid-chrome-152x152.png",
                "./fndroid-chrome-192x192.png",
                "./fndroid-chrome-384x384.png",
                "./fndroid-chrome-512x512.png",
                "./favicon.png",
                "./favicon.ico",
                "./img/close.svg",
                "./img/maple-icon-white.svg",
                "./img/maple-icon-white.svg",
                "./img/maple-leaf.png",
                "./img/img/maple-logo-512x512.svg",
                "./img/maximize.svg",
                "./img/minmax.svg",
                "./img/no-data-found.jpg",
                "./img/no-pic.jpg",
                "./webfonts/fa-brands-400.ttf",
                "./webfonts/fa-brands-400.woff2",
                "./webfonts/fa-regular-400.ttf",
                "./webfonts/fa-regular-400.woff2",
                "./webfonts/fa-solid-900.ttf",
                "./webfonts/fa-solid-900.woff2",
                "./webfonts/fa-v4compatibility.ttf",
                "./webfonts/fa-v4compatibility.woff2",
            ]);
        })
    );
});

// Fatch resources
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
