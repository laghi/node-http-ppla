var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var uuid = require('node-uuid');
var exec = require('child_process').exec;
var os = require('os');
var path = require('path');
var extension = '.ppla';

var printerName = process.argv[3] || 'lp0';
var printerPath = '/dev/usb/' + printerName;
var printer = fs.createWriteStream(printerPath);

printer.on('error', function() {
    console.log('Error opening ' + printerPath);
});

var authToken = process.argv[2];

var server = http.createServer(function(request, response) {

        console.log((new Date()) + ' Connection accepted.');

        request.content = '';

        request.addListener("data", function(chunk) {
            request.content += chunk;
        });

        request.addListener("end", function() {

            var postData = JSON.parse(request.content);
            console.log(postData);
            if (('auth_token' in postData) && postData.auth_token === authToken) {
                if (! 'contentToPrint' in postData) {
                    console.log('No content to print');
                    response.writeHead(500);
                } else {
                    printer.write(new Buffer(postData.contentToPrint, 'ascii'));
                    response.writeHead(200, {"Content-Type": "text/plain"});
                }
            } else {
                response.writeHead(503, {"Content-Type": "text/plain"});
                console.log('No or invalid auth token');
            }

            response.end();
        });

}).listen(9098);
console.log('server up');
