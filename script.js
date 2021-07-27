const image=document.getElementById('image');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const backgroundImage=document.getElementById('main-img');

const playerContainer=document.getElementById('player-container');

const music=document.querySelector('audio');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

const durationEl=document.getElementById('duration');
const currentTimeEl=document.getElementById('current-time');

const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');


const songs=[
    {
    name: 'The less I know the better',
    displayName: 'The Less I Know The Better',
    artist: "Tame Impala",
    color: 'rgb(85, 3, 153)'
    
},
{
    name: 'Adventure of a lifetime',
    displayName: 'Adventure of a Lifetime',
    artist: "Coldplay" ,
    color: 'rgb(9, 150, 56)'

},
{
    name: 'Chlorine',
    displayName: 'Chlorine',
    artist: "Twenty One Pilots" ,
    color: " rgb(12, 108, 187)"


}
];

let isPlaying=false;

function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','Pause')
    music.play();
}

function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','Play')
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong():playSong() ) );



function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
    backgroundImage.src=`backgrounds/${song.artist}.jpg`

    playerContainer.style.backgroundColor=song.color;
    progress.style.backgroundColor=song.color;
    progress.style.filter="brightness(50%)";

}

let songIndex=0;

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}



function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime }= e.srcElement;
        const progressPer= (currentTime/duration)*100;
        progress.style.width=`${progressPer}%`;

        const durationMinutes=Math.floor(duration/60);
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes=Math.floor(currentTime/60);
        let currentSeconds=Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}


function setProgressBar(e){ 
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width)*duration;
}



loadSong(songs[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

$("#volume").slider({

min: 0,
max: 100,
value: 50,
range: "min",
slide: function (event, ui) {
    setVolume(ui.value / 100);
}
});

function setVolume(myVolume) {
var myMedia = document.getElementById("audio");
myMedia.volume = myVolume;
}
