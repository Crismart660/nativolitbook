let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("profilePic").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
});

// ------------------------- AUDIO 1 -------------------------
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const voiceSelect = document.getElementById("voiceSelect");
const speedSelect = document.getElementById("speedSelect");
const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");

// Control de reproducción y pausa para el primer audio
playPauseBtn.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Actualizar el tiempo y duración para el primer audio
audioPlayer.addEventListener("timeupdate", function () {
  const currentTime = formatTime(audioPlayer.currentTime);
  const duration = formatTime(audioPlayer.duration);
  currentTimeElement.textContent = currentTime;
  durationElement.textContent = duration;
});

// Cambiar la voz para el primer audio
voiceSelect.addEventListener("change", function () {
  const selectedAudio = voiceSelect.value;
  audioPlayer.src = selectedAudio;
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
});

// Cambiar la velocidad de reproducción para el primer audio
speedSelect.addEventListener("change", function () {
  const speed = parseFloat(speedSelect.value);
  audioPlayer.playbackRate = speed;
});

// ------------------------- AUDIO 2 -------------------------
const audioPlayer2 = document.getElementById("audioPlayer2");
const playPauseBtn2 = document.getElementById("playPauseBtn2");
const voiceSelect2 = document.getElementById("voiceSelect2");
const speedSelect2 = document.getElementById("speedSelect2");
const currentTimeElement2 = document.getElementById("currentTime2");
const durationElement2 = document.getElementById("duration2");

// Control de reproducción y pausa para el segundo audio
playPauseBtn2.addEventListener("click", function () {
  if (audioPlayer2.paused) {
    audioPlayer2.play();
    playPauseBtn2.textContent = "⏸️";
  } else {
    audioPlayer2.pause();
    playPauseBtn2.textContent = "▶️";
  }
});

// Actualizar el tiempo y duración para el segundo audio
audioPlayer2.addEventListener("timeupdate", function () {
  const currentTime = formatTime(audioPlayer2.currentTime);
  const duration = formatTime(audioPlayer2.duration);
  currentTimeElement2.textContent = currentTime;
  durationElement2.textContent = duration;
});

// Cambiar la voz para el segundo audio
voiceSelect2.addEventListener("change", function () {
  const selectedAudio = voiceSelect2.value;
  audioPlayer2.src = selectedAudio;
  audioPlayer2.play();
  playPauseBtn2.textContent = "⏸️";
});

// Cambiar la velocidad de reproducción para el segundo audio
speedSelect2.addEventListener("change", function () {
  const speed = parseFloat(speedSelect2.value);
  audioPlayer2.playbackRate = speed;
});

// ------------------------- FUNCIONES AUXILIARES -------------------------
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
