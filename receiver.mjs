import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';
import * as fs from "fs";
import cors from 'cors';
const {Console} = console;
import {DateTime} from "luxon";
import structuredClone from 'realistic-structured-clone';
import favicon from "serve-favicon";
import Player from "./src/js/Player.mjs";

const app = express();

// This needs to be first, before any other routes/middleware are defined
app.use(favicon('public/favicon/favicon.ico'));

let creds;
let systemDocId;
let personalDoc;
const loadedGalaxies = {};

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

app.use(express.static('public/images'));
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
            res.send(fetchHistory(instance));
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
            const history = fetchHistory(instance);

            if(update.global_character_market || update.global_victory
                    || update.detected_objects || update.faction_faction) {

            }
            else if(update.player_player) {
                let d = update.player_player;
                console.info("Got a player update.");

                let p = players[instance];
                if(!p) {
                    p = new Player(instance, DateTime.now().toSeconds());
                    players[instance] = p;
                }

                p.updateCredit(d.credit);
                p.updateIdeo(d.ideology);
                p.updateTech(d.technology);

                // console.debug(update.player_player);
                // console.debug(Object.keys(update.player_player));
                // console.debug(d.credit);
                // console.debug(d.ideology);
                // console.debug(d.technology);

            }
            else if(update.global_galaxy_system) {
                console.info("Got a system update.");
                const sys = update.global_galaxy_system;
                applySystemUpdate(sys, history);
            }
            else if(update.global_galaxy_sector) {
                console.info("Got a sector update.");
                const sectors = update.global_galaxy_sector;
                applySectorUpdate(sectors, history);
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

            // DEPRECATED
            else if(payload.type === "player" && false) {
                let data = payload.data;
                console.debug("Received Player data: " + JSON.stringify(data));
                personalSheet.getCellByA1("B2").value = data.credits;
                personalSheet.getCellByA1("C2").value = data.tech;
                personalSheet.getCellByA1("D2").value = data.ideo;
                personalSheet.getCellByA1("B3").value = data.creditIn;
                personalSheet.getCellByA1("C3").value = data.techIn;
                personalSheet.getCellByA1("D3").value = data.ideoIn;
                personalSheet.saveUpdatedCells();
            }
            else if(payload.type === "galaxy") {
                console.info("Received galaxy");
                let dest = 'snapshots/' + payload.instance;
                console.info("\tWriting Galaxy data to: " + dest);
                // console.info("\tData: " + payload.data);

                // NEW HISTORY FORMAT TYPE
                const historyData = {
                    start:DateTime.now().toISO(), base:payload.data,
                    current:structuredClone(payload.data), snapshots: [], undo: [], instance:payload.instance,
                    currentTime:DateTime.now().toISO()
                }

                fs.writeFile(dest + "/history.json", JSON.stringify(historyData), err => {
                    if (err) {
                        console.error(err)
                    }
                });

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

                applyUpdatesFromGameResume(snap, fetchHistory(payload.instance));

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

setInterval(estimateIncomeValues, 10_000);

function estimateIncomeValues() {
    try {
        players.forEach(p => {
            p.calcResourceTotals(DateTime.now().toSeconds());
            if(p.gameInstanceId === 2713) {
                personalSheet.getCellByA1("B2").value = p.resources.cred.value;
                personalSheet.getCellByA1("C2").value = p.resources.tech.value;
                personalSheet.getCellByA1("D2").value = p.resources.ideo.value;
                personalSheet.getCellByA1("B3").value = p.resources.cred.change;
                personalSheet.getCellByA1("C3").value = p.resources.cred.change;
                personalSheet.getCellByA1("D3").value = p.resources.cred.change;
                personalSheet.saveUpdatedCells().then(r => {
                    if(r) {
                        console.error("Response from Sheets after saving player income: " + r);
                    }
                });
            }
        });
    }
    catch(err) {
        console.error("Failed to calculate player income" + err);
    }
}

function fetchHistory(instance) {
    try {
        return !loadedGalaxies[instance] ? loadImprovedGalaxyHistory(instance) : loadedGalaxies[instance];
    }
    catch (err) {
        console.info("Failed to load history for " + instance);
        return null;
    }
}

function applyUpdatesFromGameResume(currentGalaxy, history) {
    Object.values(currentGalaxy.stellar_systems).forEach(s => {
        s.unknownTime = true;
        applySystemUpdate(s, history);
    });
    applySectorUpdate(currentGalaxy.sectors, history);
}

function applySectorUpdate(sectors, history) {
    if(!sectors)
        return;

    sectors.forEach(sec => {
        let id = sec.id;
        let curr = getById(history.current.sectors, id);
        if(curr.owner !== sec.owner) {
            sec.type = "sector";
            sec.time = DateTime.now().toISO();
            delete sec.adjacent;
            delete sec.centroid;
            delete sec.points;

            const u = structuredClone(curr);
            u.time = history.currentTime;

            history.snapshots.push(sec);
            history.undo.push(u);

            curr.owner = sec.owner;
            curr.division = sec.division;

            saveInstanceToDisk(history);
        }
    });
}

function getById(list, id) {
    let res = null;
    list.forEach(e => {
        if(e.id === id)
            res = e;
    });

    return res;
}

function applySystemUpdate(sys, history) {
    sys.type = "system";
    const curState = history.current;
    const storedSys = getById(curState.stellar_systems, sys.id);

    if(storedSys === null) {
        console.info("ERROR: null system??? ID: " + sys.id);
        return;
    }

    if(storedSys.owner !== sys.owner || storedSys.status !== sys.status) {

        // Create a snapshot that allows us to undo this step
        const u = structuredClone(storedSys);
        delete u.position;
        delete u.score;
        delete u.receivedAt;
        u.time = history.currentTime;

        // Clean up the current snapshot
        sys.time = DateTime.now().toISO();
        delete sys.position;
        delete sys.score;
        delete sys.receivedAt;

        // Build the forwards/backwards snapshots
        history.undo.push(u);
        history.snapshots.push(sys);

        // Update the stored current state of the galaxy
        storedSys.owner = sys.owner;
        storedSys.faction = sys.faction;
        storedSys.status = sys.status;
        history.currentTime = sys.time;

        saveInstanceToDisk(history);
    }
}

function saveInstanceToDisk(history) {
    if(history) {
        fs.writeFileSync("snapshots/" + history.instance + "/history.json", JSON.stringify(history), err => {
            if(err) {
                console.error("FAILED TO SAVE HISTORY UPDATE: " + err);
            }
        });
    }
    else {
        console.info("Where is the history");``
    }
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

function loadImprovedGalaxyHistory(instanceId) {
    const baseDir = "snapshots/" + instanceId + "/";

    if(fs.existsSync(baseDir + "history.json")) {
        loadedGalaxies[instanceId] = JSON.parse(fs.readFileSync(baseDir + "history.json", 'utf8'));

        // Not sure why some updates are missing information.
        let madeCorrections = false;
        loadedGalaxies[instanceId].snapshots.forEach( s => {
            // if(!s.type) {
            //     console.info(s.name + " has missing type: " + JSON.stringify(s));
            //
            //     // This is a system with a missing name and type. Not sure why, but we can recover the information
            //     if(s.status) {
            //         let sys = getById(loadedGalaxies[instanceId].base.stellar_systems, s.id);
            //         if(sys) {
            //             s["name"] = sys.name;
            //             s["type"] = "system";
            //             madeCorrections = true;
            //         }
            //     }
            // }

            // In some updates at the start we didn't apply time to sectors, so here we derive it from the undo history
            // else if(s.type === "sector" && !s.time) {
            //     let name = s.name;
            //     loadedGalaxies[instanceId].undo.forEach(u => {
            //         if(u.centroid && u.name === name) {
            //             s.time = u.time;
            //             madeCorrections = true;
            //         }
            //     });
            // }
        });

        if(madeCorrections) {
            console.info("Made corrections to history");
            saveInstanceToDisk(loadedGalaxies[instanceId]);
        }

        return loadedGalaxies[instanceId];
    }
    else {
        const data = fs.readFileSync(baseDir + "base.json", 'utf8');
        const base = JSON.parse(data);
        console.info("Retrieved base data: " + base);

        loadedGalaxies[instanceId] = {
            base: base.galaxy, current: false, start: base.start, currentTime: false, snapshots: [], undo: []
        };
    }
}

function loadGalaxyHistory(instanceId) {

    // we need the base data loaded first before
    let galaxyHistory = {};
    const baseDir = "snapshots/" + instanceId + "/";
    const data = fs.readFileSync(baseDir + "base.json", 'utf8');
    const base = JSON.parse(data);
    console.info("Retrieved base data: " + base);
    galaxyHistory.start = base.start;
    console.info("Galaxy starts at " + galaxyHistory.start);
    galaxyHistory.base = base.galaxy;
    galaxyHistory.snapshots = [];

    let prevState = structuredClone(base.galaxy);
    console.info("Previous State: " + prevState);

    let files = fs.readdirSync(baseDir);

    files = files.filter(f => {
        return /state_[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{1,2}-[0-9]{1,2}\.json(?!.)/.test(f);
    });

    files.sort((a, b) => {
        try {
            a = a.split("_")[1];
            a = a.split(".")[0];
            b = b.split("_")[1];
            b = b.split(".")[0];

            a = DateTime.fromFormat(a, "yyyy-MM-dd'T'H-m");
            b = DateTime.fromFormat(b, "yyyy-MM-dd'T'H-m");

            return a < b ? -1 : 1;
        }
        catch(err) {
            console.info("failed to parse");
            return -1;
        }
    });

    files.forEach(function(file) {
        console.info("File: " + file);
        const fdata = fs.readFileSync(baseDir + file, 'utf8');
        try {
            let time = file.split("_")[1].split(".")[0];
            let state = JSON.parse(fdata);

            console.info("\tSectors to parse: " + state.sectors);

            state.sectors = state.sectors.filter((val, i, state) => {
                let p = prevState.sectors[i];
                if(val.owner !== p.owner) {
                    prevState.sectors[i] = val;
                    return true;
                }
                return false;
            });
            console.info("\tRetained Sectors: " + JSON.stringify(state.sectors));

            state.stellar_systems = state.stellar_systems.filter((val, i, state) => {
                let p = prevState.stellar_systems[i];
                if(val.owner !== p.owner) {
                    prevState.stellar_systems[i] = val;
                    return true;
                }
                return false;
            });
            console.info("\tRetained Systems: " + JSON.stringify(state.stellar_systems));

            // only push if not empty
            if(state.stellar_systems.length !== 0 || state.sectors.length !== 0) {
                galaxyHistory.snapshots.push({time: time, data: state});
            }
            console.info("\tProcessed successfully");
        }
        catch(err) {
            console.info("\tFailed: " + err);
        }
    });

    console.info("All done! Result: " + galaxyHistory);

    return galaxyHistory;
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