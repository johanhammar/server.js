
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path')

var port = 8090;
var host = 'localhost';

port = process.argv[2] || port;

http.createServer(function (req, res) {
    var filepath = url.parse(req.url).pathname;
    sendResponse(filepath, res);
}).listen(port, host);

console.log("Server started. Listening at http://" + host + ":" + port);

function sendResponse(filepath, res) {

    var file = path.join(process.cwd(), 'public', filepath);

    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    console.log(err);
                    send500(res, err);
                } else {
                    send200(res, data);
                }
            });
        } else {
            send404(res);
        }
    });

    function send200(res, data) {
        res.writeHeader('200');
        res.write(data);
        res.end();
    };

    function send404(res) {
        res.writeHeader('404');
        res.end();
    };

    function send500(res, err) {
        res.writeHeader('500');
        res.write(err);
        res.end();
    }

}
