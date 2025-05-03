function getLargestActiveVideo() {
  const allVideos = Array.from(document.querySelectorAll('video'))
    .filter(video => video.readyState !== 0)
    .filter(video => !video.disablePictureInPicture)
    .sort((video1, video2) => {
      const video1Rect = video1.getClientRects()[0] || { width: 0, height: 0 };
      const video2Rect = video2.getClientRects()[0] || { width: 0, height: 0 };
      return (video2Rect.width * video2Rect.height) - (video1Rect.width * video1Rect.height);
    });

  if (allVideos.length === 0) return null;

  return allVideos[0];
}

async function enablePictureInPicture(videoElement) {
  await videoElement.requestPictureInPicture();
  videoElement.setAttribute('__inPip__', true);
  videoElement.addEventListener('leavepictureinpicture', () => {
    videoElement.removeAttribute('__inPip__');
  }, { once: true });
  new ResizeObserver(ensurePictureInPictureActive).observe(videoElement);
}

function ensurePictureInPictureActive(entries, observer) {
  const targetVideo = entries[0].target;
  if (!document.querySelector('[__inPip__]')) {
    observer.unobserve(targetVideo);
    return;
  }
  const largestVideo = getLargestActiveVideo();
  if (largestVideo && !largestVideo.hasAttribute('__inPip__')) {
    observer.unobserve(targetVideo);
    enablePictureInPicture(largestVideo);
  }
}

(async () => {
  const largestVideo = getLargestActiveVideo();
  if (!largestVideo) return;

  if (largestVideo.hasAttribute('__inPip__')) {
    document.exitPictureInPicture();
    return;
  }
  await enablePictureInPicture(largestVideo);
})();
