const http = require('http');

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
