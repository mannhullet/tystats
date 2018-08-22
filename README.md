# Tystats
Tyholt Statistics aims to provide state of the art statistics for the job market of Mannhullets graduate students.

## Installation
Copy-paste all the files into a web accessible directory of your choice.

## Usage
The graphs utilize the google charts library. See their 
[list of availble chart types](https://developers.google.com/chart/interactive/docs/gallery) 
to see which plots are possible. Note that there are more types availble in the menu to the left
than those that are showcased.

To add a chart, create a div in the html file with a specific id. Set an on load callback to the draw function to 
draw the plot itself. The call contains all the information needed:

```javascript
google.charts.setOnLoadCallback(draw({
        sheetID: '1414326963',
        selector: '#office',
        type: 'pie',
        settings: {
            title: 'Kontorblokk'
        }
}));
```

The selector has to match the id of the div you want the plot to appear in. The sheet id is for the google sheets worksheet
that contains the data. The type is one of the google charts chart types. It must be defined in the `makeChart` function to be
availble. The settings contain any options that are to be passed to the chart, as described in the documentation for
each chart type.

The url to the correct google sheets spreadsheet must be set in the `draw` function to access the data.
