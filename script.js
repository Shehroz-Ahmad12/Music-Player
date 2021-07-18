const image=document.getElementById('image');
const title=document.getElementById('title');
const anime=document.getElementById('anime');
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
    name: 'Crazy Noisy Bizarre Town',
    displayName: 'Crazy Noisy Bizarre Town',
    anime: "JoJo's Bizarre Adventures",
    color: 'rgb(85, 3, 153)'
    
},
{
    name: 'Lost in paradise',
    displayName: 'Lost In Paradise',
    anime: "Jujutsu Kaisen" ,
    color: 'rgb(218, 59, 138)'

},
{
    name: 'Kaikai',
    displayName: 'Kaikai Kitan Jujutsu Kaisen OP',
    anime: "Jujutsu Kaisen" ,
    color: "rgb(190, 5, 5)"


},
{
    name: "Giorno's Theme" ,
    displayName: "Giorno's Theme",
    anime: "JoJo's Bizarre Adventures",
    color:"rgb(201, 164, 2)"

},
{
    name: 'Roundabout',
    displayName: 'Roundabout',
    anime: "JoJo's Bizarre Adventures" ,
    color: "red"

},
{
    name: 'World that was transparent',
    displayName: 'The world that was transparent',
    anime: "Naruto" ,
    color: "rgb(201, 98, 2)"

},
{
    name: 'Silhouette',
    displayName: 'Silhouette',
    anime: "Naruto" ,
    color: "rgb(231, 209, 6)"

},
{
    name: 'Great Days',
    displayName: 'Great Days',
    anime: "JoJo's Bizarre Adventures", 
    color: "rgb(180, 10, 75)"
},
{
    name: 'Kaguya sama',
    displayName: 'Kaguya-Sama OP',
    anime: "Kaguya-Sama Love is War" ,
    color: "palevioletred"

},
{
    name: 'Tokyo Ghoul',
    displayName: 'Tokyo Ghoul OP',
    anime: "Tokyo Ghoul", 
    color:"purple"

},
{
    name: 'Demon Slayer OP',
    displayName: 'Demon Slayer OP',
    anime: "Demon Slayer", 
    color:"rgb(17, 153, 74)"

},
{
    name: 'AOT',
    displayName: 'Shinzo Wo Sassageyo',
    anime: "Attack on Titan", 
    color:"rgb(153, 83, 3)"

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
    anime.textContent=song.anime;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
    backgroundImage.src=`backgrounds/${song.anime}.jpg`

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
value: 75,
range: "min",
slide: function (event, ui) {
    setVolume(ui.value / 100);
}
});

function setVolume(myVolume) {
var myMedia = document.getElementById("audio");
myMedia.volume = myVolume;
}
