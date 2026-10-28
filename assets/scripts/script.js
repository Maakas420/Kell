function initPage() {
  function logTime(t) {
    console.log(`${pad(t.hour)}:${pad(t.minute)}:${pad(t.second)}`);
  }

  TIME.on("second", (t) => {
    logTime(t);
  });
}

document.addEventListener("DOMContentLoaded", initPage);
