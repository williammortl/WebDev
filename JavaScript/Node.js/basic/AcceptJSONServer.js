// required libraries
var http = require("http");
var url = require("url");
var qs = require('querystring');

// open first http server
http.createServer(function (request, response) {

	// log receipt of the request
	console.log('Received request on 8080, headers:\r\n' + JSON.stringify(request.headers));

    // extract body of post
    //  example: data={"test1": "will", "test2": "tay", "test3": 3, "test4": {"val1": 1, "val2": 2}}
    if (request.method == 'POST') {
        var postData = '';
        request.on('data', function (chunk) {
            postData += chunk;

            // foil flood attack
            if (postData.length > 1e6) { 
                request.connection.destroy();
            }
        });
        request.on('end', function () {

            // print JSON
            console.log('Raw post was: ' + postData);
            postData = qs.parse(postData);

            // convert to object
            jsonData = JSON.parse(postData['data']);
            console.log('JSON in POST was:');
            console.log(jsonData);

            // loop through JSON and send HTML
    	    response.writeHead(200, {'Content-Type': 'text/html'});
            var output = '<html><body><h1>JSON data sent:</h1><br />';
            for (var key in jsonData)
            {
                output += 'name: <u>' + key + '</u> value: <b>' + jsonData[key] + '</b><br />';
            }
            output += '</body></html>';
            response.end(output);
        });
    }    
    else {

        // response if there was no JSON POST for value data
	    response.writeHead(400, {'Content-Type': 'text/html'});
        response.end('<html><body><h1>Need to <i>POST</i> a JSON string in value <i>data</i></body></html>');
    }
}).listen(8080);

// console will print the message
console.log('Servers running at http://127.0.0.1:8080/');
