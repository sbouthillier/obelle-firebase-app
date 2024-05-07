// Create Temperature Chart
function createTemperatureChart() {
    var chart = new Highcharts.Chart({
      time:{
        useUTC: false
      },
      chart:{ 
        renderTo:'chart-temperature',
        type: 'spline' 
      },
      series: [
        {
          name: 'DS18B20'
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
          text: 'Température Degrés Celsius' 
        }
      },
      credits: { 
        enabled: false 
      }
    });
    return chart;
  }
  