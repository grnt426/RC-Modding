var DateTime = luxon.DateTime;

$( document ).ready( processData );

const DEBUG_FLAGS = {
    DEV_MODE: false
}

if(window.location.hostname === "localhost") {
    DEBUG_FLAGS.DEV_MODE = true;
}

const HOSTNAME = DEBUG_FLAGS.DEV_MODE ? "http://localhost:8080" : "https://rc-replay.com" ;

const galCenter = {x:0, y:0};

let galaxyHistory;
let galaxy;
let canvas;
let context;
let update = false;

let systemData = Array(10000).fill(0);

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
let animTimer;
let historyAnimIndex = 0;
let linesWritten = 0;
let prevTime = false;

const IMAGES = {};

loadImage("play", HOSTNAME + "/images/play.png");
loadImage("prev", HOSTNAME + "/images/prev.png");
loadImage("next", HOSTNAME + "/images/next.png");

function loadImage(name, url, x, y) {
    let img = new Image();
    img.src = url;
    IMAGES[name] = {i:img, x:x, y:y};
}

function processData() {
    try {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let instance = 2713; // latest legacy
        if(urlParams.has("instance")) {
            instance = urlParams.get("instance");
        }

        $.ajax({
            url: HOSTNAME + (DEBUG_FLAGS.DEV_MODE ? "/galaxy/replay/" + instance : "/replays/" + instance + "/history.json"),
            success: function( result ) {
                galaxyHistory = result;

                galaxyHistory.snapshots = galaxyHistory.snapshots.sort((a, b) => {
                    try {
                        a = a.time;
                        b = b.time;
                        console.debug("parsing: " + a + " " + b);
                        a = DateTime.fromISO(a);
                        b = DateTime.fromISO(b);

                        return a.ts < b.ts ? -1 : 1;
                    }
                    catch(err) {
                        console.error("failed to parse: " + a + " || " + b);
                        return -1;
                    }
                });

                galaxy = galaxyHistory.current;
                galaxy.players = [];

                // The "current" from galaxyHistory is the last known state of the galaxy
                historyAnimIndex = galaxyHistory.snapshots.length - 1;

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

                canvas.addEventListener('click', function(event) {
                    let x = event.pageX;
                    let y = event.pageY;

                    // might have clicked a playback button
                    if(x <= 200 && x >= 15 && y <= canvas.height - 15 && y >= canvas.height - 15 - 50) {
                        if(x >= 15 && x <= 65) {
                            // if(animTimer) {
                            //     clearTimeout(animTimer);
                            //     animTimer = false;
                            // }
                            // historyAnimIndex -= 2;
                            //
                            // let log = $("#systemlog");
                            // let text = log.html();
                            // text = text.split("<br>");
                            // text = text.slice(linesWritten);
                            // log.html(text.join("<br>"));
                            //
                            // if(historyAnimIndex < 0) {
                            //     // do something with wrapping to end
                            //     historyAnimIndex = 0;
                            // }
                            //
                            // animateHistory(false);
                        }
                        else if(x >= 80 && x <= 130) {
                            if(animTimer) {
                                clearTimeout(animTimer);
                                animTimer = false;
                            } else {
                                animateHistory();
                            }
                        }
                        else if(x >= 145 && x <= 195) {
                            if(animTimer) {
                                clearTimeout(animTimer);
                                animTimer = false;
                            }
                            animateHistory(false);
                        }
                    }
                });

                // context.drawImage(IMAGES.prev.i, 15, canvas.height - 65);
                // context.drawImage(IMAGES.play.i, 80, canvas.height - 65);
                // context.drawImage(IMAGES.next.i, 145, canvas.height - 65);

                console.debug("Galaxy History: " + JSON.stringify(galaxyHistory));
                update = true;

                setInterval(renderer, 10);
                animTimer = setTimeout(animateHistory, 2000);
            }
        });
    } catch(err) {
        console.error(err);
    }
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function animateHistory(repeat = true) {
    if(historyAnimIndex >= galaxyHistory.snapshots.length){
        $("#systemlog").html("");
        historyAnimIndex = 0;
        linesWritten = 0;

        // lazy reset :\
        console.debug("Resetting back to start");
        galaxy = structuredClone(galaxyHistory.base);
        resetAnims = true;
        update = true;
        if(repeat)
            animTimer = setTimeout(animateHistory, 2000);
        return;
    }

    let systemLog = $("#systemlog");
    linesWritten = 0;
    const snap = galaxyHistory.snapshots[historyAnimIndex];
    let time = getCurrentSnapTime();

    let contentsOfLog = systemLog.html();
    if(contentsOfLog.length > 3 && prevTime === time) {
        let index = contentsOfLog.indexOf(" ~~~", 3) + 9;
        systemLog.html(contentsOfLog.substring(index));
    }
    else {
        prevTime = time;
    }

    if(snap.type === "sector") {
        console.debug("Sector flipping");
        console.debug(JSON.stringify(snap));
        let sec = snap;
        let id = sec.id;
        console.debug(JSON.stringify(sec));
        if(sec.owner)
            systemLog.prepend(
                wrapTextInFaction(sec.owner.charAt(0).toUpperCase() + sec.owner.slice(1), sec.owner) + " controls " +
                sec.name + "<br />"
            );
        else {
            systemLog.prepend(sec.name + " was abandoned!<br />");
        }

        galaxy.sectors[id].owner = sec.owner;
        galaxy.sectors[id].division = sec.division;
    }
    else if(snap.type === "system" || snap.class) {
        let sys = snap
        let id = sys.id;
        let galaxyIndex = systemData[id].index;

        takenSystems[id] = {startTime: Date.now(), s: sys, radius: 2 + zoomLevel * 0.15, dir: 0.1};
        let prev = galaxy.stellar_systems[galaxyIndex];
        linesWritten++;

        if(!sys.owner) {
            systemLog.prepend(
                wrapTextInFaction(prev.owner, prev.faction) + " abandoned " + systemData[id].name + "<br />"
            );
        }
        else if(sys.joined) {
            systemLog.prepend(
                wrapTextInFaction(sys.owner, sys.faction) + " joined the legacy!<br />"
            );
        }
        else if(prev.owner === null) {
            if(prev.status === "uninhabited"){
                systemLog.prepend(
                    wrapTextInFaction(sys.owner, sys.faction) + " colonized " + systemData[id].name + "<br />"
                );
            }
            else if(prev.status === "inhabited_neutral" && sys.status === "inhabited_dominion") {
                systemLog.prepend(
                    wrapTextInFaction(sys.owner, sys.faction) +
                    " claimed " + systemData[id].name + " as a dominion.<br />"
                );
            }
            else {
                console.error("Unknown state change for: " + JSON.stringify(snap));
            }
        }
        else {
            if(prev.owner === sys.owner) {
                if(prev.status === "inhabited_dominion" && sys.status === "inhabited_player") {
                    systemLog.prepend(
                        wrapTextInFaction(sys.owner, sys.faction) +
                        " converted the dominion " + systemData[id].name + " into a system.<br />"
                    );
                }
                else if(prev.status === "inhabited_player" && sys.status === "inhabited_dominion") {
                    systemLog.prepend(
                        wrapTextInFaction(sys.owner, sys.faction) +
                        " converted the system " + systemData[id].name + " into a dominion.<br />"
                    );
                }
                else {
                    console.error("Unknown state change for: " + JSON.stringify(snap));
                }
            }
            else {
                systemLog.prepend(
                    wrapTextInFaction(sys.owner, sys.faction) + " took " + systemData[id].name +
                    " from " + wrapTextInFaction(prev.owner, prev.faction) + "<br />"
                );
            }
        }

        prev.owner = sys.owner;
        prev.faction = sys.faction;
        prev.status = sys.status;
    }
    else {
        console.error("Unknown update type?");
    }

    systemLog.prepend(" ~~~ " + time + " ~~~ <br />");

    linesWritten++;

    update = true;
    historyAnimIndex++;

    // If the very next update is a sector update, then we want to show that
    // immediately.
    if(historyAnimIndex < galaxyHistory.snapshots.length && galaxyHistory.snapshots[historyAnimIndex].type === "sector") {
        animateHistory(repeat);
    }
    else if(repeat)
        animTimer = setTimeout(animateHistory, 2000);
}

function renderer() {

    if(zoom) {
        zoomLevel += (-1 * zoom * (zoomLevel > 20 ? 0.04 : .005));
        if(zoomLevel < 2)
            zoomLevel = 2;
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

            // Draw sector names
            let fontAdjust = 12 - zoomLevel;
            fontAdjust = fontAdjust < 0 ? 0 : fontAdjust;
            fontAdjust = 30 - fontAdjust;
            context.font = fontAdjust + 'px sans-serif';
            context.fillStyle = 'rgb(126,126,126, 50)';
            let x = (sec.centroid[0] - galCenter.x - translation.x) * zoomLevel - translation.x + canvas.width / 2;
            x -= sec.name.length * 5;
            let y = (500 - ((sec.centroid[1] - galCenter.y + translation.y) * zoomLevel)) - translation.y + 100;
            y += 7;
            context.fillText(sec.name, x,y);
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
                        context.arc(x, y, 10 + animate.radius * zoomLevel * 0.15, 0, 2 * Math.PI);
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
        let timestamp = getCurrentSnapTime();
        context.font = '30px sans-serif';
        context.fillStyle = 'rgb(126,126,126)';
        context.fillText(timestamp, canvas.width - 250, canvas.height - 20);

        // Draw Buttons
        // context.drawImage(IMAGES.prev.i, 15, canvas.height - 65);
        context.drawImage(IMAGES.play.i, 80, canvas.height - 65);
        context.drawImage(IMAGES.next.i, 145, canvas.height - 65);
    }

    resetAnims = false;
}

function getCurrentSnapTime() {
    let time = galaxyHistory.snapshots[historyAnimIndex] === undefined ? galaxyHistory.snapshots[historyAnimIndex-1].time : galaxyHistory.snapshots[historyAnimIndex].time;
    return DateTime.fromISO(time).toLocal().toLocaleString();
}

function wrapTextInFaction(text, faction) {
    let style = "";
    switch(faction) {
        case "tetrarchy": style = "tet"; break;
        case "cardan": style = "car"; break;
        case "myrmezir": style = "myr"; break;
        case "synelle": style = "syn"; break;
        case "ark": style = "ark"; break;
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
    } else if(faction === "ark") {
        return 'rgb(201,161,21,'+alpha+')';
    } else { // neutral
        return 'rgb(126,126,126,'+alpha+')';
    }
}
