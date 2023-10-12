"use strict";

const temperature_min = 18;
const temperature_max = 23;
const humidite_min = 50;
const humidite_max = 60;

function Salles() {
  const salle = Donnees.map((e) => e);
  return salle;
}

function SalleParBatimentTableAnalyse() {
  GetTableSalleAnalyse();
  const salle = Salles().sort(function (a, b) {
    return a.capacite_salle - b.capacite_salle;
  });

  const info = salle
    .map((e, i) => {
      return `
        <tr class="salleAnalyseHover" onclick="analyseDonnee(
            ${i}, 
            '${e.batiment}', 
            '${e.nom_salle}',
            ${e.temperature},
            ${e.decibel},
            '${e.humidite}',
            ${e.C02},
            ${e.lumiere})
            ">
        <td style="text-align: center;">${e.batiment}</td>
          <td style="text-align: center;">${e.nom_salle}</td>
          <td style="text-align: center;">${e.capacite_salle}</td>
          <td style="text-align: center;">${e.capacite_salle_totale}</td>
          <td style="text-align: center;">${e.humidite}%</td>
          <td style="text-align: center;">${e.decibel}</td>
          <td style="text-align: center;">${e.C02}</td>
          <td style="text-align: center;">${e.lumiere}</td>
          <td style="text-align: center;">${e.temperature}</td>
        </tr>`;
    })
    .join("");
  document.getElementById("SallesParBatimentAnalyse").innerHTML = info;
}

function GetTableSalleAnalyse() {
  document.getElementById("ContentAnalyse").innerHTML = `
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col" style="text-align: center;">Batiment</th>
                <th scope="col" style="text-align: center;">Numéro de la salle</th>
                <th scope="col" style="text-align: center;">Capacité Actuelle</th>
                <th scope="col" style="text-align: center;">Capacité Total</th>
                <th scope="col" style="text-align: center;">Humidité</th>
                <th scope="col" style="text-align: center;">Intensité acoustique</th>
                <th scope="col" style="text-align: center;">CO2 en Kg</th>
                <th scope="col" style="text-align: center;">Luminosité</th>
                <th scope="col" style="text-align: center;">Temperature en °C</th>
            </tr>
        </thead>
        <tbody id="SallesParBatimentAnalyse">
        </tbody>
    </table>  
  `;
}

function analyseDonnee(
  i,
  batiment,
  nom_salle,
  temperature,
  decibel,
  humidite,
  C02,
  lumiere
) {
  let hum =
    humidite > humidite_max
      ? `<span style="color: red">Humidité trop haute<br />Pensez à aérer la pièce</span>`
      : humidite < humidite_min
      ? `<span style="color: orange">Humidité trop faible<br />Vérifiez que les fenêtres soient bien fermées</span>`
      : `<span style="color: green">Humidité normale</span>`;
  let temp =
    temperature > temperature_max
      ? `<span style="color: red">Temperature trop élevée<br />Vérifiez que le chauffage soit bien éteint</span>`
      : temperature < temperature_min
      ? `<span style="color: orange">Temperature trop faible<br />Pensez à allumer le chauffage</span>`
      : `<span style="color: green">Temperature normale</span>`;

  Swal.fire({
    title: `INFO`,
    html: `<pre>${batiment} - ${nom_salle}</pre>
            <br />${temp} - ${temperature}°C<br />
            <br />Intensité acoustique - ${decibel}<br />
           <br />${hum} - ${humidite}%<br />
            <br />C02 en Kg - ${C02}<br />
            <br />Luminosité en lumens - ${lumiere}<br />`,
  });
}

SalleParBatimentTableAnalyse();
