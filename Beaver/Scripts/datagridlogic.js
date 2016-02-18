var dataGrid;
var container;
var selectedData = null;

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
        contextMenu: true,

        afterSelection: function (r, c, r2, c2) {
            processSelection(r, c, r2, c2);
        }
    });

}

function processSelection (r, c, r2, c2)
{
    //console.log("selected: " + r + c + r2 + c2);

    if ((r == r2) && (c == c2))//one cel has been selected
    {
        if (currShape != null)
            updateShapeByCell(currShape, r, c);
        else
            console.log("No shape has been defined!");
    }
    else if ((r != r2) && (c == c2)) //column has been selected
    {
        var data = dataGrid.getData(r, c, r2, c2);
        generateVisualization(data);
    }
    else if ((r == r2) && (c != c2)) //row has been selected
    {
        var data = dataGrid.getData(r, c, r2, c2);
        generateVisualization(data);
    }
    else
    {
        console.log("Matrix application has not been implemented yet!");
    }
}

/*function dragstart_handler(ev)
{
    console.log("dragStart");
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", selectedData);

    // Create an image and then use it for the drag image.
    var img = new Image();
    img.src = '../Images/data-img.png';
    ev.dataTransfer.setDragImage(img, 10, 10);

    // Set the drag effect to copy
    ev.dataTransfer.dropEffect = "copy";


}*/
