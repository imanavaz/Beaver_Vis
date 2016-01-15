var selectedShapeType = "rect";
var selectedShapeProperty = "";
var currShape;//to keep the shpae being designed


function myFunction()//apply a property on a specific shape
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
   } else if ((selectedShapeType == "line") && (selectedShapeProperty == "angel"))
   {
       var teta = dataGrid.getDataAtCell(i, j);

       
   }
   else
   {
       console.log("This combination of shape and property has not been implemented!");
   }

   return shape;
}


function myFunction2() //clone a shape using a shape and for a data range 
{
    //applyOnGroup(currShape, 1, 1, 2, 2);
    cloneByColumn(currShape, selectedShapeType, selectedShapeProperty, 2);
}

function cloneByColumn(shape1, shapeType, prop, column) {

    var data = dataGrid.getDataAtCol(column);

    var tempshape = shape1;
    var tempshapeBBox = tempshape.getBBox();

    paper.clear();//clear canvas

    var i,
        len = data.length;
    for (i = 0; i < len; i++)
    {
        var shape;

        if (data[i] != null)
        {
            if ((prop == "height") && (shapeType == "rect")) {

                shape = paper.rect().attr({
                    x : tempshapeBBox.x + (i * (tempshapeBBox.width+2)), 
                    y : tempshapeBBox.y, 
                    width : tempshapeBBox.width, 
                    height : data[i],
                    fill: "orange"
                });

                shape.click(function () {
                    currShape = shape;
                    selectedShapeType = "rect";
                    document.getElementById("rect-radio").checked = true;
                });

                //console.log(shape);

                tempshape = shape;
            }
            else if ((prop == "width") && (shapeType == "rect")) {

                shape = paper.rect().attr({
                    x: tempshapeBBox.x, 
                    y: tempshapeBBox.y + (i * (tempshapeBBox.height + 2)),
                    width: data[i],
                    height: tempshapeBBox.height,
                    fill: "orange"
                });

                shape.click(function () {
                    currShape = shape;
                    selectedShapeType = "rect";
                    document.getElementById("rect-radio").checked = true;
                });

                tempshape = shape;
            }
            else if ((prop == "radius") && (shapeType == "circle"))
            {
                shape = paper.circle().attr({
                    cx: tempshapeBBox.x2 + parseInt(data[i]),
                    cy: tempshapeBBox.y + tempshapeBBox.height / 2,
                    r: data[i],
                    fill: "blue"
                });
                
                shape.click(function () {
                    currShape = shape;
                    selectedShapeType = "circle";
                    document.getElementById("circle-radio").checked = true;
                });

                tempshape = shape;
                tempshapeBBox = tempshape.getBBox();//update bounding box
            }
            else if ((shapeType == "line") && (prop == "slope"))
            {
                var teta = data[i];

                var l = Math.floor(tempshape.getTotalLength() / 2);
                var startpoint;

                if (i == 0)
                    startpoint = tempshape.getPointAtLength(1);
                else
                    startpoint = tempshape.getPointAtLength(l);

                b = l * Math.cos(teta);
                var x2 = b + startpoint.x;

                a = l * Math.sin(teta);
                var y2 = a + startpoint.y;

                var pathString = 'M' + startpoint.x + ',' + startpoint.y + 'L' + x2 + ',' + y2 + 'Z';
                shape = paper.path(pathString);

                shape.click(function () {
                    currShape = shape;
                    selectedShapeType = "line";
                    document.getElementById("line-radio").checked = true;
                });

                tempshape = shape;
            }
            else if ((shapeType == "line") && (prop == "angel")) {
                var teta = data[i];

                var l = Math.floor(shape.getTotalLength() / 2);
                var startpoint = shape.getPointAtLength(1);

                b = l * Math.cos(teta);
                var x2 = b + startpoint.x;

                a = l * Math.sin(teta);
                var y2 = a + startpoint.y;

                var pathString = 'M' + startpoint.x + ',' + startpoint.y + 'L' + x2 + ',' + y2 + 'Z';
                shape.attr("path", pathString);

                //console.log(pathString);
            }
        }
    }

    //console.log(data);
}



function applyOnGroup(shape, fromRow, fromColumn, toRow, toColomn)
{
    var data = dataGrid.getData(fromRow, fromColumn, toRow, toColomn);

    //console.log(data);
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
function angelClicked() {
    selectedShapeProperty = "angel";
}