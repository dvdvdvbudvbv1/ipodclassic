const addBtn = document.getElementById("addMusic");
const fileInput = document.getElementById("fileInput");
const cover = document.getElementById("cover");
const title = document.getElementById("trackTitle");
const centerButton = document.getElementById("centerButton");
const wheel = document.getElementById("wheel");

let audio = new Audio();
let playlist = [];
let currentIndex = 0;

function vibrate(ms = 30) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

function loadTrack(index) {
  const track = playlist[index];
  if (!track) return;

  audio.src = URL.createObjectURL(track.file);
  title.textContent = track.name;

  if (track.cover) {
    cover.src = track.cover;
  } else {
    cover.src = "https://via.placeholder.com/150";
  }

  audio.play();
  vibrate();
}

addBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", async (e) => {
  const files = Array.from(e.target.files);

  for (let file of files) {
    let coverURL = null;

    // Попробуем вытащить обложку
    try {
      const arrayBuffer = await file.arrayBuffer();
      const tags = window.jsmediatags.read(file, {
        onSuccess: (tag) => {
          const picture = tag.tags.picture;
          if (picture) {
            let base64String = "";
            for (let i = 0; i < picture.data.length; i++) {
              base64String += String.fromCharCode(picture.data[i]);
            }
            const base64 = btoa(base64String);
            coverURL = `data:${picture.format};base64,${base64}`;
          }
        },
        onError: () => {}
      });
    } catch (err) {}

    playlist.push({ file, name: file.name, cover: coverURL });
  }

  loadTrack(currentIndex);
});

centerButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  vibrate();
});

// Сенсорное управление колесом
let lastAngle = null;

wheel.addEventListener("mousemove", (e) => {
  const rect = wheel.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  if (lastAngle !== null) {
    let delta = angle - lastAngle;

    if (Math.abs(delta) > 15) {
      if (delta > 0) {
        currentIndex = (currentIndex + 1) % playlist.length;
      } else {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      }
      loadTrack(currentIndex);
      lastAngle = angle;
    }
  } else {
    lastAngle = angle;
  }
});

wheel.addEventListener("mouseleave", () => {
  lastAngle = null;
});