const image = document.querySelector('img');
const title = document.getElementById('title');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Elctronic chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Jacinto 3',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'metric-1',
        artist: 'Jacinto Design'
    }

];

// check if playing 
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}


function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause()
}

// play or pause evnet listener

playBtn.addEventListener('click', () => { isPlaying ? pauseSong() : playSong()});
// playBtn.addEventListener('click', () => ( isPlaying ? pauseSong() : playSong()));

// update dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Prev song 
function prevSong() {
    songIndex--;
    songIndex < 0 ? songIndex = songs.length - 1 : songIndex
    loadSong(songs[songIndex]);
    playSong();
}

// next song 
function nextSong() {
    songIndex++;
    songIndex > songs.length - 1 ? songIndex = 0 : songIndex 
    loadSong(songs[songIndex]);
    playSong();
}

// On load select first song
loadSong(songs[songIndex]);

// update progress bar and time

function updateProgressBar(e) {
    if(isPlaying){
        const {duration , currentTime} = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // calculate the display of the duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        } 

        // Delay switch duration element to avoid not a nuber
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate the display for the current time duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}

// set progress bar
function setProgressBar(e) {
    const progressWidth = this.clientWidth;
    const position = e.offsetX;
    const {duration} = music;

    music.currentTime = (position / progressWidth) * duration;

}

// event listeners 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
