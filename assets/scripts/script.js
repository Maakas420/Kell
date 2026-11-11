function initPage() {
  function setVariables(t) {
    document.documentElement.style.setProperty("--hour", t.hour)
    document.documentElement.style.setProperty("--hours-progress", t.hoursProgress)
  
    document.documentElement.style.setProperty("--minute", t.minute)
    document.documentElement.style.setProperty("--minutes-progress", t.minutesProgress)
  
    document.documentElement.style.setProperty("--second", t.second)
    document.documentElement.style.setProperty("--seconds-progress", t.secondsProgress)
  
  }

setVariables(TIME.now());

TIME.on("second", (t) => {
  setVariables(t);
});

}



document.addEventListener("DOMContentLoaded", initPage);
