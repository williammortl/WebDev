// required libraries
var http = require("http");
var url = require("url");
var fs = require("fs")

// print the query string
function PrintQueryString(urlString) {

	// print the URL
	console.log('The requested URL was: ' + urlString);

	// print each value in query string
	console.log('QUERY STRING:');
	console.log('-------------');
	var urlParsed = url.parse(urlString, true);
	for (var key in urlParsed.query) {
		console.log('Key: ' + key + ' has value: ' + urlParsed.query[key]);
	}
}

// open first http server
http.createServer(function (request, response) {

	// log receipt of the request
	console.log('Received request on 8080, headers:\r\n' + JSON.stringify(request.headers));

	// print query string
	PrintQueryString(request.url);

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
        name = urlParsed.query['name'];
        console.log(name + ' called the application');

        // load file
        var contents = fs.readFileSync('template.html', 'utf8');

        // replace @@ in string
        contents = contents.replace('@@', name);

        // send the file
	    response.writeHead(400, {'Content-Type': 'text/html'});
    	response.end(contents);
    }
}).listen(8080);

// console will print the message
console.log('Servers running at http://127.0.0.1:8080');
