let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}






document.addEventListener('DOMContentLoaded', function() { 

   //DOM= Es el que estructura toda la pagina web
   //COMO FUNCIONA:

   //Cuando se ejecuta la pagina lo primero que se carga es el HTML lo que hace DOM es agarrar los elementos del html y organizarlos, o sea la ubicacion de esos elementos ademas que tiene que descargarlos

   //Luego se ejecuta otros programas como CSS Y JAVASCRIPT por eso mismo cuando ponemos "DOMContentLoaded" le decimos al javascript que se espere que el DOM termine de ejecutarse para hacer lo siguiente de abajo ya que aveces javascript se adelanta y por eso es que hay errores
              
   // function() { Luego de que el DOM se ejecute hacer lo siguiente...





   document.getElementById('fileInput').addEventListener('change', function(event) {

   // add.EventListener("change", function(event) {

   // El programa espera que el usuario haga un "change" o sea cuando el usuario de clic en el boton para seleccionar una imagen






       const file = event.target.files[0]; 


       //const file: basicamente le dice a lo que esta luego del igual que va a ser su ayudante
       // =event.target.files[0]; Basicamente el usuario solo puede elegir la primera imagen que quiera "0" 
       
       if (file) {
           const reader = new FileReader();  


           //FileReader basicamente es un lector de imagenes 
           
         
           reader.onload = function(e) {   
               
               //reader.onload = Luego de leer las imagenes 
               //function(e) = Ejecute lo siguiente


               document.getElementById('profilePic').src = e.target.result;

                 //document.getElementById("profilePic").src hace referencia a mostrar la iamgen del usuario

                 //e.target.result= Mostrar la imagen seleccionada por el usuario

           }
           
           reader.readAsDataURL(file);  

           //Basicamente le dice al lector de imagenes que luego de leer todo esa imagen la convierta a codigo que la computadora pueda entender (readAsDataURL) esto es importante si queremos que se visualize la imagen o que cargue rapido 
       }
   });
});


// SIGUIENTE PARTE



//AUDIO 1//

// Primer audio
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const voiceSelect = document.getElementById('voiceSelect');
const speedSelect = document.getElementById('speedSelect');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');

// Control de reproducción y pausa para el primer audio
playPauseBtn.addEventListener('click', function() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
  }
});

// Actualizar el tiempo y duración para el primer audio
audioPlayer.addEventListener('timeupdate', function() {
  const currentTime = formatTime(audioPlayer.currentTime);
  const duration = formatTime(audioPlayer.duration);
  currentTimeElement.textContent = currentTime;
  durationElement.textContent = duration;
});

// Cambiar la voz para el primer audio
voiceSelect.addEventListener('change', function() {
  const selectedAudio = voiceSelect.value;
  audioPlayer.src = selectedAudio;
  audioPlayer.play();
  playPauseBtn.textContent = '⏸️';
});

// Cambiar la velocidad de reproducción para el primer audio
speedSelect.addEventListener('change', function() {
  const speed = parseFloat(speedSelect.value);
  audioPlayer.playbackRate = speed;
});









function formatTime(time) {
   const minutes = Math.floor(time / 60);
   const seconds = Math.floor(time % 60);
   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Actualizar el tiempo y duración
audioPlayer.addEventListener('loadedmetadata', function() {
   durationElement.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', function() {
   currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
});

// Cambiar la voz
voiceSelect.addEventListener('change', function() {
   audioPlayer.src = voiceSelect.value;
   audioPlayer.play();
   playPauseBtn.textContent = '⏸️';
});

// Cambiar la velocidad de reproducción
speedSelect.addEventListener('change', function() {
   audioPlayer.playbackRate = parseFloat(speedSelect.value);
});



















//AUDIO 2//
const audioPlayer2 = document.getElementById('audioPlayer2');
const playPauseBtn2 = document.getElementById('playPauseBtn2');
const voiceSelect2 = document.getElementById('voiceSelect2');
const speedSelect2 = document.getElementById('speedSelect2');
const currentTimeElement2 = document.getElementById('currentTime2');
const durationElement2 = document.getElementById('duration2');

// Control de reproducción y pausa para el segundo audio
playPauseBtn2.addEventListener('click', function() {
  if (audioPlayer2.paused) {
    audioPlayer2.play();
    playPauseBtn2.textContent = '⏸️';
  } else {
    audioPlayer2.pause();
    playPauseBtn2.textContent = '▶️';
  }
});

// Actualizar el tiempo y duración para el segundo audio
audioPlayer2.addEventListener('timeupdate', function() {
  const currentTime = formatTime(audioPlayer2.currentTime);
  const duration = formatTime(audioPlayer2.duration);
  currentTimeElement2.textContent = currentTime;
  durationElement2.textContent = duration;
});

// Cambiar la voz para el segundo audio
voiceSelect2.addEventListener('change', function() {
  const selectedAudio = voiceSelect2.value;
  audioPlayer2.src = selectedAudio;
  audioPlayer2.play();
  playPauseBtn2.textContent = '⏸️';
});

// Cambiar la velocidad de reproducción para el segundo audio
speedSelect2.addEventListener('change', function() {
  const speed = parseFloat(speedSelect2.value);
  audioPlayer2.playbackRate = speed;
});


function formatTime(time) {
   const minutes = Math.floor(time / 60);
   const seconds = Math.floor(time % 60);
   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Actualizar el tiempo y duración
audioPlayer2.addEventListener('loadedmetadata', function() {
   durationElement.textContent = formatTime(audioPlayer.duration);
});

audioPlayer2.addEventListener('timeupdate', function() {
   currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
});

// Cambiar la voz
voiceSelect.addEventListener('change', function() {
   audioPlayer2.src = voiceSelect.value;
   audioPlayer2.play();
   playPauseBtn.textContent = '⏸️';
});

// Cambiar la velocidad de reproducción
speedSelect.addEventListener('change', function() {
   audioPlayer2.playbackRate = parseFloat(speedSelect.value);
});
