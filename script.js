let files = [];
let currentIndex = 0;
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const cover = document.getElementById('cover');
const title = document.getElementById('track-title');
const menu = document.getElementById('menu');
const player = document.getElementById('player');
const wheel = document.getElementById('wheel');
const playBtn = document.querySelector('.play-btn');

let audio = new Audio();
audio.preload = 'auto';

uploadBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  files = Array.from(e.target.files);
  currentIndex = 0;
  localStorage.setItem('musicFiles', JSON.stringify(files.map(file => file.name)));
  playTrack(currentIndex);
  menu.classList.remove('active');
  player.style.display = 'flex';
});

function playTrack(index) {
  if (!files[index]) return;
  const file = files[index];
  const url = URL.createObjectURL(file);
  audio.src = url;
  title.textContent = file.name;
  cover.src = 'https://via.placeholder.com/150';
  audio.play();
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  navigator.vibrate?.(30);
});

document.querySelector('.next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % files.length;
  playTrack(currentIndex);
  navigator.vibrate?.(30);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + files.length) % files.length;
  playTrack(currentIndex);
  navigator.vibrate?.(30);
});

document.getElementById('select-btn').addEventListener('click', () => {
  menu.classList.remove('active');
  player.style.display = 'flex';
  playTrack(currentIndex);
  navigator.vibrate?.(50);
});

wheel.addEventListener('touchmove', (e) => {
  e.preventDefault();
  // можно реализовать распознавание вращения здесь
  navigator.vibrate?.(10);
});