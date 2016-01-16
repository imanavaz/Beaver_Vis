var paper = Raphael(document.getElementById("drawing-area"), "100%", "100%");

var eventStartPointX;
var eventStartPointY;

var eventEndPointX;
var eventEndPointY;


/*Mouse Events*/

paper.canvas.onmousedown = function(event) {
    eventStartPointX = event.offsetX;
    eventStartPointY = event.offsetY;

    //console.log('Down: ' + eventStartPointX, eventStartPointY);
};


paper.canvas.onmouseup = function (event) {

    //console.log('Up: ' + event.offsetX, event.offsetY);

    eventEndPointX = event.offsetX;
    eventEndPointY = event.offsetY;

    var w = Math.abs(eventEndPointX - eventStartPointX);
    var h = Math.abs(eventEndPointY - eventStartPointY);

    if (selectedShapeType == "rect") {
        var rect = paper.rect(eventStartPointX, eventStartPointY, w, h).attr({ fill: "orange" });

        rect.click(function () {
            currShape = rect;
            selectedShapeType = "rect";
            document.getElementById("rect-radio").checked = true;
        });

        currShape = rect;
    }
    else if (selectedShapeType == "circle") {
        var radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;

        var circle = paper.circle(eventStartPointX+radius, eventStartPointY+radius, radius);
        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", "blue");

        circle.click(function () {
            currShape = circle;
            selectedShapeType = "circle";
            document.getElementById("circle-radio").checked = true;
        });

        currShape = circle;
    }
    else if (selectedShapeType == "line")
    {
        //console.log('M' + eventStartPointX + ',' + eventStartPointY + 'L' + eventEndPointX + ',' + eventEndPointY + 'Z');
        var pathString = 'M' + eventStartPointX + ',' + eventStartPointY + 'L' + eventEndPointX + ','+ eventEndPointY+'Z';
        var path1 = paper.path(pathString);
        path1.attr({ "stroke-width": 2, fill: "black" });

        path1.click(function () {
            currShape = path1;
            selectedShapeType = "line";
            document.getElementById("line-radio").checked = true;
        });

        currShape = path1;

        //console.log(path1.getTotalLength());
    }

}


