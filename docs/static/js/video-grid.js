function buildGallery(folder, elementId) {
  const urlsPath = `./static/videos/${folder}/index_urls.json`;
  const gallery = document.getElementById(elementId);

  function createCard(src) {
    const card = document.createElement("div");
    card.className = "video-card";

    const video = document.createElement("video");
    video.src = src;
    video.muted = false;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";

    card.appendChild(video);
    gallery.appendChild(card);

    card.addEventListener("mouseenter", () => video.play());
    card.addEventListener("mouseleave", () => video.pause());
    card.addEventListener("touchstart", () => {
      if (video.paused) video.play();
      else video.pause();
    });
  }

  // 仅从 index_urls.json 读取完整 http(s) 链接列表
  fetch(urlsPath)
    .then(r => r.json())
    .then(list => {
      list.forEach(url => createCard(url));
    })
    .catch(err => console.error('Failed to load index_urls.json for', folder, err));
}

buildGallery("videoar_pro", "gallery-eb5");
buildGallery("videoar", "gallery-videoar");
