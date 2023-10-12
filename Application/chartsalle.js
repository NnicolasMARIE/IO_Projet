"use strict";
let batbNbPers = getSalleFromBatimentNbPers("BATIMENT B");
let bathallNbPers = getSalleFromBatimentNbPers("BATIMENT A");
let batduboueNbPers = getSalleFromBatimentNbPers("DUBOUE");
let batpalNbPers = getSalleFromBatimentNbPers("PALASSOU");


let batbTemp = getSalleFromBatimentTemp("BATIMENT B");
let bathallTemp = getSalleFromBatimentTemp("BATIMENT A");
let batduboueTemp = getSalleFromBatimentTemp("DUBOUE");
let batpalTemp = getSalleFromBatimentTemp("PALASSOU");


let batbDec = getSalleFromBatimentDec("BATIMENT B");
let bathallDec = getSalleFromBatimentDec("BATIMENT A");
let batduboueDec = getSalleFromBatimentDec("DUBOUE");
let batpalDec = getSalleFromBatimentDec("PALASSOU");


let batbHum = getSalleFromBatimentHum("BATIMENT B");
let bathallHum = getSalleFromBatimentHum("BATIMENT A");
let batduboueHum = getSalleFromBatimentHum("DUBOUE");
let batpalHum = getSalleFromBatimentHum("PALASSOU");


let batbLum = getSalleFromBatimentLum("BATIMENT B");
let bathallLum = getSalleFromBatimentLum("BATIMENT A");
let batduboueLum = getSalleFromBatimentLum("DUBOUE");
let batpalLum = getSalleFromBatimentLum("PALASSOU");


let batbCO2 = getSalleFromBatimentCO2("BATIMENT B");
let bathallCO2 = getSalleFromBatimentCO2("BATIMENT A");
let batduboueCO2 = getSalleFromBatimentCO2("DUBOUE");
let batpalCO2 = getSalleFromBatimentCO2("PALASSOU");


const labels = ['A', 'Duboue', 'Palassou', 'B'];


const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];


const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];




function getSalleFromBatimentNbPers(batiment) {
    let total_pers = 0;
    let count = 0;
    const salleNbPers = Donnees.filter((el) => el.batiment.includes(batiment))
        .map((e,i) => {
            total_pers += e.capacite_salle;
            count++;
        });
    return Math.round(total_pers/count, 10);
}

const ctxNbPers = document.getElementById('myChartNbPers').getContext('2d');
const myChartNbPers = new Chart(ctxNbPers, {
    type: 'bar',
    data: {
        labels : labels,
        datasets: [{
            label: 'Nombre moyen de personnes par bâtiment',
            data: [bathallNbPers,batduboueNbPers,batpalNbPers,batbNbPers,0,70],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});





function getSalleFromBatimentTemp(batiment) {
    let temperature = 0;
    let count = 0;
    const salleTemp = Donnees.filter((el) => el.batiment.includes(batiment))
        .map((e,i) => {
            temperature += e.temperature;
            count++;
        });
    return Math.round(temperature/count, 10);
}

const ctxTemp = document.getElementById('myChartTemp').getContext('2d');
const myChartTemp = new Chart(ctxTemp, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Température moyenne par bâtiment',
            data: [bathallTemp,batduboueTemp,batpalTemp,batbTemp,0,70],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});



function getSalleFromBatimentDec(batiment) {
    let decibel = 0;
    let count = 0;
    const salleDec = Donnees.filter((el) => el.batiment.includes(batiment))
        .map((e,i) => {
            decibel += e.decibel;
            count++;
        });
    return Math.round(decibel/count, 10);
}

const ctxDec = document.getElementById('myChartDec').getContext('2d');
const myChartDec = new Chart(ctxDec, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Decibel moyens par bâtiment',
            data: [bathallDec,batduboueDec,batpalDec,batbDec,0,70],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});




function getSalleFromBatimentHum(batiment) {
    let humidite = 0;
    let count = 0;
    const salleHum = Donnees.filter((el) => el.batiment.includes(batiment))
        .map((e,i) => {
            humidite += parseInt(e.humidite,10);
            count++;
        });
    return Math.round(humidite/count, 10);
}

const ctxHum = document.getElementById('myChartHum').getContext('2d');
const myChartHum = new Chart(ctxHum, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Humidité moyenne par bâtiment en %',
            data: [bathallHum,batduboueHum,batpalHum,batbHum,0,70],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});




function getSalleFromBatimentLum(batiment) {
    let lumiere = 0;
    let count = 0;
    const salleLum = Donnees.filter((el) => el.batiment.includes(batiment))
        .map((e,i) => {
            lumiere += e.lumiere;
            count++;
        });
    return Math.round(lumiere/count, 10);
}

const ctxLum = document.getElementById('myChartLum').getContext('2d');
const myChartLum = new Chart(ctxLum, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Luminosité moyenne par bâtiment',
            data: [bathallLum,batduboueLum,batpalLum,batbLum,0,70],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});




function getSalleFromBatimentCO2(batiment) {
    let co2 = 0;
    let count = 0;
    const salleCO2 = Donnees.filter((el) => el.batiment.includes(batiment))
        .map((e,i) => {
            co2 += e.C02;
            count++;
        });
    return Math.round(co2/count, 10);
}

const ctxCO2 = document.getElementById('myChartCO2').getContext('2d');
const myChartCO2 = new Chart(ctxCO2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'CO2 moyen rejeté par bâtiment',
            data: [bathallCO2,batduboueCO2,batpalCO2,batbCO2,0,70],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
        }]
    }
});