let playlists = [];
let editingPlaylist = null;

// Safe references to DOM elements
const playlistContainer = document.getElementById('playlistContainer');
const playlistForm = document.getElementById('playlistForm');
const playlistFormContainer = document.getElementById('playlistFormContainer');
const songList = document.getElementById('songList');

// Load playlists from localStorage or fetch default
async function loadPlaylists() {
  const savedPlaylists = localStorage.getItem('playlists');
  if (savedPlaylists) {
    playlists = JSON.parse(savedPlaylists);
  } else {
    const response = await fetch('./data/data.json');
    const data = await response.json();
    playlists = data.playlists;
  }

  if (playlistContainer) {
    renderPlaylists();
  }
}

// Save playlists to localStorage
function savePlaylists() {
  localStorage.setItem('playlists', JSON.stringify(playlists));
}

// Render playlists to the page
function renderPlaylists() {
  if (!playlistContainer) return;

  playlistContainer.innerHTML = playlists.map(playlist => `
    <div class="playlist-card" data-playlist-id="${playlist.playlistID}">
      <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}">
      <div>
        <h3>${playlist.playlist_name}</h3>
        <p>By ${playlist.playlist_creator}</p>
      </div>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `).join('');

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', handleEditPlaylist);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDeletePlaylist);
  });

  savePlaylists();
}

// Handle playlist form submission
if (playlistForm) {
  playlistForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const playlistName = document.getElementById('playlistName').value;
    const playlistAuthor = document.getElementById('playlistAuthor').value;

    const songInputs = songList.querySelectorAll('.song-input');
    const songs = Array.from(songInputs).map(input => ({
      title: input.querySelector('[name="songTitle"]').value,
      artist: input.querySelector('[name="songArtist"]').value,
      duration: input.querySelector('[name="songDuration"]').value,
    }));

    const newPlaylist = {
      playlist_name: playlistName,
      playlist_creator: playlistAuthor,
      playlist_art: 'https://picsum.photos/200',
      songs: songs,
      playlistID: editingPlaylist ? editingPlaylist.playlistID : playlists.length + 1,
    };

    if (editingPlaylist) {
      playlists = playlists.map(playlist =>
        playlist.playlistID === editingPlaylist.playlistID ? newPlaylist : playlist
      );
      editingPlaylist = null;
    } else {
      playlists.push(newPlaylist);
    }

    renderPlaylists();
    playlistForm.reset();
    playlistFormContainer.style.display = 'none';
  });
}

// Handle delete button
function handleDeletePlaylist(event) {
  const playlistID = event.target.closest('.playlist-card').dataset.playlistId;
  playlists = playlists.filter(playlist => playlist.playlistID != playlistID);
  renderPlaylists();
}

// Optional: Define `handleEditPlaylist` if you're using edit functionality
function handleEditPlaylist(event) {
  const playlistID = event.target.closest('.playlist-card').dataset.playlistId;
  const playlist = playlists.find(p => p.playlistID == playlistID);
  if (!playlist) return;

  editingPlaylist = playlist;

  // Pre-fill form
  if (playlistForm) {
    document.getElementById('playlistName').value = playlist.playlist_name;
    document.getElementById('playlistAuthor').value = playlist.playlist_creator;

    songList.innerHTML = '';
    playlist.songs.forEach(song => {
      const songInput = document.createElement('div');
      songInput.className = 'song-input';
      songInput.innerHTML = `
        <input type="text" name="songTitle" value="${song.title}" placeholder="Song Title" required />
        <input type="text" name="songArtist" value="${song.artist}" placeholder="Artist" required />
        <input type="text" name="songDuration" value="${song.duration}" placeholder="Duration" required />
      `;
      songList.appendChild(songInput);
    });

    playlistFormContainer.style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit Playlist';
  }
}

// Initialize only if needed
if (playlistContainer || playlistForm) {
  loadPlaylists();
}
