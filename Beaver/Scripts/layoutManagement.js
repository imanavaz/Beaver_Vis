function updateCanvasSize() {
    var drawingarea = document.getElementById('drawing-area');
    var canvas = document.getElementById('main-canvas');
    var canvasContainer = document.getElementById('canvas-container');

    canvasContainer.setWidth(drawingarea.clientWidth);
    canvasContainer.setHeight(drawingarea.clientHeight);

    canvas.setWidth(drawingarea.clientWidth);
    canvas.setHeight(drawingarea.clientHeight);
}