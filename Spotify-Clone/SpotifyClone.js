console.log("Welcome to spotify");
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('../1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongPlay = document.getElementById('masterSongPlay');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mere Mehboob",         filePath: "../1.mp3", coverPath: "cover1.jpg"},
    {songName: "Tauba Tauba",          filePath: "../2.mp3", coverPath: "cover2.jpg"},
    {songName: "Jaanam",               filePath: "../3.mp3", coverPath: "cover3.jpg"},
    {songName: "Haule Haule",          filePath: "../4.mp3", coverPath: "cover4.jpg"},
    {songName: "2 Number",             filePath: "../5.mp3", coverPath: "cover5.jpg"},
    {songName: "2 Velly",              filePath: "../6.mp3", coverPath: "cover6.jpg"},
    {songName: "2 Persent",            filePath: "../7.mp3", coverPath: "cover7.jpg"},
    {songName: "Sayian Dheere Dheere", filePath: "../8.mp3", coverPath: "cover8.jpg"},
    {songName: "Kanna Vich Waaliyan",  filePath: "../9.mp3", coverPath: "cover9.jpg"},
    {songName: "Tell me once",         filePath: "../10.mp3", coverPath: "cover10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
} 

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `../${songIndex+1}.mp3`;
        masterSongPlay.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play(); 
        gif.style.opacity = 1; 
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `../${songIndex+1}.mp3`;
    masterSongPlay.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `../${songIndex+1}.mp3`;
    masterSongPlay.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});