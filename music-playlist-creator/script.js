
// navbar -> light/dark mode
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = body.classList.contains("dark-mode")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});



// create cards for platlist 
const modal = document.getElementById("playlistModal");
const closeModal = modal.querySelector(".close");
const playlistImage = document.getElementById("playlistImage");
const playlistName = document.getElementById("playlistName");
const playlistCreator = document.getElementById("playlistCreator");

// Fetch JSON data
fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    const playlists = data.playlists; 
    createPlaylistCards(playlists);
  })
  .catch(error => console.error('Error fetching data:', error));

const createPlaylistCards = (playlists) => {
  const container = document.querySelector(".playlist-cards");
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
          <span>${playlist.likeCount}</span>
        </div>
      </div>
    `;


    card.addEventListener("click", () => {
        playlistImage.src = playlist.playlist_art;
        playlistName.textContent = playlist.playlist_name;
        playlistCreator.textContent = `created by ${playlist.playlist_creator}`;
        modal.style.display = "flex";
      
        // Add playlist songs 
        const modalBody = modal.querySelector(".modal-body");
        modalBody.innerHTML = ""; 
      
        playlist.songs.forEach(song => {
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
      });



    container.appendChild(card);
  });
};

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// createPlaylistCards(playlists);



const footer = document.querySelector(".footer");
console.log(footer)
const currentYear = new Date().getFullYear();
footer.innerHTML = `&copy; ${currentYear} Ampd. All rights reserved.`;