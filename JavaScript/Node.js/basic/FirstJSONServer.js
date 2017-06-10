// required libraries
var http = require("http");
var url = require("url");

// open first http server
http.createServer(function (request, response) {

	// log receipt of the request
	console.log('Received request on 8080, headers:\r\n' + JSON.stringify(request.headers));

    // make sure we have "name" in the query string
    var urlParsed = url.parse(request.url, true);
    if (urlParsed.query['name'] == undefined)
    {
	    response.writeHead(400, {'Content-Type': 'text/html'});
    	response.end('<html><body><h1>Application requires <i>name</i> be passed in the query string</h1></body></html>');
    }
    else
    {

        // report name
        console.log(urlParsed.query['name'] + ' called the application');

        // build JSON
        jsonResponseObj = {name: urlParsed.query['name'], val1: 'this', val2: 'is a test', subArray: {subval1: 0, subval2: 1}};
        jsonResponseStr = JSON.stringify(jsonResponseObj);

        // send the JSON
	    response.writeHead(200, {'Content-Type': 'application/json'});
    	response.end(JSON.stringify(jsonResponseStr));
    }
}).listen(8080);

// console will print the message
console.log('Servers running at http://127.0.0.1:8080/');
