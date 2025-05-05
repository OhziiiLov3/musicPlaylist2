
// navbar

// light/dark mode
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.innerHTML = body.classList.contains("dark-mode")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

// create cards for platlist 
const createPlaylistCards = (playlists) => {
    //  console.log(data.playlists);
  const container = document.querySelector(".playlist-cards");
  data.playlists.forEach((playlist) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${playlist.playlist_art}" class="card-img-top" alt="Card Image">
            <div class="card-overlay">
                <i class="fas fa-play"></i>
                <span class="play-text">Play</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${playlist.playlist_name}</h5>
                <p class="card-text">${playlist.playlist_creator}</p>
                <div class="card-review">
                <i class="fa-regular fa-heart card-like-icon" ></i>
                <span>${playlist.likeCount}</span>
                </div>
            </div>
        `;
    container.appendChild(card);

   
  });
}

createPlaylistCards(data.playlists); 


const footer = document.querySelector(".footer");
console.log(footer)
const currentYear = new Date().getFullYear();
footer.innerHTML = `&copy; ${currentYear} Ampd. All rights reserved.`;