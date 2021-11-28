let list_songs = document.getElementById("list-song-container");
let cover_image= document.getElementById("cover-image");
let title_song= document.getElementById("title-song");
let artist_song= document.getElementById("artist-song");
let audio=document.getElementById("audio-playing");
let progress_bar = document.getElementById("progress-bar");
let volumen = document.getElementById("volume-control");
let estado = true;
volumen.value  = 1;
let progress;
let song_selected ={};
let is_playing=false;

let canciones = [
        {
            id:1,
            caratula:"img/caratula/dospuntosce.jpg",
            cancion:"audio/canciones/y2meta.com - BAD BUNNY - AMORFODA (Video Oficial) (128 kbps).mp3",
            artista:"Bad bunny",
            titulo:"Amorfoda",
        },
        {
            id:2,
            caratula:"img/caratula/esqueleto.jpeg",
            cancion:"audio/canciones/y2meta.com - CNCO - Tan Fácil (Official Video) (128 kbps).mp3",
            artista:"CNCO",
            titulo:"Tan Fácil",
        },
        {
            id:3,
            caratula:"img/caratula/laik.png",
            cancion:"audio/canciones/y2meta.com - CORAZON DE PIEDRA - TONY ROSADO - with LYRICS (128 kbps).mp3",
            artista:"Tony Rosado",
            titulo:"Corazon de piedra",
        },
        {
            id:4,
            caratula:"img/caratula/perro.jpg",
            cancion:"audio/canciones/y2meta.com - Danny Ocean - Dembow (Official Music Video) (128 kbps).mp3",
            artista:"Danny Ocean",
            titulo:"Dembow",
        },
        {
            id:5,
            caratula:"img/caratula/spaiderman.jpg",
            cancion:"audio/canciones/y2meta.com - LA ÚNICA TROPICAL - CUAL ADIÓS (128 kbps).mp3",
            artista:"La unica tropical",
            titulo:"Cual adios",
        },
        {
            id:6,
            caratula:"img/caratula/tortugaconavaja.jpg",
            cancion:"audio/canciones/y2meta.com - Maluma - Sobrio (Letra_Lyrics) (128 kbps).mp3",
            artista:"Maluma",
            titulo:"Sobrio",
        },
        {
            id:7,
            caratula:"img/caratula/unknown.png",
            cancion:"audio/canciones/y2meta.com - Por Mil Noches - AIRBAG -  Video oficial (128 kbps).mp3",
            artista:"Airbag",
            titulo:"Por mil noches",
        },
       
];
const BuildList = (canciones) => {
    list_songs.innerHTML= "";
   canciones.forEach((e)=>{ 
    list_songs.insertAdjacentHTML(
        "beforeend",
    `
    <article class="list-item" id="item-${e.id}">
    <img src="${e.caratula}">
    <div class="data-song-container">
        <h2>${e.titulo}</h2>
        <div class="artist-name">${e.artista}</div>
    </div>
</article> 
    `
    );
   });
};

const select_song = (id)=>{
  let res =  canciones.find((e)=>e.id==id);  
  if(res) {
      cover_image.src = res.caratula;
      title_song.innerHTML = res.titulo;
      artist_song.innerHTML = res.artista;
      audio.src = res.cancion;
      play_song();
  }
};

const pause_effects = ()=>{
    play_btn.innerHTML ="Play"
    cover_image.style.animationPlayState ="paused";

}
const play_effects = () =>{
    play_btn.innerHTML="Pause";
    cover_image.style.animationPlayState ="running";
}

const play_song = ()=> {
    progress_bar.value = audio.currentTime;
 audio.play();
 play_effects();    
};

volumen.addEventListener("change",()=>{
    audio.volumen = volumen.value;
})
let vol = 1;
addEventListener("keydown",(event)=>{

    if(event.key === "ArrowUp"&&vol<1)
    {
        try{
            vol = vol + 0.01;
            canciones.volume = vol
            volumen.value = canciones.volume;
        }catch(error)
        {
            console.log(error)
        }
    }
    if(event.key === "ArrowDown"&&vol>0)
    {
        try {
            vol = vol - 0.01;
            canciones.volume = vol
            volumen.value = canciones.volume;

        } catch (error) {
            console.log(error)
        }

    }
});
let id_aux = 1;

const next_song =()=>{
    if(id_aux< canciones.length){
        select_song(++id_aux); 
    }
    
};


const prev_song=()=>{
    if(id_aux>0){
        select_song(--id_aux);  
    }
    
};

const first_song=()=>{
    cover_image.src = canciones[0].caratula;
    title_song.innerHTML = canciones[0].titulo;
    artist_song.innerHTML= canciones[0].artista;
    audio.src=canciones[0].cancion;
}




let play_btn = document.getElementById("play-btn");
let next_btn = document.getElementById("next-btn");
let prev_btn = document.getElementById("prev-btn");


play_btn.addEventListener("click",()=>{
    
    if(is_playing)
    {
        audio.pause();
        pause_effects();
         is_playing=false;

    }
    else{

        audio.play();
        play_effects();
        is_playing=true;
        
    }

});




window.addEventListener("load",()=> { 
    first_song();
progress_bar.value = 0;
progress_bar.max =audio.duration;

window.setInterval(()=>{
    
},1000)
progress_bar.addEventListener("change",()=>{
audio.currentTime = progress_bar.value;
});

next_btn.addEventListener("click",()=>{
    next_song();
  });
  prev_btn.addEventListener("click",()=>{
    prev_song();
  });

list_songs.addEventListener("click",(event)=>{
if(event.target.matches("img")) {
    select_song(event.target.parentElement.id.slice(5, 6));
}
else if(event.target.matches(".data-song-container")){
    select_song(event.target.parentElement.id.slice(5, 6));

}
else if(event.target.matches(".artist-name")){
select_song(event.target.parentElement.parentElement.id.slice(5,6));
}
else if(event.target.matches("h2")){
    select_song(event.target.parentElement.parentElement.id.slice(5,6));
    }
    else if(event.target.matches(".list-item")){
        select_song(event.target.id.slice(5,6));

    }
});

});     



BuildList(canciones);        



/* */

let buscar = document.getElementById("buscar");

buscar.addEventListener("keyup", () => {
  let res = canciones.filter((e) =>
    e.titulo.toLowerCase().includes(buscar.value.toLowerCase())
  );
  if (res) {
    BuildList(res);
  }
});







