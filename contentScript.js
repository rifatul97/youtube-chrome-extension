window.addEventListener("load", (event) => {
  if (document.URL.includes("watch?v=")) {
    addContinueLaterButton();
  }
});

function addContinueLaterButton() {
  let youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
  // youtubeLeftControls.insertAdjacentHTML('beforebegin', createContinueLaterButton());
  youtubeLeftControls.append(createContinueLaterButton());
}

function createContinueLaterButton() {
  let bookmarkBtn = document.createElement("button");
  bookmarkBtn.className = "video-bookmark-btn";
  bookmarkBtn.title = "Continue Later";
  bookmarkBtn.innerHTML = "Continue Later";
  bookmarkBtn.addEventListener("click", addContinueLaterHandler);
  bookmarkBtn.style = 'all: unset; cursor: pointer; padding-left: 20px;'
  return bookmarkBtn;
}


const addContinueLaterHandler = async () => {
  const newBookmark = createNewBookmark();
  let currentBookmarks = await fetchCurrentBookmarks()
  chrome.storage.sync.set({
    ["watchLaterList"]: JSON.stringify([...currentBookmarks, newBookmark])
  });

  closeCurrentTab()
}

const getVideoTime = () => {
  const currentTime = document.getElementsByClassName("ytp-time-current")[0].innerText;
  const durationTime = document.getElementsByClassName("ytp-time-duration")[0].innerText
  return currentTime + " : " + durationTime
}

const createNewBookmark = () => {
  let youtubePlayer = document.getElementsByClassName("video-stream")[0];
  const videoUrl = youtubePlayer.baseURI.split("v=")[1];
  const videoTitle = getVideoTitle();
  const currentTimeInSeconds = youtubePlayer.currentTime;
  const videoTime = getVideoTime();
  return {
    videoTitle: videoTitle,
    videoUrl: videoUrl,
    currentTimeInSeconds: currentTimeInSeconds,
    videoTime: videoTime,
    bookmarkedAt: Date.now()
  }
}

function closeCurrentTab() {
  chrome.runtime.sendMessage(
      {
          action: "REMOVE_CURRENT_TAB"
      },
      function (response) {
          // console.log("response from the bg", response)
      }
  );
}

function fetchCurrentBookmarks() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["watchLaterList"], (obj) => {
      resolve(obj["watchLaterList"] ? JSON.parse(obj["watchLaterList"]) : [])
    });
  });
};

const getVideoTitle = () => {
  const div1 = document.getElementById("above-the-fold")
  const div2 = div1.querySelector("h1")
  return div2.innerText
}




