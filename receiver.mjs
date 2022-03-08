import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';
import * as fs from "fs";
import cors from 'cors';
const {Console} = console;

const app = express();

let creds;
let systemDocId;
let personalDoc;

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
        console.debug(name);
        knownSystems.add(name.toLowerCase());
    }
});

console.debug("Marin in known set? " + knownSystems.has("marin"));

let galaxy = JSON.parse(fs.readFileSync('test_data/legacy_galaxy.json', 'utf8'));

app.get('/galaxy', cors(), (req, res) => {
    console.info("Sending init data");
    res.send(JSON.stringify(galaxy));
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
                console.debug("Got sector data: " + body);
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
                fs.writeFile('test_data/legacy_galaxy_second.json', JSON.stringify(payload.data), err => {
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