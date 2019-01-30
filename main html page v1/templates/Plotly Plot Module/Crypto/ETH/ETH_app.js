var rawDataURL = "ETH_currency_daily_USD.csv";

function  init() {
    var xField = 'Date';
    var yField = 'Close';

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

        var data = prepData(rawData);
        var layout = {
            title: 'Ether Closing Price in USD',
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

        rawData.forEach(function(datum, i) {

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
    var graphLine = document.getElementById("graph");
    Plotly.restyle(graphLine, "values", [newdata]);
}




init();

