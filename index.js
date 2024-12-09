if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
        .register("service_worker.js")
        .then((registration) => {
            console.log("Service worker registered:", registration);
        })
        .catch((error) => {
            console.log("Service worker registration failed:", error);
        });
    });
}
