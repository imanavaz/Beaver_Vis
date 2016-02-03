var paper = Raphael(document.getElementById("drawing-area"), "100%", "100%");

var eventStartPointX;
var eventStartPointY;

var eventEndPointX;
var eventEndPointY;

var ox = null;
var oy = null;

/*Mouse Events*/

paper.canvas.onmousedown = function(event) {
    eventStartPointX = event.offsetX;
    eventStartPointY = event.offsetY;

    //console.log('Down: ' + eventStartPointX, eventStartPointY);
};


var hoverIn = function () {
    this.attr({ "fill": "#E3E3E3" });
};


var hoverOut = function () {
    this.attr({ "fill": "#000" });
}


function drag_start(e) {

};

function drag_move(dx, dy, posx, posy) {

    //shape.attr({
    //    fill: "#fa0"
    //});
    //
    // Here's the interesting part, apply an absolute transform 
    // with the dx,dy coordinates minus the previous value for dx and dy
    //
    this.attr({
        transform: "...T" + (dx - ox) + "," + (dy - oy)
    });
    //
    // store the previous versions of dx,dy for use in the next move call.
    //
    ox = dx;
    oy = dy;
}


function drag_up(e) {
    // don't forget to reset the original positions.
    ox = 0;
    oy = 0;
}

paper.canvas.onmouseup = function (event) {

    //console.log('Up: ' + event.offsetX, event.offsetY);

    eventEndPointX = event.offsetX;
    eventEndPointY = event.offsetY;

    var w = Math.abs(eventEndPointX - eventStartPointX);
    var h = Math.abs(eventEndPointY - eventStartPointY);

    if (selectedShapeType == "rect") {
        var rect = paper.rect(eventStartPointX, eventStartPointY, w, h);//.attr({ fill: "orange" });

        rect.click(function () {
            currShape = rect;
            selectedShapeType = "rect";
            document.getElementById("rect-radio").checked = true;
        });

        rect.hover(hoverIn, hoverOut, rect, rect);
        //rect.drag(drag_move, drag_start, drag_up);
        var ft = paper.freeTransform(rect);
        // Show hidden freeTransform handles
        ft.showHandles();


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


