import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';
import * as fs from "fs";
import cors from 'cors';
const {Console} = console;
import {DateTime} from "luxon";
import structuredClone from 'realistic-structured-clone';
import favicon from "serve-favicon";

import Player from "./src/js/Player.mjs";
import HistoryManager from "./src/js/HistoryManager.mjs";

const app = express();

// This needs to be first, before any other routes/middleware are defined
app.use(favicon('public/favicon/favicon.ico'));

let creds;
let systemDocId;
let personalDoc;

const historyManager = new HistoryManager("snapshots/");

try {
    console.info("Loading credentials for GCP");
    creds = JSON.parse(fs.readFileSync('secrets/uploader.json', 'utf8'));

    console.info("Reading configuration data");
    let config = JSON.parse(fs.readFileSync("config.json", 'utf8'));
    console.debug("Config loaded: " + JSON.stringify(config));
    systemDocId = config.system;
    personalDoc = config.personal;
} catch (err) {
    console.error(err);
    process.exit(1);
}

// const systemSheet = (await loadGoogleSheet(systemDocId)).sheetsByIndex[0];
const personalSheet = (await loadGoogleSheet(personalDoc)).sheetsByIndex[0];

// My data
let sectors = null;
const knownSystems = new Set();
const sectorIdToName = {};
let players = [];

// await systemSheet.loadHeaderRow(7);
// let curRows = await systemSheet.getRows();
await personalSheet.loadCells('B2:D3');
console.info("Data loaded from sheets");

// Object.values(curRows).forEach(val => {
//     const name = val.Name;
//     const sector = val.Sector;
//     if(name && name.length > 0 && sector && sector.length > 0) {
//         // console.debug(name);
//         knownSystems.add(name.toLowerCase() + ":" + sector);
//     }
// });

app.use('/images', express.static('public/images'));
app.use(express.static('src'));

// Check if a Game has already received the base galactic data by instance ID
app.get("/galaxy/:gameId", cors(), (req, res) => {
    let gameId = req.params.gameId;
    console.info("Received Game ID: " + gameId);
    let haveDir = fs.existsSync("snapshots/" + gameId);
    console.info("\tFound dir for " + gameId + "? " + haveDir);

    let haveBase = false;
    if(!haveDir) {
        fs.mkdirSync("snapshots/" + gameId);
    }
    else {
        haveBase = fs.existsSync("snapshots/" + gameId + "/base.json");
    }

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(haveBase + "");
});


// Retrieve the entire snapshot and galactic data for a given game by ID
app.get('/galaxy/replay/:gameId', cors(), (req, res) => {
    console.info("Sending replay data");

    let instance = parseInt(req.params.gameId, 10);

    // sanity check ID
    if(Number.isInteger(instance) && instance >= 0) {
        console.info("Processed instance " + instance);

        // check if exists
        if(fs.existsSync("snapshots/" + instance + "/history.json")) {
            res.status(200);
            res.header("Content-Type", "application/json");
            res.send(historyManager.getHistory(instance));
        }
        else {
            res.status(404);
            res.send("Does not exist");
        }
    }
    else {
        let err = "Invalid game id. " +
        instance == null ? "Must not be empty"
            : !Number.isInteger(instance) ? "Must be a number"
                : instance < 0 ? "Must be positive" : "Unknown?!?";
        console.info(err);
        res.status(400);
        res.send(err);
    }
});

