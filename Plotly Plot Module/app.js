var rawDataURL = "currency_daily_BTC_USD_Updated.csv";

function  init() {
    var xField = 'Date';
    var yField = 'Open';

    var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
    };

    Plotly.d3.csv(rawDataURL, function(err, rawData) {
        if(err) throw err;
        console.log(rawData);

        var data = prepData(rawData);
        var layout = {
            title: 'Bitcoin Open Price in USD',
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: {}
            },
            yaxis: {
                fixedrange: true
            }
        };

        Plotly.plot('graph', data, layout, {showSendToCloud: true});
    });

    function prepData(rawData) {
        var x = [];
        var y = [];

        console.log(rawData.length)

        rawData.forEach(function(datum, i) {
            // if(i % 0) return;

            x.push(new Date(datum[xField]));
            y.push(datum[yField]);
        });

        return [{
            mode: 'lines',
            x: x,
            y: y
        }];
    }
}


function updatePlotly(newdata) {
    var graphScatter = document.getElementById("graph");
    Plotly.restyle(graphScatter, "values", [newdata]);
}


// function getData(dataset) {
//     var data = [];
//     switch (dataset) {
//     case "dataset1":
//       data = [491, 494, 452, 457];
//       break;
//     case "dataset2":
//       data = [10, 20, 30, 37];
//       break;
//     case "dataset3":
//       data = [100, 200, 300, 23];
//       break;
//     default:
//       data = [30, 30, 30, 11];
//     }
//     updatePlotly(data);
//   }

init();

