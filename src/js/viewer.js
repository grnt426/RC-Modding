$( document ).ready( processData );

let galaxy;
let canvas;
let context;
let update = false;

// zooming
let zoom;
let zoomLevel = 3;

// translating
let dragging = false;
let dragStart = {};
let dragEnd = {};

function processData() {
    try {
        $.ajax({
            url: "http://localhost:8080/galaxy",
            success: function( result ) {
                galaxy = JSON.parse(result);
                canvas = $("#mapCanvas").get(0);
                context = canvas.getContext("2d");

                canvas.addEventListener('wheel', function(event){

                    // Prevent the browser window scrolling
                    event.preventDefault();

                    zoom = event.deltaY;

                }, false);

                canvas.addEventListener('mousedown', function(event) {
                    dragging = true;
                    dragStart = {x:event.pageX, y:event.pageY};
                });

                canvas.addEventListener('mouseup', function(event) {
                    dragging = false;

                });

                canvas.addEventListener('mousemove', function(event) {
                    dragEnd = {x:event.pageX, y:event.pageY};
                    if(dragging) {
                        context.translate(dragStart.x - dragEnd.x, dragStart.y - dragEnd.y);
                        dragStart = dragEnd;
                        clear();
                        update = true;
                    }
                });

                update = true;
            }
        });
    } catch(err) {
        console.log(err);
    }
}

function clear() {
    context.restore();
    context.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(renderer, 100);

function renderer() {

    if(zoom) {
        zoomLevel += (-1 * zoom * 0.005);
        if(zoomLevel < 3)
            zoomLevel = 3;

        zoom = false;
        update = true;
        clear();
    }

    if(update) {
        update = false;
        Object.values(galaxy.stellar_systems).forEach(val => {
            let pos = val.position;
            let x = pos.x*zoomLevel;
            let y = (500 - pos.y*zoomLevel) + 500;
            if(x < canvas.width && x > 0 && y < canvas.height && y > 0) {
                context.beginPath();
                context.arc(x, y, 2, 0, 2 * Math.PI);
                if(val.faction === "tetrarchy") {
                    context.fillStyle = 'rgb(54,54,203)';
                } else if(val.faction === "cardan") {
                    context.fillStyle = 'rgb(160,0,176)';
                } else if(val.faction === "myrmezir") {
                    context.fillStyle = 'rgb(219,42,62)';
                } else if(val.faction === "synelle") {
                    context.fillStyle = 'rgb(85,217,22)';
                } else {
                    context.fillStyle = 'rgb(256, 256, 256)';
                }
                context.fill();
            }
        });
    }
}