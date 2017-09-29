
// Initialzie the soundcloud playlist
SC.initialize({ client_id: 'BLIKpIMvNL9As25CHX4l9xXLu7KuU5uF'  });



//Jukebox constructor

function Jukebox(){
  this.playlist = [];
  this.currentSong = 0;
  SC.get(`/users/19252023/tracks`).then((response) => {
      let newResponse = response.map(function(data){
        return {
          id: data.id,
          title: data.title,
          artwork_url: data.artwork_url,
          created_at: data.created_at,
          permalink_url: data.permalink_url
        };
      });
      this.playlist.push( ...newResponse );
  });
}

      let myJukebox = document.querySelector(".jukebox"),
         elPlayer = document.querySelector("audio"), 
         elCurrentSong = document.querySelector(".track_name"),
         elControls = document.getElementById("songControls") 
         elSongImage = document.querySelector(".track_img"),
         elPauseContainer = document.querySelector(".pause_container")
         elRewind = document.getElementById("rewind"),
         elPlay = document.getElementById("play"),
         elPause = document.getElementById("pause"),
         elCreatedAt = document.getElementById("created_at"),
         elPermaLink = document.getElementById("permalink_url"),
         elFastForw = document.getElementById("fast-forward");


Jukebox.prototype = {
  back: function(){

  },
  play: function(){
    //if there already is a song -> let it play
      let song =  this.playlist[this.currentSong];
      if(song.player){
        song.player.play();
        //if there is no song, grab from playlist and play a song;
      } else {
        SC.stream('/tracks/' + song.id).then((player) => {
        song.player = player;
        player.play();
      });
    }
  },
  pause: function(){
    let song = this.playlist[this.currentSong];
    if(song.player){
      return song.player.pause();
    }
  },
  forward: function(){
      this.currentSong ++;
      return jukebox.play();
    
  },

  display: function(){
    elSongImage.src = this.playlist[this.currentSong].artwork_url;
    elCurrentSong.innerHTML = this.playlist[this.currentSong].title;
    elCreatedAt.innerText = this.playlist[this.currentSong].created_at;
    elPermaLink.innerText = this.playlist[this.currentSong].permalink_url;
  }
}

let jukebox = new Jukebox();


document.addEventListener("DOMContentLoaded", function(){


  document.getElementById("songControls").addEventListener("click", function(event){

      if(event.target == elRewind){
        jukebox.back();
      } else if(event.target == elPlay){
        jukebox.display();
        jukebox.play();
      } else if(event.target == elPause){
        jukebox.pause();
      } else if(event.target == elFastForw){      
        jukebox.forward();
        jukebox.display();

      }
  });

  elPause.addEventListener("mouseover", function(event){
      event.target.style = "none";
  });






});