document.addEventListener("DOMContentLoaded", async () => {
    chrome.storage.sync.get(["bookmarks"], (data) => {
        const currentVideoBookmarks = data["bookmarks"] ? JSON.parse(data["bookmarks"]) : [];
        alert(currentVideoBookmarks.length)
        viewBookmarks(data["bookmarks"]);
    })

})

const viewBookmarks = (b) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";

    let bookmarks = JSON.parse(b)

    if (bookmarks.length > 0) {
      for (let i = 0; i < bookmarks.length; i++) {
        const bookmark = bookmarks[i];
        addNewBookmark(bookmarksElement, JSON.stringify(bookmark));
      }
    } else {
      bookmarksElement.innerHTML = '<i class="row">You did not add any new Youtube activities</i>';
    }
  
    return;
}

const addNewBookmark = (bookmarks, bookmark) => {
    const bb = JSON.parse(bookmark)
    let timewatched = bb.time;
    let description = bb.desc;

    const bookmarkTitleElement = document.createElement("div");
    const controlsElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");
  
    bookmarkTitleElement.textContent = description + " " + timewatched;
    bookmarkTitleElement.className = "bookmark-title";
    controlsElement.className = "bookmark-controls";
  
    // setBookmarkAttributes("play", onPlay, controlsElement);
    // setBookmarkAttributes("delete", onDelete, controlsElement);
  
    newBookmarkElement.id = "bookmark-" + timewatched;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", timewatched);
  
    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
    bookmarks.appendChild(newBookmarkElement);
  };