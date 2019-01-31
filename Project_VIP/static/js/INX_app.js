Plotly.d3.csv("/static/csv/INX_daily_adjusted.csv", function(err, rows){

    function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
  
    
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'S&P 500 High',
    x: unpack(rows, 'Date'),
    y: unpack(rows, 'High'),
    line: {color: '#17BECF'}
  }
  
  var trace2 = {
    type: "scatter",
    mode: "lines",
    name: 'S&P 500 Low',
    x: unpack(rows, 'Date'),
    y: unpack(rows, 'Low'),
    line: {color: '#7F7F7F'}
  }
  
  var data = [trace1,trace2];
      
  var layout = {
    title: 'S&P 500 High and Low', 
    xaxis: {
      autorange: true, 
      range: ['2000-01-03', '2019-01-29'], 
      rangeselector: {buttons: [
          {
            count: 1, 
            label: '1m', 
            step: 'month', 
            stepmode: 'backward'
          }, 
          {
            count: 6, 
            label: '6m', 
            step: 'month', 
            stepmode: 'backward'
          }, 
          {step: 'all'}
        ]}, 
      rangeslider: {range: ['2000-01-03', '2019-01-29']}, 
      type: 'date'
    }, 
    yaxis: {
      autorange: true, 
      range: [86.8700008333, 138.870004167], 
      type: 'linear'
    }
  };
  
  Plotly.newPlot('graph', data, layout, {showSendToCloud: true});
  })