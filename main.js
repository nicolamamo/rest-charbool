$(document).ready(function(){
// chiamata ajax
    $.ajax({
        'url':'http://157.230.17.132:4012/sales',
        'method': 'GET',
        'success':function(data){
            totale_mese(data); //avvia funzione per sommare gli amount
            primo_grafico(data);//inserisci
        },
        'error':function(){
            console.log('errore');
        }
    })

//funzione per dare a ogni mese il totle di quanità venduta
function totale_mese(data){
    //creo un array con la quantità venduta per ogni mese = 0
    var spese_mese ={
    'January': 0,
    'February': 0,
    'March': 0,
    'April': 0,
    'May': 0,
    'June': 0,
    'July': 0,
    'August': 0,
    'September': 0,
    'October': 0,
    'November': 0,
    'December': 0
    }
    // ciclo tutti gli elementi dell' array
    for (var i = 0; i < data.length; i++) {
        // creo una variabile per ogni oggetto ciclato
        var oggetto = data[i];
        //seleziono la quantità venduta per ogni oggetto
        var quantita = oggetto.amount;
        //seleziono la data dell' oggetto
        var data_selezionata = oggetto.date;
        //tengo solo il mese
        var mesi_vendite = moment(data_selezionata, "DD/MM/YYYY").format("MMMM");
          // console.log(data_clienti);
          spese_mese[mesi_vendite] += quantita;


    }
 // prendo chiavi e valori da mettere nel primo_grafico
 chiavi= Object.keys(spese_mese);
 valori = Object.values(spese_mese);

}

// funzione per inserire nel grafico
function primo_grafico() {
    var ctx = $('#myChart')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chiavi,
            datasets: [{
                label: 'Vendite mesili',
                data: valori,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            }]
        },
    });
}
options: {
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
   }




















});
