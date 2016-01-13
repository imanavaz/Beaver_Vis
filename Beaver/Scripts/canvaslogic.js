var canvas = document.getElementById("main-canvas");


function onMouseUp(event) //draw shapes on canvas
{
    if (selectedShapeType == "rect")
    {
        var topLeft = new Point(event.downPoint);
        var sizeHeight = Math.abs(event.point.y - event.downPoint.y);
        var sizeWidth = Math.abs(event.point.x - event.downPoint.x);
        var rectSize = new Size(sizeWidth, sizeHeight);

        // create a rectangle object
        var rect = new fabric.Rect({
            left: topLeft.x,
            top: topLeft.y,
            fill: 'white',
            width: sizeWidth,
            height: sizeHeight
        });

        // "add" rectangle onto canvas
        canvas.add(rect);
               
        currshape = rect;
       
    }
    else if (selectedShapeType == "circle")
    {
        var circle = new Shape.Circle(event.middlePoint,event.delta.length / 2);

        circle.strokeColor = 'black';
        circle.fillColor = 'white';

        if (currshape != null)
        {
            currshape.selected = false;
        }

        currshape = circle;
        currshape.selected = true;
    }
    else if (selectedShapeType == "line")
    {
        var myPath = new Path();
        myPath.strokeColor = 'black';
        myPath.add(event.downPoint);
        myPath.add(event.point);

        if (currshape != null) {
            currshape.selected = false;
        }

        currshape = myPath;
        currshape.selected = true;
    }
}

function onMouseDown(event) //select shapes
{
    console.log(project.hitTest(event.point));
}





function updateCanvasSize() {
    var canvas = new fabric.Canvas('main-canvas');
    var drawingarea = document.getElementById('drawing-area');
    
    canvas.setWidth(drawingarea.clientWidth);
    canvas.setHeight(drawingarea.clientHeight);
}