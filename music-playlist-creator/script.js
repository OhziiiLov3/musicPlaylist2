
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
    });

    container.appendChild(card);
  });
};

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Optional: click outside to close modal
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

createPlaylistCards(data.playlists);



const footer = document.querySelector(".footer");
console.log(footer)
const currentYear = new Date().getFullYear();
footer.innerHTML = `&copy; ${currentYear} Ampd. All rights reserved.`;