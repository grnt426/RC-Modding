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
await sheet.loadCells()
let cell = sheet.getCell(0, 0)
cell.value = "Hello, world!"
await sheet.saveUpdatedCells()

const requestListener = function (req, res) {

    var body = '';
    req.on('data', function(data) {
        body += data
    });
    req.on('end', function() {
        console.log('Body: ' + body)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('post received')
    });
    console.log("Received something!")
}

const server = http.createServer(requestListener);
server.listen(8080);
