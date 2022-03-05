import express from 'express';
import GoogleSpreadsheet from 'google-spreadsheet';
import 'fs';
import * as fs from "fs";

const app = express();

let creds = ""

try {
    console.info("Loading credentials for GCP");
    creds = JSON.parse(fs.readFileSync('secrets/uploader.json', 'utf8'));
} catch (err) {
    console.error(err);
}

const doc = new GoogleSpreadsheet.GoogleSpreadsheet('1V8VNAMQ0PzFzqj-giNacsY2GJnCLTHqYZMXutgJOQ0g');
await doc.useServiceAccountAuth({
    client_email: "rc-receiver-uploader@aerobic-furnace-343101.iam.gserviceaccount.com",
    private_key: creds.private_key,
});

await doc.loadInfo(); // loads document properties and worksheets
console.info("System sheet loaded");
console.log(doc.title);
const sheet = doc.sheetsByIndex[0];

// My data
let sectors = null;
const knownSystems = new Set();

await sheet.loadHeaderRow(7);
let curRows = await sheet.getRows();
console.info("Rows loaded from Sheet");

Object.values(curRows).forEach(val => {
    const name = val.Name;
    if(name && name.length > 0) {
        console.info(name);
        knownSystems.add(name.toLowerCase());
    }
});

console.log("Marin in known set? " + knownSystems.has("marin"));

app.get('/init', (req, res) => {
    console.info("Sending init data");
    res.send("Sending startup data");
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
                    console.info("Already have system '" + data.name + "'; ignoring");
                    return;
                }

                let details = getSystemSlotDetails(data.bodies);
                console.log("Parsed details: " + JSON.stringify(details));

                // Get current sheet data
                sheet.getRows();
                sheet.addRow([
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
                    console.info("Already have sector data; ignoring");
                    return;
                }
                console.log("Got sector data: " + body);
                sectors = payload.data;
            }
            else {
                console.log(body);
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
    console.log("Parsing details of: " + data);
    let res = {"habitable_planet":{planets:0, slots:0, prod:0, tech:0, appeal:0}, "sterile_planet":{planets:0, slots:0, prod:0, tech:0, appeal:0}, "others":{slots:0, prod:0, tech:0, appeal:0}};

    Object.values(data).forEach(val => {
        console.log("Parsing orbital: " + JSON.stringify(val));
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