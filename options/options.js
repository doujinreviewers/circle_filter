let storeSettings = () => {
  let ng_circles = document.getElementById("ng_circles").value.trim();
  let show_ng_count = document.getElementById("show_ng_count");
  let enable_top = document.getElementById("enable_top");
  let enable_ranking = document.getElementById("enable_ranking");

  chrome.storage.local.set({
    ng_circles: ng_circles,
    show_ng_count: show_ng_count.checked,
    enable_top: enable_top.checked,
    enable_ranking: enable_ranking.checked,
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
  document.getElementById('enable_ranking').checked = restoredSettings.enable_ranking;
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