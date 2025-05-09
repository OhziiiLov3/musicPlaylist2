// DOM references for CRUD operations
const addPlaylistForm = document.getElementById("addPlaylistForm");
const playlistNameInput = document.getElementById("newPlaylistName");
const playlistCreatorInput = document.getElementById("newPlaylistCreator");
const songList = document.getElementById("songList");
const addSongButton = document.getElementById("addSongButton");
const playlistContainer = document.querySelector(".playlist-cards");

// Handle adding new songs to the playlist
addSongButton.addEventListener("click", (event) => {
  event.preventDefault();
  const songTitleInput = document.createElement("input");
  songTitleInput.placeholder = "Song Title";
  
  const songArtistInput = document.createElement("input");
  songArtistInput.placeholder = "Artist";
  
  const songDurationInput = document.createElement("input");
  songDurationInput.placeholder = "Duration";

  const songInputContainer = document.createElement("div");
  songInputContainer.appendChild(songTitleInput);
  songInputContainer.appendChild(songArtistInput);
  songInputContainer.appendChild(songDurationInput);
  
  songList.appendChild(songInputContainer);
});

// Handle creating a new playlist
addPlaylistForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newPlaylist = {
    playlistID: Date.now(), // Simple unique ID using timestamp
    playlist_name: playlistNameInput.value,
    playlist_creator: playlistCreatorInput.value,
    playlist_art: 'https://picsum.photos/200',
    songs: Array.from(songList.children).map((songInput) => ({
      title: songInput.querySelector("input[placeholder='Song Title']").value,
      artist: songInput.querySelector("input[placeholder='Artist']").value,
      duration: songInput.querySelector("input[placeholder='Duration']").value,
    })),
    likeCount: 0
  };

  // Add new playlist to the local storage and refresh the page
  let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  playlists.push(newPlaylist);
  localStorage.setItem("playlists", JSON.stringify(playlists));

  // Refresh the playlist cards display
  createPlaylistCards(playlists);
  addPlaylistForm.reset();
  songList.innerHTML = ""; // Clear song inputs after submission
});

// Handle editing an existing playlist
function editPlaylist(playlistID) {
  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  const playlist = playlists.find(p => p.playlistID === playlistID);

  if (playlist) {
    playlistNameInput.value = playlist.playlist_name;
    playlistCreatorInput.value = playlist.playlist_creator;
    songList.innerHTML = ''; // Clear previous song inputs

    playlist.songs.forEach((song) => {
      const songInputContainer = document.createElement("div");
      songInputContainer.innerHTML = `
        <input type="text" placeholder="Song Title" value="${song.title}" />
        <input type="text" placeholder="Artist" value="${song.artist}" />
        <input type="text" placeholder="Duration" value="${song.duration}" />
      `;
      songList.appendChild(songInputContainer);
    });

    // Handle save changes after editing
    addPlaylistForm.addEventListener("submit", (event) => {
      event.preventDefault();

      playlist.playlist_name = playlistNameInput.value;
      playlist.playlist_creator = playlistCreatorInput.value;
      playlist.songs = Array.from(songList.children).map((songInput) => ({
        title: songInput.querySelector("input[placeholder='Song Title']").value,
        artist: songInput.querySelector("input[placeholder='Artist']").value,
        duration: songInput.querySelector("input[placeholder='Duration']").value,
      }));

      // Update playlists in localStorage
      localStorage.setItem("playlists", JSON.stringify(playlists));

      createPlaylistCards(playlists);
      addPlaylistForm.reset();
      songList.innerHTML = "";
    });
  }
}

// Handle deleting a playlist
function deletePlaylist(playlistID) {
  let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  playlists = playlists.filter(p => p.playlistID !== playlistID);

  // Update playlists in localStorage
  localStorage.setItem("playlists", JSON.stringify(playlists));

  // Refresh the playlist cards display
  createPlaylistCards(playlists);
}

// Export functions to make them accessible from other files if necessary
window.editPlaylist = editPlaylist;
window.deletePlaylist = deletePlaylist;
