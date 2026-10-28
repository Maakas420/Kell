# `TIME` kasutamine

`TIME` tagastab kuupäeva ja kellaaja andmed _objectina_.

### 3 põhilist funktsiooni:

```js
TIME.now(); // praegune aeg
TIME.at("2026-12-24"); // väärtused kindlal kuupäeval
TIME.on("second", (t) => {
  console.log(`${t.hour}:${t.minute}:${t.second}`);
}); // function käivitub iga kord, kui eventi ("second") väärtus muutub
```

---

## Mida `TIME.now()` tagastab

```json
{
  "iso": "2026-10-28T12:30:00",
  "unix": 1793183400,
  "isRealTime": true,
  "year": 2026,
  "isLeapYear": false,
  "daysInYear": 365,
  "month": 9,
  "monthName": "Oktoober",
  "monthsProgress": 0.75,
  "dayOfMonth": 28,
  "daysInMonth": 31,
  "daysProgress": 0.8709677419354839,
  "weekday": 2,
  "weekdayName": "Kolmapäev",
  "weekProgress": 0.2857142857142857,
  "dayOfYear": 301,
  "isoWeek": 44,
  "hour": 12,
  "hoursProgress": 0.5,
  "minute": 30,
  "minutesProgress": 0.5,
  "second": 0,
  "secondsProgress": 0
}
```

**Näiteks:** `TIME.now().monthName` tagastab `"Oktoober"`.

### Üldine

| Nimi         | Tähendus                                                    | Väärtus                    |
| ------------ | ----------------------------------------------------------- | -------------------------- |
| `iso`        | kuupäev ja kellaaeg tekstina                                | nt `"2026-10-28T12:30:00"` |
| `unix`       | sekundeid alates 1. jaanuarist 1970                         | nt 1793183400              |
| `isRealTime` | kas on väärtused on reaalajas (parameetreid pole kasutatud) | `true` / `false`           |

### Aasta

| Nimi         | Tähendus               | Väärtus          |
| ------------ | ---------------------- | ---------------- |
| `year`       | aasta                  | nt `2026`        |
| `isLeapYear` | kas on liigaasta       | `true` / `false` |
| `daysInYear` | päevi aastas           | 365 / 366        |
| `dayOfYear`  | mitmes päev aastas on  | 1–366            |
| `isoWeek`    | mitmes nädal aastas on | 1–53             |

### Kuu

| Nimi             | Tähendus                              | Väärtus                     |
| ---------------- | ------------------------------------- | --------------------------- |
| `month`          | kuu number, **algab nullist**         | 0–11 (0 = jaanuar)          |
| `monthName`      | kuu nimi                              | `"Jaanuar"` … `"Detsember"` |
| `monthsProgress` | kui kaugel on kuu maksimumväärtusest  | 0–1                         |
| `dayOfMonth`     | kuupäev                               | 1–31                        |
| `daysInMonth`    | mitu päeva on praeguses kuus          | 28–31                       |
| `daysProgress`   | kui kaugel on päev maksimumväärtusest | 0–1                         |

### Nädal

| Nimi           | Tähendus                                   | Väärtus                      |
| -------------- | ------------------------------------------ | ---------------------------- |
| `weekday`      | nädalapäeva number, **algab esmaspäevast** | 0–6 (0 = esmaspäev)          |
| `weekdayName`  | nädalapäeva nimi                           | `"Esmaspäev"` … `"Pühapäev"` |
| `weekProgress` | kui kaugel on nädal                        | 0–1                          |

### Kellaaeg

| Nimi              | Tähendus                                | Väärtus |
| ----------------- | --------------------------------------- | ------- |
| `hour`            | tund                                    | 0–23    |
| `hoursProgress`   | kui kaugel on tund maksimumväärtusest   | 0–1     |
| `minute`          | minut                                   | 0–59    |
| `minutesProgress` | kui kaugel on minut maksimumväärtusest  | 0–1     |
| `second`          | sekund                                  | 0–59    |
| `secondsProgress` | kui kaugel on sekund maksimumväärtusest | 0–1     |

---

## `TIME.on` kasutamine

`TIME.on` käivitab _functioni_ iga kord, kui väärtus ("second", "minute", "hour", "day") muutub. Need on vajalikud, et lehe sisu uueneks ilma refreshimiseta.

```js
TIME.on("second", (t) => {
  console.log(t.hour + ":" + t.minute + ":" + t.second);
});
```

| _Event_    | Käivitub                            |
| ---------- | ----------------------------------- |
| `"second"` | iga kord, kui sekund muutub         |
| `"minute"` | iga kord, kui minut muutub          |
| `"hour"`   | iga kord, kui tund muutub           |
| `"day"`    | iga kord, kui päev muutub (südaööl) |

---

## Parameetrid (testimiseks)

Lisa URL-aadressi lõppu `?`, et testida teist aega.

| Parameeter | Mida teeb                                               | Näide              |
| ---------- | ------------------------------------------------------- | ------------------ |
| `date`     | seab kuupäeva, kujul `AAAA-KK-PP`                       | `?date=2026-12-31` |
| `time`     | seab kellaaja, kujul `TT:MM` (sekundid algavad nullist) | `?time=23:59`      |
| `speed`    | kiirendab aega (10 = kümme korda kiiremini)             | `?speed=10`        |
| `freeze`   | peatab aja                                              | `?freeze`          |

Mitu parameetrit ühendatakse märgiga `&`:

```
http://127.0.0.1:5500/?date=2026-12-31&time=23:59&speed=10
```

Näites hakkab aeg jooksma 31.12.2026 kell 23:59 kümnekordsel kiirusel.
