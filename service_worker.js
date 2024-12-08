// Cached core static resources
/* self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("static").then((cache) => {
            return cache.addAll(["./", "./android-chrome-192x192.png"]);
        })
    );
});
 */

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("v1").then((cache) => {
            return cache.addAll([
                "/",
                "index.html",
                "style/style.css",
                "style/all.min.css",
                "bootstrap5.2/css/bootstrap.min.css",
                "style/bootstrap5-toggle.min.css",
                "style/font-awesome.min.css",
                "style/Chart.css",
                "style/userList.css",
                "index.js",
                "script/script.js",
                "bootstrap5.2/js/bootstrap.bundle.min.js",
                "script/bootstrap5-toggle.ecmas.min.js",
                "script/popper.min.js",
                "script/Chart.js",
                "script/charts.js",
                "script/jquery.min.js",
                "manifest.json",
                "favicon-72x72.png",
                "favicon-96x96.png",
                "favicon-128x128.png",
                "android-chrome-144x144.png",
                "android-chrome-152x152.png",
                "android-chrome-192x192.png",
                "android-chrome-384x384.png",
                "android-chrome-512x512.png",
                "favicon.png",
                "favicon.ico",
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
