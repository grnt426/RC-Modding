import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';
import * as fs from "fs";
import cors from 'cors';
const {Console} = console;
import {DateTime} from "luxon";

const app = express();

let creds;
let systemDocId;
let personalDoc;

const galaxyHistory = {};

try {
    await loadGalaxyHistory();
}
catch(err){
    console.info(err);
}

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

const systemSheet = (await loadGoogleSheet(systemDocId)).sheetsByIndex[0];
const personalSheet = (await loadGoogleSheet(personalDoc)).sheetsByIndex[0];

// My data
let sectors = null;
const knownSystems = new Set();

await systemSheet.loadHeaderRow(7);
let curRows = await systemSheet.getRows();
await personalSheet.loadCells('B2:D3');
console.info("Data loaded from sheets");

Object.values(curRows).forEach(val => {
    const name = val.Name;
    if(name && name.length > 0) {
        // console.debug(name);
        knownSystems.add(name.toLowerCase());
    }
});

// let galaxy = JSON.parse(fs.readFileSync('legacy7_snapshots/state_2022-03-09T10.json', 'utf8'));

app.get('/galaxy', cors(), (req, res) => {
    console.info("Sending init data");

    res.send(JSON.stringify(galaxyHistory));
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
            if(payload.type === "selectsystem") {
                console.log("Received selected system. Parsing...");
                let data = payload.data;
                console.info(JSON.stringify(data));
                if(knownSystems.has(data.name)) {
                    console.debug("Already have system '" + data.name + "'; ignoring");
                    return;
                }

                let details = getSystemSlotDetails(data.bodies);
                console.debug("Parsed details: " + JSON.stringify(details));

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
            }
            else if(payload.type === "player") {
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
                fs.writeFile('test_data/state.json', JSON.stringify(payload.data), err => {
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
                Object.values(snap.sectors).forEach( s => {
                    delete s.adjacent;
                    delete s.centroid;
                    delete s.points;
                });
                Object.values(snap.stellar_systems).forEach( s => {
                    delete s.class;
                    delete s.name;
                    delete s.position;
                    delete s.score;
                    delete s.type;

                });
                let d = DateTime.now();
                let filename = 'legacy7_snapshots/state_' + d.toISODate() + 'T' + d.hour + '.json';
                console.info("Writing to file: " + filename);
                fs.writeFile(filename, JSON.stringify(snap), err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                });
            }
            else {
                console.debug(body);
            }
        }
        catch (err) {

        }
    });
    // console.log("Received something!");
});

app.listen(8080, () => {
    console.info("Server started");
});

function getSystemSlotDetails(data) {
    console.debug("Parsing details of: " + data);
    let res = {"habitable_planet":{planets:0, slots:0, prod:0, tech:0, appeal:0}, "sterile_planet":{planets:0, slots:0, prod:0, tech:0, appeal:0}, "others":{slots:0, prod:0, tech:0, appeal:0}};

    Object.values(data).forEach(val => {
        console.debug("Parsing orbital: " + JSON.stringify(val));
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

async function loadGalaxyHistory() {

    // we need the base data loaded first before
    const data = fs.readFileSync("legacy7_snapshots/base_data.json", 'utf8');
    const base = JSON.parse(data);
    galaxyHistory.start = base.start;
    console.info("Galaxy starts at " + galaxyHistory.start);
    galaxyHistory.base = base.galaxy;
    console.info("Galaxy starts at " + galaxyHistory.base);
    galaxyHistory.snapshots = [];

    let prevState = {};
    Object.assign(prevState, base.galaxy);

    const files = fs.readdirSync("legacy7_snapshots/");
    files.sort();

    files.forEach(function(file) {
        console.info("File: " + file);
        if(/state_[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{1,2}\.json(?!.)/.test(file)) {
            console.info("\tMatched, processing...");
            const fdata = fs.readFileSync("legacy7_snapshots/"+file, 'utf8');
            try {
                let time = file.match(/([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{1,2})/)[0];
                let state = JSON.parse(fdata);

                state.sectors = state.sectors.filter((val, i, state) => {
                    let p = prevState.sectors[i];
                    if(val.owner !== p.owner) {
                        prevState.sectors[i] = val;
                        return true;
                    }
                    return false;
                });

                state.stellar_systems = state.stellar_systems.filter((val, i, state) => {
                    let p = prevState.stellar_systems[i];
                    if(val.owner !== p.owner) {
                        prevState.stellar_systems[i] = val;
                        return true;
                    }
                    return false;
                });
                console.info("Retained data: " + JSON.stringify(state));

                let snap = {time: time, data: state};
                galaxyHistory.snapshots.push(snap);
                console.info("\tProcessed successfully");
            }
            catch(err) {
                console.info("\tFailed: " + err);
            }
        }
    });

    console.info("All done!");
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