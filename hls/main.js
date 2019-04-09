if(Hls.isSupported()) {
    const video = document.getElementById('video');
    const hls = new Hls();
    const stream = window.location.search.slice(1) || "playlist";
    const.loadSource(`${stream}.m3u8`);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.addEventListener("click", () => video.play());
        video.play();
    });
}
