﻿var paper = Raphael(document.getElementById("drawing-area"), "100%", "100%");
var visarea = Raphael(document.getElementById("vis-area"), "100%", "100%");


var eventStartPointX;
var eventStartPointY;

var eventEndPointX;
var eventEndPointY;

//var refAttrs = null;

/*Mouse Events*/

paper.canvas.onmousedown = function(event) {

    if (shapeSelected) {
        eventStartPointX = event.offsetX;
        eventStartPointY = event.offsetY;
    }
    else
    {
        //perhaps stop event from propagating as well!
        return;
    }
    //console.log('Down: ' + eventStartPointX, eventStartPointY);
};


paper.canvas.onmouseup = function (event) {

    //console.log(event.target);
    //console.log(paper);

    if (shapeSelected) //drawing a shape
    {
        eventEndPointX = event.offsetX;
        eventEndPointY = event.offsetY;

        var w = Math.abs(eventEndPointX - eventStartPointX);
        var h = Math.abs(eventEndPointY - eventStartPointY);

        if (selectedShapeType == "rect") {
            var rect = paper.rect(eventStartPointX, eventStartPointY, w, h);//.attr({ fill: "orange" });

            rect.hover(hoverIn, hoverOut, rect, rect);
            
            var ft = paper.freeTransform(rect,
                    { rotate: 'axisX', scale: ['bboxCorners', 'bboxSides'], keepRatio: 'bboxCorners', draw: 'bbox' }, function (ft, events) {

                infareInteraction(events);//analyse events and infare interaction
                //console.log(events);
                //if (events.indexOf('drag start') != -1) {
                //    eventFlag = false;
                //}
            });
            

            //refAttrs = (cloneObject(ft.attrs)); //base attributes
            //console.log("ref:" + refDimention);

            // Show hidden freeTransform handles
            ft.showHandles();

            deselectShape("rect");

            currShape = rect;
        }
        else if (selectedShapeType == "circle") {
            var radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;

            var circle = paper.circle(eventStartPointX + radius, eventStartPointY + radius, radius);
            // Sets the fill attribute of the circle to blue
            circle.attr("fill", "#FFF");

            circle.hover(hoverIn, hoverOut, circle, circle);

            var ft = paper.freeTransform(circle, { rotate: 'axisX', scale: ['bboxCorners', 'bboxSides'], keepRatio: 'bboxCorners', draw: 'bbox' }, function (ft, events) {

                infareInteraction(events);//analyse events and infare interaction
                
            });
            
            // Show hidden freeTransform handles
            ft.showHandles();

            deselectShape("circle");

            currShape = circle;
        }
        else if (selectedShapeType == "line") {
            //console.log('M' + eventStartPointX + ',' + eventStartPointY + 'L' + eventEndPointX + ',' + eventEndPointY + 'Z');
            var pathString = 'M' + eventStartPointX + ',' + eventStartPointY + 'L' + eventEndPointX + ',' + eventEndPointY + 'Z';
            var path1 = paper.path(pathString);
            path1.attr({ "stroke-width": 2 });//, fill: "black" });

            path1.hover(hoverInPath, hoverOutPath, path1, path1);

            var ft = paper.freeTransform(path1, { rotate: 'axisX', scale: ['bboxCorners', 'bboxSides'], keepRatio: 'bboxCorners', draw: 'bbox' }, function (ft, events) {
                
                infareInteraction(events);//analyse events and infare interaction

            });

            // Show hidden freeTransform handles
            ft.showHandles();

            deselectShape("line");

            currShape = path1;

            //console.log(path1.getTotalLength());
        }
    }

}



var hoverIn = function () {
    this.attr({ "fill": "#E3E3E3" });
};

var hoverOut = function () {
    this.attr({ "fill": "#FFF" });
}

var hoverInPath = function () {
    this.attr({ "stroke": "#566573" });
};

var hoverOutPath = function () {
    this.attr({ "stroke": "#000" });
}




function infareInteraction(events)
{
    var alteredProps = [];

    if ((events.indexOf("drag end") != -1))// || (events.indexOf("drag end") != -1))
    {
        alteredProps.push("movex");
        alteredProps.push("movey");
    }

    if ((events.indexOf("rotate end") != -1) )//|| (events.indexOf("drag end") != -1)) {
    {
        alteredProps.push("ccwrotate");
        alteredProps.push("cwrotate");
    }

    if ((events.indexOf("scale end") != -1))// || (events.indexOf("drag end") != -1)) {
    {
        alteredProps.push("height");
        alteredProps.push("width");
    }
   
    deactivateProperties();
    activateProperties(alteredProps);
        
}


function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}





/*****************************************/
/*  Commended for possible future reuse  */
/*****************************************/

//rect.click(function () {
//    currShape = rect;
//    selectedShapeType = "rect";
//    document.getElementById("rect-radio").checked = true;
//});


//rect.drag(drag_move, drag_start, drag_up);
/*function drag_start(e) {

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
}*/