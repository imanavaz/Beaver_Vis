var selectedShapeType = "rect";
var selectedShapeProperty = "";
var currShape;//to keep the shpae being designed


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
       var teta = dataGrid.getDataAtCell(i, j) * (Math.PI / 180);
       
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
       var teta = dataGrid.getDataAtCell(i, j) * (Math.PI / 180) * -1; //-1 for counter clockwise
       var len = parseInt(shape.getTotalLength() / 4); //half the lenght
       var offsetPoint = shape.getPointAtLength(len);

       var x1 = -(len * Math.cos(teta)) + offsetPoint.x;
       var x2 = (len * Math.cos(teta)) + offsetPoint.x;
       var y2 = (len * Math.sin(teta)) + offsetPoint.y;
       var y1 = -(len * Math.sin(teta)) + offsetPoint.y;

       var pathString = 'M' + (x1)+ ',' + (y1) + 'L' + (x2) + ',' + (y2)+ 'Z';
       shape.attr("path", pathString);

       //console.log(shape.getTotalLength());

   } else if ((selectedShapeProperty == "cwrotate"))
   {
       shape.transform("r"+ dataGrid.getDataAtCell(i, j));

   }else if ((selectedShapeProperty == "ccwrotate"))
   {
       shape.transform("r" + (-dataGrid.getDataAtCell(i, j)));
   }
   else
   {
       console.log("Combination of "+ selectedShapeType + " and " + selectedShapeProperty + " has not been implemented!");
   }

   return shape;
}


function myFunction2() //clone a shape using a shape and for a data range 
{
    //applyOnGroup(currShape, 1, 1, 2, 2);
    cloneByColumn(currShape, selectedShapeType, selectedShapeProperty, 2);
}

function cloneByColumn(data) {

    //var data = dataGrid.getDataAtCol(column);

    clearCanvas();

    var tempshape = currShape;
    var tempshapeBBox = tempshape.getBBox();

    var i,
        len = data.length;
    for (i = 0; i < len; i++)
    {
        var shape;

        if (data[i] != null)
        {
            if ((selectedShapeProperty == "height") && (selectedShapeType == "rect")) {

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
            else if ((selectedShapeProperty == "width") && (selectedShapeType == "rect")) {

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
            else if ((selectedShapeProperty == "radius") && (selectedShapeType == "circle"))
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
            else if ((selectedShapeType == "line") && (selectedShapeProperty == "slope"))
            {
                var teta = data[i] * (Math.PI / 180);

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
            else if ((selectedShapeType == "line") && (selectedShapeProperty == "angel"))
            {
                var teta = data[i] * (Math.PI / 180) * -1; //-1 for counter clockwise
                var len = parseInt(tempshape.getTotalLength() / 4); //half the lenght
                var offsetPoint = tempshape.getPointAtLength(len);

                var x1 = -(len * Math.cos(teta)) + (offsetPoint.x + i * 20);//move shapes by 20 pixels each time
                var x2 = (len * Math.cos(teta)) + (offsetPoint.x + i * 20);
                var y2 = (len * Math.sin(teta)) + (offsetPoint.y);
                var y1 = -(len * Math.sin(teta)) + (offsetPoint.y);

                var pathString = 'M' + (x1) + ',' + (y1) + 'L' + (x2) + ',' + (y2) + 'Z';
                shape = paper.path(pathString);

                shape.click(function () {
                    currShape = shape;
                    selectedShapeType = "line";
                    document.getElementById("line-radio").checked = true;
                });

                //console.log(shape.getTotalLength());   
            }
            else if ((selectedShapeProperty == "ccwrotate")) {

                shape = tempshape.clone();
                shape.transform("r" + (-data[i]));

                shape.click(function () {
                    currShape = shape;
                });

            }
            else if ((selectedShapeProperty == "cwrotate")) {

                shape = tempshape.clone();
                shape.transform("r" + (data[i]));

                shape.click(function () {
                    currShape = shape;
                });

            }
            else
            {
                console.log("Combination of "+ selectedShapeType + " and " + selectedShapeProperty + " has not been implemented!");
            }
        }
    }

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
function ccwrotateClicked() {
    selectedShapeProperty = "ccwrotate";
}
function cwrotateClicked() {
    selectedShapeProperty = "cwrotate";
}



function clearCanvas()
{
    paper.clear();//clear canvas
    //selectedShapeType = "rect";
    //selectedShapeProperty = "";
    //currShape = "";

}


//function myFunction()//apply a property on a specific shape
//{
//    updateShapeByCell(currShape, 0, 2);
//}

//function applyOnGroup(shape, fromRow, fromColumn, toRow, toColomn) {
//    var data = dataGrid.getData(fromRow, fromColumn, toRow, toColomn);

//    //console.log(data);
//}