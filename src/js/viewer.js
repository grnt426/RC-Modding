var DateTime = luxon.DateTime;

$( document ).ready( processData );

const DEBUG_FLAGS = {
    DEV_MODE: false
}

const HOSTNAME = "https://rc-replay.com/compressed.json";

const galCenter = {x:0, y:0};

let galaxyHistory;
let galaxy;
let canvas;
let context;
let update = false;

let systemData = Array(10000).fill(0);

// animation
let index = 0;

// translating
let translation = {x:0, y:0};

// zooming
let zoom;
let zoomLevel = 3.75;

// translating
let dragging = false;
let dragStart = {};
let dragEnd = {};

// Animating Taken Systems
let takenSystems = [];
let resetAnims = false;

function processData() {

    if(window.location.hostname === "localhost") {
        DEBUG_FLAGS.DEV_MODE = true;
    }

    try {
        $.ajax({
            url: DEBUG_FLAGS.DEV_MODE ? "http://localhost:8080/galaxy" : HOSTNAME,
            success: function( result ) {
                galaxyHistory = result;

                galaxyHistory.snapshots = galaxyHistory.snapshots.sort((a, b) => {
                    try {
                        a = a.time;
                        b = b.time;
                        console.debug("parsing: " + a + " " + b);
                        a = DateTime.fromFormat(a, "yyyy-MM-dd'T'H");
                        console.debug(a.toLocaleString());
                        b = DateTime.fromFormat(b, "yyyy-MM-dd'T'H");

                        return a < b ? -1 : 1;
                    }
                    catch(err) {
                        console.error("failed to parse");
                        return -1;
                    }
                });

                galaxy = structuredClone(galaxyHistory.base);

                Object.keys(galaxy.stellar_systems).forEach(ind => {
                    let sys = galaxy.stellar_systems[ind];
                    sys.index = ind;
                    systemData[sys.id] = sys;
                });

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

                console.debug("Galaxy History: " + JSON.stringify(galaxyHistory));
                update = true;
            }
        });
    } catch(err) {
        console.error(err);
    }
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(renderer, 10);
setTimeout(animateHistory, 2000);

function animateHistory() {
    if(index >= galaxyHistory.snapshots.length){
        $("#systemlog").html("");
        index = 0;

        // lazy reset :\
        console.debug("Resetting back to start");
        galaxy = structuredClone(galaxyHistory.base);
        resetAnims = true;
        update = true;
        setTimeout(animateHistory, 2000);
        return;
    }

    const snap = galaxyHistory.snapshots[index].data;
    console.debug("Sectors flipping: " + snap.sectors.length);
    console.debug(JSON.stringify(snap.sectors));
    Object.keys(snap.sectors).forEach(ind => {
        let sec = snap.sectors[ind];
        let id = sec.id;
        console.debug(JSON.stringify(sec));
        console.debug("Sector flipped: " + sec.name + " to " + sec.owner);

        galaxy.sectors[id].owner = sec.owner;
        galaxy.sectors[id].division = sec.division;
    });

    let systemLog = $("#systemlog");
    Object.keys(snap.stellar_systems).forEach(ind => {
        let sys = snap.stellar_systems[ind];
        let id = sys.id;
        let galaxyIndex = systemData[id].index;

        takenSystems[id] = {startTime:Date.now(), s:sys, radius:2 + zoomLevel * 0.15, dir:0.1};
        let prev = galaxy.stellar_systems[galaxyIndex];

        if(!sys.owner) {
            systemLog.prepend(
                wrapTextInFaction(prev.owner, prev.faction) + " abandoned " + systemData[id].name + "<br />"
            );
        }
        else if(prev.owner === null)
            systemLog.prepend(
                wrapTextInFaction(sys.owner, sys.faction) + " colonized " + systemData[id].name + "<br />"
            );
        else
            systemLog.prepend(
                wrapTextInFaction(sys.owner, sys.faction) + " took " + systemData[id].name +
                " from " + wrapTextInFaction(prev.owner, prev.faction) + "<br />"
            );

        prev.owner = sys.owner;
        prev.faction = sys.faction;
        prev.status = sys.status;
    });

    let time = getCurrentSnapTime();
    systemLog.prepend(" ~~~ " + time[0] + " " + time[1] + ":00" + " ~~~ <br />");

    update = true;
    index++;
    setTimeout(animateHistory, 2000);
}

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

    if(update || Object.keys(takenSystems).length !== 0) {
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
                let y = (500 - ((p[1] - galCenter.y + translation.y) * zoomLevel)) - translation.y + 100;

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
            let y = (500 - ((pos.y - galCenter.y + translation.y) * zoomLevel)) - translation.y + 100;
            if(x < canvas.width && x > 0 && y < canvas.height && y > 0) {
                context.beginPath();
                context.arc(x, y, 1 + zoomLevel * 0.15, 0, 2 * Math.PI);
                context.fillStyle = factionColor(val.faction);
                context.fill();

                let animate = takenSystems[val.id];
                if(animate) {
                    if(animate.startTime + 2000 < Date.now() || resetAnims) {
                        delete takenSystems[val.id];
                    }
                    else {
                        context.beginPath();
                        context.arc(x, y, animate.radius * zoomLevel, 0, 2 * Math.PI);
                        context.fillStyle = factionColor(val.faction, 0.3);
                        context.fill();

                        animate.radius += animate.dir;
                        if(animate.radius < 1) {
                            animate.radius = 1;
                            animate.dir = 0.1;
                        }
                        else if(animate.radius > 4) {
                            animate.radius = 4;
                            animate.dir = -0.1;
                        }
                    }
                }
            }
        });

        // center dot for debug
        // context.fillStyle = 'rgb(255,214,0)';
        // context.beginPath();
        // context.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI);
        // context.fill();

        // this is SUPER lazy
        let comps = getCurrentSnapTime();
        context.font = '30px sans-serif';
        context.fillStyle = 'rgb(126,126,126)';
        context.fillText(comps[0] + " " + comps[1] + ":00", canvas.width - 250, canvas.height - 20);
    }

    resetAnims = false;
}

function getCurrentSnapTime() {
    let time = galaxyHistory.snapshots[index] === undefined ? galaxyHistory.snapshots[index-1].time : galaxyHistory.snapshots[index].time;
    return time.split("T");
}

function wrapTextInFaction(text, faction) {
    let style = "";
    switch(faction) {
        case "tetrarchy": style = "tet"; break;
        case "cardan": style = "car"; break;
        case "myrmezir": style = "myr"; break;
        case "synelle": style = "syn"; break;
    }

    return "<span class='" + style + "'>" + text + "</span>";
}

function factionColor(faction, alpha = 1) {
    if(faction === "tetrarchy") {
        return 'rgb(63,63,226,'+alpha+')';
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