var canvas = document.getElementById("main-canvas");
var currshape;//to keep the shpae being designed

function onMouseUp(event) {

    if (selectedshape == "rect")
    {
        var topLeft = new Point(event.downPoint);
        var sizeHeight = event.point.y - event.downPoint.y;
        var sizeWidth = event.point.x - event.downPoint.x;
        var rectSize = new Size(sizeWidth, sizeHeight);

        var rect = new Shape.Rectangle(topLeft, rectSize);
        
        rect.strokeColor = 'black';
        rect.fillColor = 'white';

        currshape = rect;
    
        
    }
    else if (selectedshape == "circle")
    {
        var circle = new Path.Circle({
            center: event.middlePoint,
            radius: event.delta.length / 2
        });
        circle.strokeColor = 'black';
        circle.fillColor = 'white';

        currshape = circle;
    }

}