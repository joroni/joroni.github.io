/* self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("sw-cache").then(function (cache) {
            return cache.addAll([
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
                "fndroid-chrome-144x144.png",
                "fndroid-chrome-152x152.png",
                "fndroid-chrome-192x192.png",
                "fndroid-chrome-384x384.png",
                "fndroid-chrome-512x512.png",
                "favicon.png",
                "favicon.ico",
                "img/close.svg",
                "img/maple-icon-white.svg",
                "img/maple-icon-white.svg",
                "img/maple-leaf.png",
                "img/img/maple-logo-512x512.svg",
                "img/maximize.svg",
                "img/minmax.svg",
                "img/no-data-found.jpg",
                "img/no-pic.jpg",
                "webfonts/fa-brands-400.ttf",
                "webfonts/fa-brands-400.woff2",
                "webfonts/fa-regular-400.ttf",
                "webfonts/fa-regular-400.woff2",
                "webfonts/fa-solid-900.ttf",
                "webfonts/fa-solid-900.woff2",
                "webfonts/fa-v4compatibility.ttf",
                "webfonts/fa-v4compatibility.woff2",
            ]);
        })
    );
});
 */
//code
let CACHE_NAME = "sw-cache";
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            let ok,
                cats = ["a", "folder", "with", "lots", "of", "files", "for", "the", "same", "extension"],
                c = [
                    "/",
                    "/index.html",
                    "/style/style.css",
                    "/style/all.min.css",
                    "bootstrap5.2/css/bootstrap.min.css",
                    "/style/bootstrap5-toggle.min.css",
                    "/style/font-awesome.min.css",
                    "/style/Chart.css",
                    "/style/userList.css",
                    "/index.js",
                    "/script/script.js",
                    "bootstrap5.2/js/bootstrap.bundle.min.js",
                    "/script/bootstrap5-toggle.ecmas.min.js",
                    "/script/popper.min.js",
                    "/script/Chart.js",
                    "/script/charts.js",
                    "/script/jquery.min.js",
                    "/manifest.json",
                    "/favicon-72x72.png",
                    "/favicon-96x96.png",
                    "/favicon-128x128.png",
                    "/fndroid-chrome-144x144.png",
                    "/fndroid-chrome-152x152.png",
                    "/fndroid-chrome-192x192.png",
                    "/fndroid-chrome-384x384.png",
                    "/fndroid-chrome-512x512.png",
                    "/favicon.png",
                    "/favicon.ico",
                    "/img/close.svg",
                    "/img/maple-icon-white.svg",
                    "/img/maple-icon-white.svg",
                    "/img/maple-leaf.png",
                    "/img/img/maple-logo-512x512.svg",
                    "/img/maximize.svg",
                    "/img/minmax.svg",
                    "/img/no-data-found.jpg",
                    "/img/no-pic.jpg",
                    "/webfonts/fa-brands-400.ttf",
                    "/webfonts/fa-brands-400.woff2",
                    "/webfonts/fa-regular-400.ttf",
                    "/webfonts/fa-regular-400.woff2",
                    "/webfonts/fa-solid-900.ttf",
                    "/webfonts/fa-solid-900.woff2",
                    "/webfonts/fa-v4compatibility.ttf",
                    "/webfonts/fa-v4compatibility.woff2",
                    // ...cats.map(i => '/img/cat/' + i + '.jpg'),
                ];

            console.log("ServiceWorker: Caching files:", c.length, c);
            try {
                ok = await cache.addAll(c);
            } catch (err) {
                console.error("sw: cache.addAll");
                for (let i of c) {
                    try {
                        ok = await cache.add(i);
                    } catch (err) {
                        console.warn("sw: cache.add", i);
                    }
                }
            }

            return ok;
        })
    );

    console.log("ServiceWorker installed");
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
