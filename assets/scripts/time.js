const TIME = (() => {
  const params = new URLSearchParams(location.search);
  const realStart = Date.now();
  const speed = Number(params.get("speed")) || 1;
  const freeze = params.has("freeze");
  const isRealTime = !["date", "time", "speed", "freeze"].some((key) =>
    params.has(key),
  );

  let simStart = realStart;
  const base = new Date(realStart);
  if (params.has("date")) {
    const [y, m, d] = params.get("date").split("-").map(Number);
    base.setFullYear(y, m - 1, d);
  }
  if (params.has("time")) {
    const [hh, mm] = params.get("time").split(":").map(Number);
    base.setHours(hh, mm || 0, 0, 0);
  }
  simStart = base.getTime();

  function currentDate() {
    if (freeze) return new Date(simStart);
    return new Date(simStart + (Date.now() - realStart) * speed);
  }

  function dayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 1);
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.round((today - start) / 86400000) + 1;
  }

  function isoWeek(d) {
    const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = x.getUTCDay() || 7;
    x.setUTCDate(x.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(x.getUTCFullYear(), 0, 1));
    return Math.ceil(((x - yearStart) / 86400000 + 1) / 7);
  }

  function isLeap(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }

  function daysInMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  function monthName(d) {
    const month = d.getMonth();
    const monthNames = [
      "Jaanuar",
      "Veebruar",
      "Märts",
      "Aprill",
      "Mai",
      "Juuni",
      "Juuli",
      "August",
      "September",
      "Oktoober",
      "November",
      "Detsember",
    ];
    return monthNames[month];
  }

  function weekday(d) {
    return (d.getDay() + 6) % 7;
  }

  function weekdayName(d) {
    const day = weekday(d);
    const dayNames = [
      "Esmaspäev",
      "Teisipäev",
      "Kolmapäev",
      "Neljapäev",
      "Reede",
      "Laupäev",
      "Pühapäev",
    ];
    return dayNames[day];
  }

  const listeners = { second: [], minute: [], hour: [], day: [] };

  function build(d) {
    return Object.freeze({
      iso:
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
        `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
      unix: Math.floor(d.getTime() / 1000),
      isRealTime,

      year: d.getFullYear(),
      isLeapYear: isLeap(d.getFullYear()),
      daysInYear: isLeap(d.getFullYear()) ? 366 : 365,
      month: d.getMonth(),
      monthName: monthName(d),
      monthsProgress: d.getMonth() / 12,
      dayOfMonth: d.getDate(),
      daysInMonth: daysInMonth(d),
      daysProgress: (d.getDate() - 1) / daysInMonth(d),
      weekday: weekday(d),
      weekdayName: weekdayName(d),
      weekProgress: weekday(d) / 7,
      dayOfYear: dayOfYear(d),
      isoWeek: isoWeek(d),

      hour: d.getHours(),
      hoursProgress: d.getHours() / 24,
      minute: d.getMinutes(),
      minutesProgress: d.getMinutes() / 60,
      second: d.getSeconds(),
      secondsProgress: d.getSeconds() / 60,
    });
  }

  function now() {
    return build(currentDate());
  }

  function at(date) {
    return build(
      typeof date === "string" && date.length <= 10
        ? new Date(date + "T12:00:00")
        : new Date(date),
    );
  }

  function on(name, fn) {
    if (!listeners[name])
      throw new Error("TIME.on: unknown event '" + name + "'");
    listeners[name].push(fn);
  }

  let last = now();
  setInterval(() => {
    const t = now();
    if (t.second !== last.second || t.minute !== last.minute)
      listeners.second.forEach((fn) => fn(t));
    if (t.minute !== last.minute || t.hour !== last.hour)
      listeners.minute.forEach((fn) => fn(t));
    if (t.hour !== last.hour || t.dayOfYear !== last.dayOfYear)
      listeners.hour.forEach((fn) => fn(t));
    if (t.dayOfYear !== last.dayOfYear || t.year !== last.year)
      listeners.day.forEach((fn) => fn(t));
    last = t;
  }, 250);

  return { now, at, on };
})();

document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  if (!output) return;

  function updateOutput(t) {
    output.innerText = JSON.stringify(t, null, 2);
  }

  updateOutput(TIME.now());
  TIME.on("second", (t) => updateOutput(t));
});
