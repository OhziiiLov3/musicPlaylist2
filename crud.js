// crud.js

const playlistFormContainer = document.getElementById('playlistFormContainer');
const playlistForm = document.getElementById('playlistForm');
const addPlaylistBtn = document.getElementById('addPlaylistBtn');
const addSongBtn = document.getElementById('addSongBtn');
const songList = document.getElementById('songList');
const playlistContainer = document.getElementById('playlistContainer');

let editingPlaylist = null; // To store the playlist being edited, if any
let playlists = [];

// Load playlists from data.json (mocked for now)
async function loadPlaylists() {
  try {
    const response = await fetch('/music-playlist-creator/data/data.json');
    if (!response.ok) throw new Error('Failed to load playlists');
    const data = await response.json();
    playlists = data.playlists;
    renderPlaylists();
  } catch (error) {
    console.error('Error loading playlists:', error);
  }
}

// Render playlists
function renderPlaylists() {
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

  // Attach event listeners to edit and delete buttons
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', handleEditPlaylist);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDeletePlaylist);
  });
}

// Handle adding a new song input field
addSongBtn.addEventListener('click', () => {
  const songInputHTML = `
    <div class="song-input">
      <input type="text" name="songTitle" placeholder="Song Title" required />
      <input type="text" name="songArtist" placeholder="Artist" required />
      <input type="text" name="songDuration" placeholder="Duration" required />
    </div>
  `;
  songList.insertAdjacentHTML('beforeend', songInputHTML);
});

// Handle form submission for adding/editing playlist
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

// Handle Edit Playlist
function handleEditPlaylist(event) {
  const playlistID = event.target.closest('.playlist-card').dataset.playlistId;
  editingPlaylist = playlists.find(playlist => playlist.playlistID == playlistID);
  
  document.getElementById('playlistName').value = editingPlaylist.playlist_name;
  document.getElementById('playlistAuthor').value = editingPlaylist.playlist_creator;
  songList.innerHTML = editingPlaylist.songs.map(song => `
    <div class="song-input">
      <input type="text" name="songTitle" value="${song.title}" required />
      <input type="text" name="songArtist" value="${song.artist}" required />
      <input type="text" name="songDuration" value="${song.duration}" required />
    </div>
  `).join('');
  
  document.getElementById('formTitle').innerText = 'Edit Playlist';
  playlistFormContainer.style.display = 'block';
}

// Handle Delete Playlist
function handleDeletePlaylist(event) {
  const playlistID = event.target.closest('.playlist-card').dataset.playlistId;
  playlists = playlists.filter(playlist => playlist.playlistID != playlistID);
  renderPlaylists();
}

// Handle Add New Playlist button
addPlaylistBtn.addEventListener('click', () => {
  editingPlaylist = null;
  playlistForm.reset();
  songList.innerHTML = '';
  document.getElementById('formTitle').innerText = 'Create Playlist';
  playlistFormContainer.style.display = 'block';
});

// Initial load
loadPlaylists();
