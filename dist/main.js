(() => {
  "use strict";
  const e = "a8fb5a447e41ecaabda52736d06000ab",
    t = document.querySelector("#searchBar"),
    n = document.querySelector(".container"),
    a = document.querySelector(".city-name"),
    c = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  var o = (e, t) => {
      e.appendChild(t);
    },
    r = (e, t) => {
      e.classList.add(t);
    },
    d = (e) => {
      for (; e.firstChild; ) e.removeChild(e.firstChild);
    },
    m = (e, t) => {
      e.innerHTML = t;
    };
  t.addEventListener("keyup", (t) => {
    if ("Enter" === t.key) {
      const s =
        "https://api.openweathermap.org/data/2.5/forecast/?q=" +
        t.currentTarget.value.toLowerCase() +
        "&appid=" +
        e;
      (t.currentTarget.value = ""),
        fetch(s)
          .then((e) => e.json())
          .then((t) => {
            const s = t.city.coord.lon,
              i = t.city.coord.lat;
            (a.innerHTML = t.city.name),
              fetch(
                "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                  i +
                  "&lon=" +
                  s +
                  "&units=metric&exclude=minutely,hourly,alerts&appid=" +
                  e
              )
                .then((e) => e.json())
                .then((e) => {
                  console.log(
                    "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
                  ),
                    d(n);
                  for (let a = 0; a < 5; a++) {
                    const d = new Date();
                    var t = c[(d.getDay() + a) % 7];
                    const s = e.daily[a],
                      i = document.createElement("div");
                    r(i, "card"), o(n, i);
                    const l = document.createElement("div");
                    r(l, "imgBx"), o(i, l);
                    const u = document.createElement("img");
                    (u.src =
                      "http://openweathermap.org/img/wn/" +
                      s.weather[0].icon +
                      "@2x.png"),
                      o(l, u);
                    const p = document.createElement("div");
                    r(p, "contentBx"), o(i, p);
                    const h = document.createElement("h2");
                    m(h, t), o(p, h);
                    const y = document.createElement("h4");
                    m(y, s.weather[0].description), o(p, y);
                    const E = document.createElement("div");
                    r(E, "color"), o(p, E);
                    const g = document.createElement("h3");
                    o(E, g);
                    const v = document.createElement("span");
                    r(v, "current-temp"), m(v, s.temp.day + "°C"), o(E, v);
                    const f = document.createElement("div");
                    r(f, "details"), o(p, f);
                    const w = document.createElement("h3");
                    m(w, "More:"), o(f, w);
                    const C = document.createElement("span");
                    r(C, "min-temp"), m(C, s.temp.min + "°C"), o(f, C);
                    const x = document.createElement("span");
                    r(x, "max-temp"), m(x, s.temp.max + "°C"), o(f, x);
                  }
                });
          })
          .catch(
            (e) => (
              console.error("Error:", "not a place!"),
              d(n),
              alert("Are you sure you aren't holding your map upside down?")
            )
          );
    }
  });
})();
