let storeSettings = () => {
  let ng_circles = document.getElementById("ng_circles").value.trim();
  let show_ng_count = document.getElementById("show_ng_count");
  let enable_top = document.getElementById("enable_top");
  let enable_search = document.getElementById("enable_search");
  let enable_ranking = document.getElementById("enable_ranking");
  let enable_announce = document.getElementById("enable_announce");
  let enable_new = document.getElementById("enable_new");

  chrome.storage.local.set({
    ng_circles: ng_circles,
    show_ng_count: show_ng_count.checked,
    enable_top: enable_top.checked,
    enable_search: enable_search.checked,
    enable_ranking: enable_ranking.checked,
    enable_announce: enable_announce.checked,
    enable_new: enable_new.checked,
  }, updateStatus);
}

let updateUI = (restoredSettings) => {
  let ng_circles = document.getElementById("ng_circles");
  if (typeof restoredSettings.ng_circles !== "undefined") {
    ng_circles.value = restoredSettings.ng_circles;
  } else {
    ng_circles.value = "";
  }

  document.getElementById('show_ng_count').checked = restoredSettings.show_ng_count;
  document.getElementById('enable_top').checked = restoredSettings.enable_top;
  document.getElementById('enable_search').checked = restoredSettings.enable_search;
  document.getElementById('enable_ranking').checked = restoredSettings.enable_ranking;
  document.getElementById('enable_announce').checked = restoredSettings.enable_announce;
  document.getElementById('enable_new').checked = restoredSettings.enable_new;
}

const gettingStoredSettings = chrome.storage.local.get(updateUI);

let updateStatus = () => {
  let status = document.getElementById('status');
  status.textContent = "セーブしました。";
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

document.getElementById("save").addEventListener("click", storeSettings);