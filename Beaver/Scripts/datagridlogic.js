var dataGrid;
var container;

window.onload = function () { initGrid() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1McbaCouYOJ6fVlLuQX1W3cPm6pWn8_5eRh6tLHgcQdA/pubhtml?gid=0&single=true';

function initGrid() {

    container = document.querySelector('#myGrid');

    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true
    })
}

function showInfo(data, tabletop) {
    //alert("Successfully processed!")
    //console.log(data);

    dataGrid = new Handsontable(container, {
        data: data,
        startRows: 5,
        startCols: 5,
        minSpareCols: 10,
        //always keep at least 1 spare row at the right
        minSpareRows: 1,
        //always keep at least 1 spare row at the bottom,
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true
    });

    
}

