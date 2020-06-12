var chiavi= []
 var valori =[];
 var chiavi_secondoGr= [];
 var valori_secondoGr = [];
$(document).ready(function(){

$('#salva-vendita').click(function(){
  var venditore_scelto = $('#scelta-venditore').val();
  var mese_scelto = $('#scelta-mese').val();
  var importo_scelto = $('#importo').val();
  var data_moment = moment(mese_scelto, 'MMMM');
  var mese = data_moment.format('MM');
  var data_vendita ='01/'+mese+'2017';
$.ajax({
    'url':'http://157.230.17.132:4012/sales',
    'method': 'POST',
    'data':{
        salesman: venditore_scelto,
        date: data_vendita,
        amount:importo_scelto,
    },
    'success':function(data){
        chiamata_ajax()
    },

    'error':function() {
        console.log('errore');
    }
})

});






    chiamata_ajax();
    function chiamata_ajax(){
        $.ajax({
            'url':'http://157.230.17.132:4012/sales',
            'method': 'GET',
            'success':function(data){
                totale_mese(data);//quantita vendite per mese
                primo_grafico(data);//
                totale_singolo_venditore(data);
                secondo_grafico(data)
            },
            'error':function(){
                console.log('errore');
            }
        });

    }
// chiamata ajax

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
function primo_grafico(data) {
    $('.container').empty();
    $('.container').append('<canvas id="myChart"></canvas>');
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

options: {
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
   }

};
// quantita totale per ogni venditore
function totale_singolo_venditore(data){
    var venditore={};
    var vendite =0
    //ciclo tutti gli elementi dell' array dato da ajax
    for (var i = 0; i < data.length; i++) {
        var oggetto =data[i];
        var vendita = parseInt(oggetto.amount);
        var singolo_venditore = oggetto.salesman;
        if (venditore.hasOwnProperty(singolo_venditore)){
            venditore[singolo_venditore] += vendita

        }
        else {
            venditore[singolo_venditore] = vendita
        }

    }

    // prendo chiavi e valori da mettere nel secondo grafico
    chiavi_secondoGr= Object.keys(venditore);
    valori_secondoGr = Object.values(venditore);

}

function secondo_grafico(){
$('.container-2').empty();
$('.container-2').append('<canvas id="canvas2" width="100" height="100"></canvas>');
        var ctx = $('#canvas2')[0].getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chiavi_secondoGr,
                datasets: [{
                    label: 'singolo venditore',
                    data: valori_secondoGr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)'




                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'

                    ],
                    borderWidth: 1,
                }]
            },
        });



    };


//mettendo sopra la chiamata ajax get una chiama ajax post
















});
