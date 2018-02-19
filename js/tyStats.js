// Load the Visualization API and the piechart package.
google.charts.load('current', {
    'packages': ['corechart']
});

window.onload = function() {
    // Set the callbacks to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(draw({
        sheetID: '1414326963',
        selector: '#office',
        type: 'pie',
        settings: {
            title: 'Kontorblokk'
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '466014968',
        selector: '#profile',
        type: 'pie',
        settings: {
            title: 'Hovedprofil'
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '1605300629',
        selector: '#gender',
        type: 'pie',
        settings: {
            title: 'Kjønn'
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '2103830208',
        selector: '#signed',
        type: 'column',
        settings: {
            title: 'Signeringer',
            chartArea: {
                left: 50,
                right: 20
            }
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '1092151474',
        selector: '#distance',
        type: 'histogram',
        settings: {
            title: 'Avstand til arbeidsplass',
            legend: {position: 'none'},
            hAxis: {title: 'Avstand [nm]'},
            histogram: {hideBucketItems: true}
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '702567731',
        selector: '#shoes',
        type: 'column',
        settings: {
            title: 'Skostørrelse',
            chartArea: {
                left: 50,
                right: 20
            }
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '842975833',
        selector: '#bloodtype',
        type: 'pie',
        settings: {
            title: 'Blodtype'
        }
    }));
    google.charts.setOnLoadCallback(draw({
        sheetID: '996751350',
        selector: '#jobs',
        type: 'pie',
        settings: {
            title: 'Andel med jobb'
        }
    }));
};

/**
 * Helper function to create the correct chart object
 *
 * @param {object} options Option object for the chart being created.
 * @return {object} A Google chart object.
 */
function makeChart(options) {
    var element = document.querySelector(options.selector);
    switch (options.type) {
        case 'pie':
            return new google.visualization.PieChart(element);
        case 'bar':
            return new google.visualization.BarChart(element);
        case 'column':
            return new google.visualization.ColumnChart(element);
        case 'scatter':
            return new google.visualization.ScatterChart(element);
        case 'bubble':
            return new google.visualization.BubbleChart(element);
        case 'histogram':
            return new google.visualization.Histogram(element);
        default:
            throw 'Error in makeChart(): No match for chart type';
    }
}

/**
 * Helper function to handle the google charts response
 *
 * @param {object} response The Google charts response object.
 * @param {object} options Option object for the chart being created.
 */
function handleResponse(response, options) {
    if (response.isError()) {
        console.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();

    var chart = makeChart(options);
    chart.draw(data, options.hasOwnProperty('settings') ? options.settings : {});
}

/**
 * Draw a chart with the options specified, fetching data from a google sheet
 *
 * @param {object} options Option object for the chart being created.
 */
function draw(options) {
    var url = "https://docs.google.com/spreadsheets/d/1Pso01hfgDkkuip0voR9QlZ-BT76ZgeBLYy-Nnj09s5Y/gviz/tq";
    var settings = "?headers=1&gid=" + options.sheetID;

    // Add default settings for chart size, unless overridden
    if (!options.settings.hasOwnProperty('chartArea')) {
        options.settings.chartArea = {
            left: 40,
            width: '100%'
        };
    }

    var query = new google.visualization.Query(url + settings);
    query.send(function(r) {
        handleResponse(r, options);
    });
}
