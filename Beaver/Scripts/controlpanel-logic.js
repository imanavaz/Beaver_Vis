var selectedShapeType = "";
var selectedShapeProperty = "";
var currshape;//to keep the shpae being designed


function myFunction()
{
    //if (selectedShapeType == "rect")
    //{
    //    currshape.size.width = 50;
    //    currshape.size.height = 10;        
    //}
    //else if (selectedShapeType == "circle")
    //{
    //    currshape.radius = 50;
    //}

    console.log(dataGrid.getDataAtCell(2, 2));
}


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

