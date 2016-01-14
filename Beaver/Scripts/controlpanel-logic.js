var selectedShapeType = "rect";
var selectedShapeProperty = "";
var currShape;//to keep the shpae being designed


function myFunction()
{
    updateShapeByCell(currShape, 0, 2);
}

function updateShapeByCell(shape, i, j) {

    if ((selectedShapeProperty == "height") && (selectedShapeType == "rect")) {
            shape.attr({
                height: dataGrid.getDataAtCell(i, j)
            })
    }
    else if ((selectedShapeProperty == "width") && (selectedShapeType == "rect")) {
        shape.attr({
            width: dataGrid.getDataAtCell(i, j)
        })
    }
   else if ((selectedShapeProperty == "radius") && (selectedShapeType == "circle")) {
            shape.attr({
                r: dataGrid.getDataAtCell(i, j)
            })
        }
   else if ((selectedShapeType == "line") && (selectedShapeProperty == "slope")) {
       var teta = dataGrid.getDataAtCell(i, j);
       
       var l = Math.floor(shape.getTotalLength()/2);
       var startpoint = shape.getPointAtLength(1);
       
       b = l * Math.cos(teta);
       var x2 = b + startpoint.x;

       a = l * Math.sin(teta);
       var y2 = a + startpoint.y;

       var pathString = 'M' + startpoint.x + ',' + startpoint.y + 'L' + x2 + ',' + y2 + 'Z';
       shape.attr("path", pathString);
       
       //console.log(pathString);
   }

   return shape;
}


function applyOnGroup()
{

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
    selectedShapeProperty = "height";
}
function radiusClicked() {
    selectedShapeProperty = "radius";
}
function widthClicked() {
    selectedShapeProperty = "width";
}
function colorClicked() {
    selectedShapeProperty = "color";
}
function slopeClicked() {
    selectedShapeProperty = "slope";
}