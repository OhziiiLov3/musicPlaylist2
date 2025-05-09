# Music Playlist Explorer

**By:** Keith L. Baskerville Jr
**Estimated Time Spent:**  5.5 hours
**Deployed Application:** [Ampd Music Playlist](https://ampdmusic.netlify.app/)

## Application Features
### Feature Page 
![Ampd- Featured Page](https://i.imgur.com/ZGC5QRI.png)
### Playlist Page
![Ampd- Plalist Page](https://i.imgur.com/wkxf3Z9.png)
### CORE FEATURES

* **Display Playlists**

  * Dynamically renders playlists on the homepage.
  * Playlists are shown in a grid view with appropriately sized images (6 playlists displayed at once).
  * Fetches playlist data from a local JSON file and creates interactive playlist tiles.

* **Playlist Components**

  * Each playlist tile includes:

    * Cover image
    * Playlist name
    * Playlist author
    * Like count

* **Playlist Details**

  * A modal pop-up displays detailed information about a playlist when clicked:

    * Cover image
    * Playlist name
    * Playlist author
    * List of songs with title, artist, and duration.
  * The modal is visually distinct (floating with a darker backdrop).

* **Like Playlists**

  * Users can like or unlike playlists by clicking a heart icon:

    * Clicking the heart increases the like count and changes its appearance.
    * Clicking the heart again decreases the like count and reverts its appearance.

* **Shuffle Songs**

  * A shuffle button in the playlist's detail modal rearranges the playlist songs in a random order.

---

### STRETCH FEATURES

* **Add New Playlists**

  * Users can create new playlists by filling out a form:

    * Name
    * Author
    * Cover image
    * Add multiple songs with title, artist, and duration.
  * The new playlist is displayed in the grid view.

* **Edit Existing Playlists**


### Technologies Used

* **HTML5**
* **CSS**
* **JavaScript** (ES6)
* **JSON** for playlist data storage

### Future Enhancements

* Implementing an API for backend integration.
* Adding user authentication and profiles.
* Enabling playlist sharing options.