app.post('/debug', (req, res) => {
    var body = '';
    req.on('data', function(data) {
        body += data
    });
    req.on('end', function() {
        console.info("[DEBUG] " + body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('received');
    });
});

/**
 * This route assumes no other calls to this API can be made until a currently executing call is finished. This is
 * desirable because each time this API is called, we save the large snapshot history to disk and order is preserved.
 * If multiple calls could execute simultaneously, they could cause non-atomic updates.
 *
 * This is called out explicitly for the eventual future these APIs are made more performant through async handlers or
 * threaded.
 */
app.post('/incr_update', (req, res) => {
    var body = '';
    req.on('data', function(data) {
        body += data
    });
    req.on('end', function() {
        res.setHeader("Content-Type", "application/json");

        try {
            const payload = JSON.parse(body);
            const update = payload.data;
            const instance = payload.instance;

            if(update.global_character_market || update.global_victory
                    || update.detected_objects || update.faction_faction) {

            }
            else if(update.player_player) {
                let d = update.player_player;
                console.info("Got a player update.");
                updatePlayerData(instance, d);
            }
            else if(update.global_galaxy_system) {
                console.info("Got a system update.");
                const sys = update.global_galaxy_system;
                historyManager.applySystemUpdate(sys, instance);
            }
            else if(update.global_galaxy_sector) {
                console.info("Got a sector update.");
                const sectors = update.global_galaxy_sector;
                historyManager.applySectorsUpdate(sectors, instance);
            }
            else {
                console.debug(body);
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('post received');
        }
        catch(err) {
            console.error("Crashed in processing incr_update: " + err);
            res.writeHead(503, {'Content-Type': 'text/html'});
            res.end('Error in processing');
        }
    });
});

app.post('/update', (req, res) => {

    var body = '';
    req.on('data', function(data) {
        body += data
    });
    req.on('end', function() {
        // console.log('Finished receiving data');
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('post received')

        try {
            let payload = JSON.parse(body);
            if(payload.type === "selectsystem" && false) {
                console.log("Received selected system. Parsing...");
                let data = payload.data;
                if(knownSystems.has(data.name)) {
                    console.debug("Already have system '" + data.name + "'; ignoring");
                    return;
                }

                let details = getSystemSlotDetails(data.bodies);
                console.debug("Parsed details");

                // Get current sheet data
                systemSheet.getRows();
                systemSheet.addRow([
                    sectors[data.sector_id].name, data.name, data.status === "inhabited_player" ? "Owned" : data.status === "inhabited_neutral" ? "Dominion" : "System", parseInt(data.position.x),
                    parseInt(data.position.y), "",
                    details["habitable_planet"].planets, details["habitable_planet"].slots, details["habitable_planet"].prod, details["habitable_planet"].tech, details["habitable_planet"].appeal,
                    details["sterile_planet"].planets, details["sterile_planet"].slots, details["sterile_planet"].prod, details["sterile_planet"].tech, details["sterile_planet"].appeal,
                    details["others"].slots, details["others"].prod, details["others"].tech, details["others"].appeal
                ]);
                knownSystems.add(data.name)
                console.log("Successfully saved '" + data.name + "'");
            }
            else if(payload.type === "sectors") {
                if(sectors) {
                    console.debug("Already have sector data; ignoring");
                    return;
                }
                console.debug("Got sector data");
                sectors = payload.data;

                sectors.forEach(sec => {
                    sectorIdToName[sec.id] = sec.name;
                });
            }
            else if(payload.type === "player" && false) {
                console.debug("Got init player data");
                let data = payload.data;
                updatePlayerData(payload.instance, data);
            }
            else if(payload.type === "galaxy") {
                console.info("Received galaxy");
                historyManager.processNewInstance(payload);

                // OLD SNAPSHOT FORMAT TYPE
                const fileData = {start:(DateTime.now()).toISO(), base:payload.data};
                fs.writeFile(dest + '/base.json', JSON.stringify(fileData), err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                });
            }
            else if(payload.type === "galaxy_snapshot") {
                console.info("Received galaxy snapshot");
                let snap = payload.data;
                // console.info(payload);

                applyUpdatesFromGameResume(snap, historyManager.getHistory(payload.instance));

                if(snap.sectors) {
                    Object.values(snap.sectors).forEach(s => {
                        delete s.adjacent;
                        delete s.centroid;
                        delete s.points;
                    });
                }
                else {
                    console.info("WARN no sectors found?");
                }
                Object.values(snap.stellar_systems).forEach( s => {
                    delete s.class;
                    delete s.name;
                    delete s.position;
                    delete s.score;
                    delete s.type;
                });

                let d = DateTime.now();
                let filename = 'snapshots/' + payload.instance + '/state_'
                    + d.toISODate() + 'T' + d.hour + '-' + d.minute +'.json';
                console.info("Writing to file: " + filename);
                fs.writeFile(filename, JSON.stringify(snap), err => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                    //file written successfully
                });
            }
            else {
                console.debug(body);
            }
        }
        catch (err) {
            console.info("ERROR: " + err);
        }
    });
    // console.log("Received something!");
});

