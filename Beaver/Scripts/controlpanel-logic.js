var shapeSelected = false;
var selectedShapeType = "";
var selectedShapeProperty = "";
var currShape;//to keep the shpae being designed
var shapeAlignment = "nolign";
var visType = "static";

function updateShapeByCell(shape, i, j) {

    var props = collectSelectedProperties();

    for (var count = 0; count < props.length; count++)
        {

        if ((props[count] == "height") && (selectedShapeType == "rect")) {
            shape.attr({
                height: dataGrid.getDataAtCell(i, j)
            })
    }
        else if ((props[count] == "width") && (selectedShapeType == "rect")) {
        shape.attr({
            width: dataGrid.getDataAtCell(i, j)
        })
    }
        else if ((props[count] == "radius") && (selectedShapeType == "circle")) {
            shape.attr({
                r: dataGrid.getDataAtCell(i, j)
            })
        }
        else if ((selectedShapeType == "line") && (props[count] == "slope")) {
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
        } else if ((selectedShapeType == "line") && (props[count] == "angel"))
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

        } else if ((props[count] == "cwrotate"))
   {
       shape.transform("r"+ dataGrid.getDataAtCell(i, j));

        } else if ((props[count] == "ccwrotate"))
   {
       shape.transform("r" + (-dataGrid.getDataAtCell(i, j)));
   }
        else if ((props[count] == "movex")) {
       shape.transform("t" + (dataGrid.getDataAtCell(i, j))+",0");
   }
        else if ((props[count] == "movey")) {
       shape.transform("t0," + (dataGrid.getDataAtCell(i, j)));
   }
   else
   {
            console.log("Combination of " + selectedShapeType + " and " + props[count] + " has not been implemented!");
   }
    }
   return shape;
}


function generateVisualization(data) //clone a shape using a shape and for a data range 
{
    //applyOnGroup(currShape, 1, 1, 2, 2);
    if (visType == "static")
        cloneByColumnStatic(data);
    else if (visType == "animated")
        cloneByColumnAnimated(currShape, selectedShapeType, selectedShapeProperty, 2);
}

function cloneByColumnStatic(data) {

    //var data = dataGrid.getDataAtCol(column);

    var tempshape = currShape;
    var tempshapeBBox = tempshape.getBBox();

    clearVisualization();//clear previous visualizations

    var i,
        len = data.length;

    for (i = 0; i < len; i++)
    {
        var shape;

        if (data[i] != null)
        {
            if ((selectedShapeProperty == "height") && (selectedShapeType == "rect")) {

                shape = visarea.rect().attr({
                    x : 2 + (i * (tempshapeBBox.width+2)), 
                    y : 2, 
                    width : tempshapeBBox.width, 
                    height : data[i],
                    fill: "orange"
                });

                //shape.click(function () {
                //    currShape = shape;
                //    selectedShapeType = "rect";
                //    document.getElementById("rect-radio").checked = true;
                //});

                //console.log(shape);

                tempshape = shape;
            }
            else if ((selectedShapeProperty == "width") && (selectedShapeType == "rect")) {

                shape = visarea.rect().attr({
                    x: 2, 
                    y: 2 + (i * (tempshapeBBox.height + 2)),
                    width: data[i],
                    height: tempshapeBBox.height,
                    fill: "orange"
                });

                //shape.click(function () {
                //    currShape = shape;
                //    selectedShapeType = "rect";
                //    document.getElementById("rect-radio").checked = true;
                //});

                tempshape = shape;
            }
            else if ((selectedShapeProperty == "radius") && (selectedShapeType == "circle"))
            {
                shape = visarea.circle().attr({
                    cx: tempshapeBBox.x2 + parseInt(data[i]),
                    cy: tempshapeBBox.y + tempshapeBBox.height / 2,
                    r: data[i],
                    fill: "blue"
                });
                
                //shape.click(function () {
                //    currShape = shape;
                //    selectedShapeType = "circle";
                //    document.getElementById("circle-radio").checked = true;
                //});

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
                shape = visarea.path(pathString);

                //shape.click(function () {
                //    currShape = shape;
                //    selectedShapeType = "line";
                //    document.getElementById("line-radio").checked = true;
                //});

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
                shape = visarea.path(pathString);

                shape.click(function () {
                    currShape = shape;
                    selectedShapeType = "line";
                    document.getElementById("line-radio").checked = true;
                });

                //console.log(shape.getTotalLength());   
            }
            else if ((selectedShapeProperty == "ccwrotate")) {

                shape = tempshape.clone();
                shape.transform("...r" + (-data[i]));

                shape.click(function () {
                    currShape = shape;
                });

            }
            else if ((selectedShapeProperty == "cwrotate")) {

                shape = tempshape.clone();
                shape.transform("...r" + (data[i]));

                shape.click(function () {
                    currShape = shape;
                });

            }
            else if ((selectedShapeProperty == "movex")) {

                shape = tempshape.clone();
                shape.transform("...t" + (data[i])+",0");

                shape.click(function () {
                    currShape = shape;
                });

            }
            else if ((selectedShapeProperty == "movey")) {

                shape = tempshape.clone();
                shape.transform("...t0," + (data[i]));

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

function cloneByColumnAnimated(data)
{

}

function collectSelectedProperties()
{
    var checkboxes = document.getElementsByName("radios2");

    var selectedProps = [];

    for (var i = 0; i < checkboxes.length; i++)
    {
        if (checkboxes[i].checked)
            selectedProps.push(checkboxes[i].value);
    }

    return selectedProps;
}

function activateProperties(propsList)
{
    for (var i = 0; i < propsList.length; i++) {
        enableProperty(propsList[i]);
    }
}

function enableProperty(property) {
    var checkboxes = document.getElementsByName("radios2");

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value == property)
        {
            checkboxes[i].checked = true;
            return;
        }
    }
}

function deactivateProperties() {
    var checkboxes = document.getElementsByName("radios2");

    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}


function isShapeSelected() {
    var checkboxes = document.getElementsByName("radios");

    var selectedShape = null;

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked)
            selectedShape = checkboxes[i].value;
    }

    return selectedShape;
}

function deselectShape(shapeName)
{
    var checkboxes = document.getElementsByName("radios");

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value == shapeName) {
            checkboxes[i].checked = false;
            shapeSelected = false;
            return true;//shape is found and deselected
        }
    }

    return false; //could not find shape radio button
}


function clearCanvas()
{
    paper.clear();//clear canvas
    
    //selectedShapeType = "rect";
    //selectedShapeProperty = "";
    //currShape = "";
}

function clearVisualization()
{
    visarea.clear();
}


/********Shapes*******/
function lineClicked() {
    selectedShapeType = "line";
    shapeSelected = true;
}
function circleClicked() {
    selectedShapeType = "circle";
    shapeSelected = true;
}
function rectClicked() {
    selectedShapeType = "rect";
    shapeSelected = true;
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
function movexClicked() {
    selectedShapeProperty = "movex";
}
function moveyClicked() {
    selectedShapeProperty = "movey";
}
function aleftClicked() {
    shapeAlignment = "aleft";
}
function arightClicked() {
    shapeAlignment = "aright";
}
function acenterClicked() {
    shapeAlignment = "acenter";
}
function atopClicked() {
    shapeAlignment = "atop";
}
function abottomClicked() {
    shapeAlignment = "abottom";
}
function noalignClicked() {
    shapeAlignment = "noalign";
}


/********Visualization Type*******/
function staticClicked()
{
    visType = "static";
}
function animateClicked()
{
    visType = "animated";
}




/************************************/
/*      Drag and Drop on Radios     */
/************************************/

