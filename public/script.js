
window.onload = function () {
  for (let i = 0; i < TV_SHOWS.length; i++) {
    var seasons = document.getElementById("mov-" + (i + 1));
    for (let j = 0; j < TV_SHOWS[i]["seasons"].length; j++) {
      var option = document.createElement("option");
      option.text = "Season-" + (j + 1);
      option.value = j + 1;
      seasons.add(option);
    }
  }

  let t = (h = m = d = 0);
  let checkedValues = {};
  let chkvalue = {};
  for (let i = 0; i < TV_SHOWS.length; i++) {
    checkedValues[i] = new Array(TV_SHOWS[i]["seasons"].length).fill(false);
  }

  for (let i = 0; i < TV_SHOWS.length; i++) {
    chkvalue[i] = new Array(TV_SHOWS[i]["seasons"].length);
    for (let j = 0; j < TV_SHOWS[i]["seasons"].length; j++) {
      chkvalue[i][j] = new Array(TV_SHOWS[i]["seasons"][j].length).fill(false);
    }
  }

  for (let i = 0; i < TV_SHOWS.length; i++) {
    const selectElement = document.getElementById("mov-" + (i + 1));

    selectElement.addEventListener("change", (event) => {
      let s = event.target.value;

      var season = TV_SHOWS[i]["seasons"][s - 1];

      var episodes = document.getElementById("m-" + (i + 1));
      episodes.innerHTML = "";

      var sn = document.createElement("div");
      sn.className = "season-num";
      sn.innerHTML = "Season-" + s;
      episodes.appendChild(sn);

      var mato = document.createElement("div");
      mato.className = "marcar-todos";
      mato.id = "div" + (i + 1) + s;
      var I = "" + (i + 1) + s;
      mato.innerHTML =
        '<input type = "checkbox" id=' +
        I +
        " " +
        (checkedValues[i][s - 1] ? "checked" : "") +
        "><label class=\"mar\">Marcar Todos</label>";
      episodes.appendChild(mato);

      for (let j = 0; j < season.length; j++) {
        var epi = document.createElement("div");
        epi.className = "season-dropdown";

        var eimg = document.createElement("div");
        eimg.className = "season-img";
        eimg.innerHTML = '<img src="' + season[j]["image"] + '" class="season-img">';
        epi.appendChild(eimg);

        var et = document.createElement("div");
        et.className = "season-rest";
        var ID = "" + (i + 1) + season[j]["season"] + season[j]["number"];
        et.innerHTML =
          '<input type="checkbox" id=' +
          ID +
          " " +
          (chkvalue[i][s - 1][season[j]["number"] - 1] ? "checked" : "") +
          "> <label>" +
          "S" +
          season[j]["season"].toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          "E" +
          season[j]["number"].toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          ": " +
          season[j]["name"];

        var dt = document.createElement("div");
        dt.className = "date";
        dt.innerHTML = season[j]["airdate"];
        et.appendChild(dt);

        var sum = document.createElement("div");
        sum.className = "season-description";
        sum.innerHTML = season[j]["summary"];
        et.appendChild(sum);

        epi.appendChild(et);
        episodes.appendChild(epi);
      }
      var marcartodos = document.getElementById("" + (i + 1) + s);
      var time = document.getElementById("ti");

      marcartodos.addEventListener("change", () => {
        if (marcartodos.checked) {
          for (let k = 0; k < season.length; k++) {
            if (
              !document.getElementById(
                "" + (i + 1) + season[k]["season"] + season[k]["number"]
              ).checked == true
            ) {
              t += season[k]["runtime"];
              document.getElementById(
                "" + (i + 1) + season[k]["season"] + season[k]["number"]
              ).checked = true;
            }
          }
          h = Math.trunc(t / 60);
          m = t - h * 60;
          if (h >= 24) {
            d = Math.trunc(h / 24);
            h = h - d * 24;
          }

          time.innerHTML = d + " days, " + h + " hours, " + m + " minutes ";

          checkedValues[i][s - 1] = true;
          chkvalue[i][s - 1].fill(true);
        } else {
          let t1 = 0;
          for (let k = 0; k < season.length; k++) {
            if (
              !document.getElementById(
                "" + (i + 1) + season[k]["season"] + season[k]["number"]
              ).checked == false
            ) {
              t1 += season[k]["runtime"];
              document.getElementById(
                "" + (i + 1) + season[k]["season"] + season[k]["number"]
              ).checked = false;
            }
          }

          t = t - t1;
          h = Math.trunc(t / 60);
          m = t - h * 60;
          if (h >= 24) {
            d = Math.trunc(h / 24);
            h = h - d * 24;
          }

          time.innerHTML = d + " days, " + h + " hours, " + m + " minutes ";

          checkedValues[i][s - 1] = false;
          chkvalue[i][s - i].fill(false);
        }
      });

      for (let l = 0; l < season.length; l++) {
        var echeck = document.getElementById(
          "" + (i + 1) + season[l]["season"] + season[l]["number"]
        );

        echeck.addEventListener("change", () => {
          if (
            document.getElementById(
              "" + (i + 1) + season[l]["season"] + season[l]["number"]
            ).checked == true
          ) {
            t += season[l]["runtime"];
            document.getElementById(
              "" + (i + 1) + season[l]["season"] + season[l]["number"]
            ).checked = true;

            h = Math.trunc(t / 60);
            m = t - h * 60;
            if (h >= 24) {
              d = Math.trunc(h / 24);
              h = h - d * 24;
            }
            chkvalue[i][s - 1][l] = true;

            time.innerHTML = d + " days, " + h + " hours, " + m + " minutes ";
          } else {
            let t1 = 0;
            t1 += season[l]["runtime"];
            document.getElementById(
              "" + (i + 1) + season[l]["season"] + season[l]["number"]
            ).checked = false;

            t = t - t1;
            h = Math.trunc(t / 60);
            m = t - h * 60;
            if (h >= 24) {
              d = Math.trunc(h / 24);
              h = h - d * 24;
            }
            chkvalue[i][s - 1][l] = false;

            time.innerHTML = d + " days, " + h + " hours, " + m + " minutes ";
          }
        });
      }
    });
  }
};