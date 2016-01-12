var selectedShapeType = "";
var selectedShapeProperty = "";
var currshape;//to keep the shpae being designed


function myFunction()
{
    

    if (selectedShapeType == "rect")
    {
        //currshape.size = new Size(50,100);
        

        
    }
    else if (selectedShapeType == "circle")
    {
        currshape.fillColor = "red";
    }
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

