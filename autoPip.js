function getLargestVideoElement() {
  const allVideos = Array.from(document.querySelectorAll("video"))
    .filter((videoElement) => videoElement.readyState !== 0)
    .filter((videoElement) => !videoElement.disablePictureInPicture)
    .sort((firstVideo, secondVideo) => {
      const firstVideoRect = firstVideo.getClientRects()[0] || { width: 0, height: 0 };
      const secondVideoRect = secondVideo.getClientRects()[0] || { width: 0, height: 0 };
      return (secondVideoRect.width * secondVideoRect.height) - (firstVideoRect.width * firstVideoRect.height);
    });

  if (allVideos.length === 0) {
    return null;
  }

  return allVideos[0];
}

// Enable Picture-in-Picture automatically on eligible video when requested
navigator.mediaSession.setActionHandler("enterpictureinpicture", () => {
  const largestVideo = getLargestVideoElement();
  if (largestVideo) {
    largestVideo.requestPictureInPicture();
  }
});
