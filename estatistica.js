google.charts.load('current', { 'packages': ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    // Gráfico de barras
    var dataBar = google.visualization.arrayToDataTable([
        ['País', 'Medalhas'],
        ['Estados Unidos', 2654],
        ['União Soviética', 1010],
        ['Grã-Bretanha', 1103],
        ['França', 810],
        ['Alemanha', 800]
    ]);

    var optionsBar = {
        title: 'Top 5 Países com Mais Medalhas',
        titleTextStyle: {
            fontSize: 20,
            color: '#2c3e50',
            bold: true,
        },
        chartArea: { width: '60%' },
        hAxis: {
            title: 'Medalhas',
            minValue: 0,
            textStyle: {
                color: '#34495e',
            },
            titleTextStyle: {
                color: '#34495e',
            }
        },
        vAxis: {
            title: 'Países',
            textStyle: {
                color: '#34495e',
            },
            titleTextStyle: {
                color: '#34495e',
            }
        },
        colors: ['#1abc9c'],
        legend: { position: 'none' },
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out'
        }
    };

    var chartBar = new google.visualization.BarChart(document.getElementById('chart1'));
    chartBar.draw(dataBar, optionsBar);

    // Gráfico de pizza
    var dataPie = google.visualization.arrayToDataTable([
        ['País', 'Jogos'],
        ['Estados Unidos', 7],
        ['França', 5],
        ['Japão', 4],
        ['Canadá', 3],
        ['Grécia', 3],
        ['Itália', 3],
        ['Grã-Bretanha', 3],
        ['Suécia', 2],
        ['Suiça', 2],
        ['Alemanha', 2],
        ['Noruega', 2],
        ['Austrália', 2],
        ['Áustria', 2],
        ['Coreia do Sul', 2],
        ['China', 2],
        ['Bélgica', 1],
        ['Países Baixos', 1],
        ['Finlândia', 1],
        ['México', 1],
        ['União Soviética', 1],
        ['Ioguslávia', 1],
        ['Espanha', 1],
        ['Rússia', 1],
        ['Brasil', 1],
    ]);

    var optionsPie = {
        title: 'Distribuição dos Jogos Olímpicos por países-sedes (Incluindo jogos olímpicos de inverno)',
        titleTextStyle: {
            fontSize: 20,
            color: '#2c3e50',
            bold: true,
        },
        is3D: true,
        slices: {
            0: { offset: 0.1 },
            1: { offset: 0.1 },
            2: { offset: 0.1 },
            3: { offset: 0.1 },
        },
        colors: ['#1abc9c', '#3498db', '#f39c12', '#e74c3c', '#9b59b6', '#2ecc71'],
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out'
        }
    };

    var chartPie = new google.visualization.PieChart(document.getElementById('chart2'));
    chartPie.draw(dataPie, optionsPie);
}
