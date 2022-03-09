$( document ).ready( processData );

const galCenter = {x:0, y:0};

let galaxyHistory;
let galaxy;
let canvas;
let context;
let update = false;

// translating
let translation = {x:0, y:0};

// zooming
let zoom;
let zoomLevel = 2.5;

// translating
let dragging = false;
let dragStart = {};
let dragEnd = {};

function processData() {
    try {
        $.ajax({
            url: "http://localhost:8080/galaxy",
            success: function( result ) {
                galaxyHistory = JSON.parse(result);

                galaxy = galaxyHistory.base;

                galCenter.x = galaxy.sectors[0].centroid[0];
                galCenter.y = galaxy.sectors[0].centroid[1];

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
                        let deltaX = dragStart.x - dragEnd.x;
                        let deltaY = dragStart.y - dragEnd.y;
                        // translation.x += Math.abs(deltaX) > 1 ? deltaX < 0 ? -3 : 2 : 0;
                        // translation.y += Math.abs(deltaY) > 1 ? deltaY < 0 ? -3 : 2 : 0;
                        translation.x += deltaX * (zoomLevel > 15 ? 0.1 : 0.4);
                        translation.y += deltaY * (zoomLevel > 15 ? 0.1 : 0.4);
                        dragStart = dragEnd;
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
    context.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(renderer, 10);

function renderer() {

    if(zoom) {
        zoomLevel += (-1 * zoom * (zoomLevel > 20 ? 0.04 : .005));
        if(zoomLevel < 1)
            zoomLevel = 1;
        if(zoomLevel > 150)
            zoomLevel = 150;

        zoom = false;
        update = true;
    }

    if(update) {
        clear();
        update = false;

        // Draw Sectors
        Object.values(galaxy.sectors).forEach(sec => {

            let prevPoint = [];
            context.beginPath();
            context.fillStyle = factionColor(sec.owner, 0.15)
            context.strokeStyle = factionColor(sec.owner);
            Object.values(sec.points).forEach(p => {

                let x = (p[0] - galCenter.x - translation.x) * zoomLevel - translation.x + canvas.width / 2;
                let y = (500 - ((p[1] - galCenter.y + translation.y) * zoomLevel)) - translation.y;

                if(prevPoint) {
                    context.lineTo(x, y);
                    context.stroke();
                }
                else {
                    context.moveTo(x, y);
                }

                prevPoint[0] = x;
                prevPoint[1] = y;
            });
            context.fill();
        });

        // Draw stars
        Object.values(galaxy.stellar_systems).forEach(val => {
            let pos = val.position;
            let x = (pos.x - galCenter.x - translation.x) * zoomLevel - translation.x + canvas.width / 2;
            let y = (500 - ((pos.y - galCenter.y + translation.y) * zoomLevel)) - translation.y;
            if(x < canvas.width && x > 0 && y < canvas.height && y > 0) {
                context.beginPath();
                context.arc(x, y, 1 + zoomLevel * 0.15, 0, 2 * Math.PI);
                context.fillStyle = factionColor(val.faction);
                context.fill();

                // if(zoomLevel)
            }
        });

        // center dot for debug
        // context.fillStyle = 'rgb(255,214,0)';
        // context.beginPath();
        // context.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI);
        // context.fill();
    }
}

function factionColor(faction, alpha = 1) {
    if(faction === "tetrarchy") {
        return 'rgb(54,54,203,'+alpha+')';
    } else if(faction === "cardan") {
        return 'rgb(160,0,176,'+alpha+')';
    } else if(faction === "myrmezir") {
        return 'rgb(219,42,62,'+alpha+')';
    } else if(faction === "synelle") {
        return 'rgb(80,200,20,'+alpha+')';
    } else { // neutral
        return 'rgb(126,126,126,'+alpha+')';
    }
}