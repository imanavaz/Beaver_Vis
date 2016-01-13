var selectedShapeType = "";
var selectedShapeProperty = "";
var currshape;//to keep the shpae being designed


function myFunction()
{
    if (selectedShapeType == "rect")
    {
        currshape.size.width = dataGrid.getDataAtCell(2, 2);;
        currshape.size.height = 10;        
    }
    else if (selectedShapeType == "circle")
    {
        currshape.radius = 50;
    }

}


/********Shapes*******/
function lineClicked()
{
    selectedShapeType = "line";
}
function circleClicked()
{
    selectedShapeType = "circle";
}
function rectClicked()
{
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