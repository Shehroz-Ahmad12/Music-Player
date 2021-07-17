const image=document.getElementById('image');
const title=document.getElementById('title');
const anime=document.getElementById('anime');


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
    anime: "JoJo's Bizarre Adventures"
    
},
{
    name: 'Lost in paradise',
    displayName: 'Lost In Paradise',
    anime: "Jujutsu Kaisen" 

},
{
    name: 'Kaikai',
    displayName: 'Kaikai Kitan Jujutsu Kaisen OP',
    anime: "Jujutsu Kaisen" 

},
{
    name: "Giorno's Theme" ,
    displayName: "Giorno's Theme",
    anime: "JoJo's Bizarre Adventures" 

},
{
    name: 'Roundabout',
    displayName: 'Roundabout',
    anime: "JoJo's Bizarre Adventures" 

},
{
    name: 'World that was transparent',
    displayName: 'The world that was transparent',
    anime: "Naruto" 

},
{
    name: 'Silhouette',
    displayName: 'Silhouette',
    anime: "Naruto" 

},
{
    name: 'Great Days',
    displayName: 'Great Days',
    anime: "JoJo's Bizarre Adventures" 

},
{
    name: 'Kaguya sama',
    displayName: 'Kaguya-Sama OP',
    anime: "Kaguya-Sama Love is War" 

},
{
    name: 'Tokyo Ghoul',
    displayName: 'Tokyo Ghoul OP',
    anime: "Tokyo Ghoul" 

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
    console.log('width',  width);
    console.log('clickX' , clickX);

    const { duration } = music;
    console.log(clickX/width);
    console.log((clickX/width)*duration);
    music.currentTime = (clickX / width)*duration;
}



loadSong(songs[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);