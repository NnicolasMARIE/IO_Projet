"use strict";
let logged = false;
let counter = 1;

// Retourne la liste des Batiments
function getBatimentListe() {
  const BAT = Batiment.map((e, i) => {
    return `
          <li>
            <a class="dropdown-item" href="#" onclick="selectBatimentFromList(${i},'${e.name}')">
              ${e.name}
            </a>
          </li>`;
  })
    .sort()
    .join("");
  document.getElementById("ListeBatiment").innerHTML = BAT;
}
// Retourne la liste des salles
function getSalleListe() {
  console.log(
    Batiment.map((e, i) => {
      return `${e.salle}`;
    })
      .sort()
      .join(",")
  );
}

// Chargement du plan de l'université (b1, ... ) signifient les nom des Batiment
function MapGenerator() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicjBtMW50aWsiLCJhIjoiY2t3Yjd6YjJ1MDd5YTMxbjIzMXlncngxeiJ9.ddXF4E7xSszAhK0LZyS4QA";

  const map = new mapboxgl.Map({
    //   center: [43.313532998447435, -0.364398751262036], // starting position
    center: [-0.36383797770133697, 43.31431526329308],
    zoom: 16,
    style: "mapbox://styles/mapbox/streets-v11",
    pitch: 45,
    bearing: -17.6,
    container: "map",
    antialias: true,
  });

  map.on("load", () => {
    map.addLayer({
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    });

    // Batiment DUBOUÉ (marker et evenement)
    const duboue = new mapboxgl.Marker({
      color: Batiment[0].active == false ? "#179b82" : "red",
    })
      .setLngLat([-0.36315270683221, 43.3143374234682])
      .addTo(map);

    duboue.getElement().addEventListener("click", () => {
      selectBatimentFromList(0, Batiment[0].name);
    });

    // Batiment PALASSOU (marker et evenement)
    const palassou = new mapboxgl.Marker({
      color: Batiment[1].active == false ? "#179b82" : "red",
    })
      .setLngLat([-0.3626882454645681, 43.31478062527552])
      .addTo(map);

    palassou.getElement().addEventListener("click", () => {
      selectBatimentFromList(1, Batiment[1].name);
    });

    // Batiment HALL (marker et evenement)
    const hall = new mapboxgl.Marker({
      color: Batiment[2].active == false ? "#179b82" : "red",
    })
      .setLngLat([-0.36369330940641476, 43.313766796382026])
      .addTo(map);

    hall.getElement().addEventListener("click", () => {
      selectBatimentFromList(2, Batiment[2].name);
    });

    // Batiment B (marker et evenement)
    const bat_b = new mapboxgl.Marker({
      color: Batiment[3].active == false ? "#179b82" : "red",
    })
      .setLngLat([-0.36383797770133697, 43.31431526329308])
      .addTo(map);

    bat_b.getElement().addEventListener("click", () => {
      selectBatimentFromList(3, Batiment[3].name);
    });
  });
}

function MapCreate() {
  if (mapboxgl.getRTLTextPluginStatus() !== "loaded") {
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
    );
  }
  MapGenerator();
}

// Quand on choisi un batiment (onclick)
function selectBatimentFromList(i, e) {
  document.getElementById("ListeBatimentName").innerHTML = e;
  document.getElementById("map").innerHTML = "";
  Batiment.map((e) => (e.active = false));
  Batiment[i].active = true;
  MapCreate();
  SalleParBatimentTable(e);
  SalleParBatimentTableAnalyse(e);
}

// liste des batiments (dans le menu deroulant)
getBatimentListe();
// creation de la carte
MapCreate();
SalleParBatimentTable("", true);
SalleParBatimentTableAnalyse("");
