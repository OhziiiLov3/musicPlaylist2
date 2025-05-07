
// navbar -> light/dark mode

// const toggleBtn = document.getElementById("mode-toggle");
// const body = document.body;

// toggleBtn.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   toggleBtn.innerHTML = body.classList.contains("dark-mode")
//     ? '<i class="fa-solid fa-sun"></i>'
//     : '<i class="fa-solid fa-moon"></i>';
// });

// Local storage for dark mode
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

// Load saved mode from localStorage
const savedMode = localStorage.getItem("theme");
if (savedMode === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
  toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

toggleBtn.addEventListener("click", () => {
  const isDarkMode = body.classList.toggle("dark-mode");

  // Save to localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Update icon
  toggleBtn.innerHTML = isDarkMode
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});




// create cards for platlist 
const modal = document.getElementById("playlistModal");
const closeModal = modal.querySelector(".close");
const playlistImage = document.getElementById("playlistImage");
const playlistName = document.getElementById("playlistName");
const playlistCreator = document.getElementById("playlistCreator");

// Fetch JSON data from data.json file
// fetch('data/data.json')
//   .then(response => response.json())
//   .then(data => {
//     const playlists = data.playlists; 
//     createPlaylistCards(playlists);
//   })
//   .catch(error => console.error('Error fetching data:', error));


const likedPlaylists = []; // array to track liked playlist IDs as an array



const createPlaylistCards = (playlists) => {
  const container = document.querySelector(".playlist-cards");
  container.innerHTML = ""; 

  playlists.forEach((playlist) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${playlist.playlist_art}" class="card-img-top" alt="${playlist.playlist_name}">
      <div class="card-overlay">
        <i class="fas fa-play"></i>
        <span class="play-text">Play</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${playlist.playlist_name}</h5>
        <p class="card-text">${playlist.playlist_creator}</p>
        <div class="card-review">
          <i class="fa-regular fa-heart card-like-icon"></i>
          <span class="like-count">${playlist.likeCount}</span>
        </div>
      </div>
    `;

      // Like icon logic
      const likeIcon = card.querySelector(".card-like-icon");
      const likeCountSpan = card.querySelector(".like-count");
  
      likeIcon.addEventListener("click", (e) => {
        e.stopPropagation(); 
  
        const isLiked = likedPlaylists.includes(playlist.playlistID);
  
        if (isLiked) {
          playlist.likeCount--;
          likedPlaylists.splice(likedPlaylists.indexOf(playlist.playlistID), 1);
          likeIcon.classList.remove("fa-solid", "liked");
          likeIcon.classList.add("fa-regular");
        } else {
          playlist.likeCount++;
          likedPlaylists.push(playlist.playlistID);
          likeIcon.classList.remove("fa-regular");
          likeIcon.classList.add("fa-solid", "liked");
        }
  
        likeCountSpan.textContent = playlist.likeCount.toString();

        localStorage.setItem('playlists', JSON.stringify(playlists));
      });

      card.addEventListener("click", () => {
        // if (!e.currentTarget.classList.contains("card")) return;


        playlistImage.src = playlist.playlist_art;
        playlistName.textContent = playlist.playlist_name;
        playlistCreator.textContent = `created by ${playlist.playlist_creator}`;
        modal.style.display = "flex";
      

        const currentPlaylist = playlist;
      
        const modalBody = modal.querySelector(".modal-body");
      
        // Helper function to render songs
        const renderSongs = (songs) => {
          modalBody.innerHTML = "";
          songs.forEach(song => {
            const songItem = document.createElement("div");
            songItem.classList.add("song-item");
            songItem.innerHTML = `
              <div class="song-info">
                <img src="${song.cover_art}" alt="${song.title} cover" class="song-cover">
                <div>
                  <h3 class="song-title">${song.title}</h3>
                  <p class="song-artist">${song.artist} • ${song.album}</p>
                </div>
              </div>
              <span class="song-duration">${song.duration}</span>
            `;
            modalBody.appendChild(songItem);
          });
        };
 
        renderSongs(currentPlaylist.songs);
      
 
        const shuffleButton = document.getElementById("shuffleButton");
        shuffleButton.onclick = () => {
          const songs = currentPlaylist.songs;
      
          // Fisher-Yates shuffle - from google
          for (let i = songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [songs[i], songs[j]] = [songs[j], songs[i]];
          }
      
          
          renderSongs(songs);
          localStorage.setItem("playlists", JSON.stringify(playlists));
        };
      });
      ;

    container.appendChild(card);
  });
};

// Load playlists from localStorage or fetch from file
let playlists = [];
const storedData = localStorage.getItem('playlists');
if (storedData) {
  playlists = JSON.parse(storedData);
  createPlaylistCards(playlists);
} else {
  fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
      playlists = data.playlists;
      localStorage.setItem('playlists', JSON.stringify(playlists)); // Save initial data
      createPlaylistCards(playlists);
    })
    .catch(error => console.error('Error fetching data:', error));
}


closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// createPlaylistCards(playlists);

// document.querySelectorAll(".nav-links a").forEach(link => {
//     link.addEventListener("click", (e) => {
//       e.stopPropagation(); 
//     });
//   });


document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector(".footer");
    const currentYear = new Date().getFullYear();
    if (footer) {
      footer.innerHTML = `&copy; ${currentYear} Ampd. All rights reserved.`;
    } else {
      console.log("Footer not found");
    }
    console.log(footer);
  });
  