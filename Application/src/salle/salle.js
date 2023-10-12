"use strict";

// Affiche la moyenne de la salle (capacite_salle)
function getSalleFromBatiment(batiment, valeurVoulue) {
  let total = 0;
  let count = 0;
  const salle = Donnees.filter((el) => el.batiment.includes(batiment))
    .map((e, i) => {
      total += parseInt(e[valeurVoulue], 10);
      count++;
    })
    .join(" ");
  console.log(batiment, "-", valeurVoulue, ":", Math.round(total / count));
}

// Affiche les moyenne de chaque salle
function getMoyFromAllBat() {
  Batiment.map((e, i) => {
    getSalleFromBatiment(e.name, "temperature");
    getSalleFromBatiment(e.name, "capacite_salle");
    getSalleFromBatiment(e.name, "decibel");
    getSalleFromBatiment(e.name, "humidite");
    getSalleFromBatiment(e.name, "C02");
    getSalleFromBatiment(e.name, "lumiere");
  });
}

// retourne le nombre de salle par batiment
function CountSalleParBatiment(Batiment) {
  let nbSalle = 0;
  const salle = Donnees.filter((el) => el.batiment.includes(Batiment)).map(
    (e) => {
      nbSalle++;
    }
  );
  return nbSalle;
}

// retourne les salles du batiment
function SalleDuBatiment(Batiment) {
  const salle = Donnees.filter((el) => el.batiment.includes(Batiment)).map(
    (e) => e
  );
  return salle;
}

function SalleLibre(Batiment) {
  const salle = Donnees.filter(
    (el) => el.capacite_salle < 5 && el.batiment.includes(Batiment)
  ).map((e) => e);
  return salle;
}

function GetDefaultSallelibre() {
  const salle = Donnees.filter((el) => el.capacite_salle < 5).map((e) => e);
  return salle;
}

function SalleParBatimentTable(Batiment, all) {
  GetTableSalle();
  let salle = null;
  if (!all) {
    salle = SalleDuBatiment(Batiment).sort(function (a, b) {
      return a.capacite_salle - b.capacite_salle;
    });
  } else {
    salle = GetDefaultSallelibre().sort(function (a, b) {
      return a.capacite_salle - b.capacite_salle;
    });
  }
  const info = salle
    .map((e, i) => {
      const active = e.capacite_salle < 5 ? true : false;
      return `
        <tr style="background-color: ${
          e.capacite_salle == 0
            ? "#64EC9C"
            : e.capacite_salle < 5 && e.capacite_salle > 0
            ? "#F9E79F"
            : null
        }">
          <td style="text-align: center;">${e.nom_salle}</td>
          <td style="text-align: center;">${e.capacite_salle} / ${
        e.capacite_salle_totale
      }</td>
          <td style="text-align: center;">${e.humidite}%</td>
          <td style="text-align: center;">${e.temperature}</td>
          <td style="text-align: center;"><button ${
            active ? null : "disabled"
          } src=${i} onclick="reserver(${i}, '${
        e.nom_salle
      }')">Réserver</button></td>
        </tr>`;
    })
    .join("");
  document.getElementById("SallesParBatiment").innerHTML = info;
}

function GetTableSalle() {
  document.getElementById("Content").innerHTML = `
  <br />Salle(s) disponible à la résérvation:
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col" style="text-align: center;">Numéro de la salle</th>
                <th scope="col" style="text-align: center;">Capacité actuelle / Capacité Total</th>
                <th scope="col" style="text-align: center;">Humidité</th>
                <th scope="col" style="text-align: center;">Temperature</th>
                <th scope="col" style="text-align: center;">Selectionner</th>
            </tr>
        </thead>
        <tbody id="SallesParBatiment">
        </tbody>
    </table>  
  `;
}
