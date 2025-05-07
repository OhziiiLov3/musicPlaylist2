

const featuredLeft = document.querySelector('.featured-left');
const featuredRight = document.querySelector('.featured-right');
const shuffleBtn = document.getElementById('shuffleFeatured');

async function loadData() {
  try {
    const response = await fetch('/data/data.json');
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();
    return data.playlists;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
}

function getRandomPlaylist(playlists) {
  const randomIndex = Math.floor(Math.random() * playlists.length);
  return playlists[randomIndex];
}

function renderFeaturedPlaylist(playlist) {
  featuredLeft.innerHTML = `
    <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}" />
    <div class="playlist-meta">
      <h2>${playlist.playlist_name}</h2>
      <p>By ${playlist.playlist_creator}</p>
    </div>
  `;

  featuredRight.innerHTML = playlist.songs.map(song => `
    <div class="song-item">
      <div class="song-info">
        <img src="${song.cover_art}" alt="${song.title}">
        <div class="song-details">
          <h4>${song.title}</h4>
          <p>${song.artist} &middot; ${song.album}</p>
        </div>
      </div>
      <div class="song-duration">${song.duration}</div>
    </div>
  `).join('');
}

async function initFeatured() {
  const playlists = await loadData();
  if (playlists.length === 0) return;
  const randomPlaylist = getRandomPlaylist(playlists);
  renderFeaturedPlaylist(randomPlaylist);
}

shuffleBtn.addEventListener('click', initFeatured);

initFeatured();

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
  