const server = app.listen(8080, () => {
    console.info("Server started");
});

// handle shutdowns gracefully
process.on('SIGTERM', () => {
    console.log('!!! Shutting Down !!!');
    server.close(() => {
        process.exit(0);
    });
});

setInterval(estimateIncomeValues, 60_000);

function estimateIncomeValues() {
    try {
        players.forEach(p => {
            p.calcResourceTotals(DateTime.now().toSeconds());
            if(p.gameInstanceId === 2713) {
                updateIncomeSheets(p);
            }
        });
    }
    catch(err) {
        console.error("Failed to calculate player income" + err);
    }
}

function updatePlayerData(instance, data) {
    let p = players[instance];
    let created = false;
    if(!p) {
        p = new Player(instance, DateTime.now().toSeconds());
        players[instance] = p;
        created = true;
    }

    p.updateCredit(data.credit);
    p.updateIdeo(data.ideology);
    p.updateTech(data.technology);

    if(created)
        updateIncomeSheets(p);
}

function updateIncomeSheets(player) {
    personalSheet.getCellByA1("B2").value = player.resources.cred.value;
    personalSheet.getCellByA1("C2").value = player.resources.tech.value;
    personalSheet.getCellByA1("D2").value = player.resources.ideo.value;
    personalSheet.getCellByA1("B3").value = player.resources.cred.change;
    personalSheet.getCellByA1("C3").value = player.resources.tech.change;
    personalSheet.getCellByA1("D3").value = player.resources.ideo.change;
    personalSheet.saveUpdatedCells().then(r => {
        if(r) {
            console.error("Response from Sheets after saving player income: " + r);
        }
    });
}

function applyUpdatesFromGameResume(currentGalaxy, history) {
    Object.values(currentGalaxy.stellar_systems).forEach(s => {
        s.unknownTime = true;
        historyManager.applySystemUpdate(s, history.instance);
    });
    historyManager.applySectorsUpdate(currentGalaxy.sectors, history.instance);
}

function getSystemSlotDetails(data) {
    console.debug("Parsing details");
    let res = {"habitable_planet":{planets:0, slots:0, prod:0, tech:0, appeal:0}, "sterile_planet":{planets:0, slots:0, prod:0, tech:0, appeal:0}, "others":{slots:0, prod:0, tech:0, appeal:0}};

    Object.values(data).forEach(val => {
        // console.debug("Parsing orbital");
        if(val.type === "sterile_planet" || val.type === "habitable_planet") {
            let values = res[val.type];
            values.planets += 1;
            values.slots += val.tiles.length;
            values.prod += val.industrial_factor;
            values.tech += val.technological_factor;
            values.appeal += val.activity_factor;
        }
        else {
            Object.values(val.bodies).forEach(ast => {
                let values = res["others"];
                values.slots += ast.tiles.length;
                values.prod += ast.industrial_factor;
                values.tech += ast.technological_factor;
                values.appeal += ast.activity_factor;
            });
        }
    });

    return res;
}

async function loadGoogleSheet(id) {
    console.debug("Loading " + id + " with " + creds.client_email);
    const doc = new GoogleSpreadsheet.GoogleSpreadsheet(id);
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets
    console.info(doc.title + " sheet loaded");

    return doc;
}