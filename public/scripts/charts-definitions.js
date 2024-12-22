// Create Water Level Chart
function createWaterLevelChart() {
    let chart = new Highcharts.Chart({
      time:{
        useUTC: false
      },
      chart:{ 
        renderTo:'chart-water-level',
        type: 'spline' 
      },
      series: [
        {
          name: 'Niveau'
        }
      ],
      title: { 
        text: undefined
      },
      plotOptions: {
        line: { 
          animation: false,
          dataLabels: { 
            enabled: true 
          }
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
      },
      yAxis: {
        title: { 
          text: 'Niveau de remplissage du réservoir' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }
  