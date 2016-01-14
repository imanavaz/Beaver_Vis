var selectedShapeType = "rect";
var selectedShapeProperty = "";
var currShape;//to keep the shpae being designed


function myFunction() {
    if (selectedShapeType == "rect") {
        currShape.attr({
            width: dataGrid.getDataAtCell(2, 2),
            height: 10
        })
    }
    else if (selectedShapeType == "circle")
    {
        currShape.attr({
            r : dataGrid.getDataAtCell(2, 2)
        })
    }
    else if (selectedShapeType == "line")
    {
        //don't know what to do, need to alter slope of angel perhaps
    }

}


/********Shapes*******/
function lineClicked() {
    selectedShapeType = "line";
}
function circleClicked() {
    selectedShapeType = "circle";
}
function rectClicked() {
    selectedShapeType = "rect";
}



/********Properties*******/
function heightClicked() {
    selectedShapeProperty = "hegiht";
}
function widthClicked() {
    selectedShapeProperty = "width";
}
function colorClicked() {
    selectedShapeProperty = "color";
}