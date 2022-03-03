const http = require('http');

const requestListener = function (req, res) {
    console.log("Received something!")
    console.log(req)
    res.writeHead(200);
    res.end('Done');
}

const server = http.createServer(requestListener);
server.listen(8080);
