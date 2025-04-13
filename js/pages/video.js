// const video = document.getElementById('mainVideo');
// const playBtn = document.querySelector('.play-btn');
// const playIcon = document.querySelector('.play-icon');
// const pauseIcon = document.querySelector('.pause-icon');
// const videoContainer = document.querySelector('.video-container');
// const videoControls = document.querySelector('.video-controls');

// let controlsTimeout;

// function togglePlay() {
//   if (video.paused) {
//     video.play();
//     playIcon.classList.add('hidden');
//     pauseIcon.classList.remove('hidden');
//   } else {
//     video.pause();
//     playIcon.classList.remove('hidden');
//     pauseIcon.classList.add('hidden');
//   }
// }

// function showControls() {
//   videoControls.classList.remove('hidden');
//   clearTimeout(controlsTimeout);
// }

// function hideControls() {
//   controlsTimeout = setTimeout(() => {
//     videoControls.classList.add('hidden');
//   }, 2000);
// }

// videoContainer.addEventListener('mousemove', () => {
//   showControls();
//   hideControls();
// });

// videoContainer.addEventListener('mouseleave', () => {
//   hideControls();
// });

// playBtn.addEventListener('click', (e) => {
//   e.stopPropagation();
//   togglePlay();
// });

// videoContainer.addEventListener('click', togglePlay);

// // Reset play button when video ends
// video.addEventListener('ended', () => {
//   playIcon.classList.remove('hidden');
//   pauseIcon.classList.add('hidden');
// });

// // Navigation buttons (for future implementation)
// document.querySelector('.prev-btn').addEventListener('click', (e) => {
//   e.stopPropagation();
//   // Add previous video logic here
// });

// document.querySelector('.next-btn').addEventListener('click', (e) => {
//   e.stopPropagation();
//   // Add next video logic here
// });