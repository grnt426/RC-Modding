import * as http from 'http';
import GoogleSpreadsheet from 'google-spreadsheet';
import 'fs';
import * as fs from "fs";

let creds = ""

try {
    creds = JSON.parse(fs.readFileSync('secrets/uploader.json', 'utf8'));
} catch (err) {
    console.error(err)
}

const doc = new GoogleSpreadsheet.GoogleSpreadsheet('1V8VNAMQ0PzFzqj-giNacsY2GJnCLTHqYZMXutgJOQ0g');
await doc.useServiceAccountAuth({
    client_email: "rc-receiver-uploader@aerobic-furnace-343101.iam.gserviceaccount.com",
    private_key: creds.private_key,
});

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);
const sheet = doc.sheetsByIndex[0];
let sectors = [];

await sheet.loadHeaderRow(7);
sheet.getRows();

const requestListener = function (req, res) {

    var body = '';
    req.on('data', function(data) {
        body += data
    });
    req.on('end', function() {
        console.log('Body: ' + body)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('post received')

        try {
            let payload = JSON.parse(body);
            if(payload.type === "selectsystem") {
                console.log("Received selected system. Parsing...");
                let data = payload.data;
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

                console.log("Successfully saved '" + data.name + "'");
            }
            else if(payload.type === "sectors") {
                console.log("Got sector data: " + body);
                sectors = payload.data;
            }
        }
        catch (err) {

        }
    });
    console.log("Received something!")
}

const server = http.createServer(requestListener);
server.listen(8080);

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