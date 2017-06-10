// required libraries
var http = require("http");
var url = require("url");

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
	
	// send the HTTP header 
	response.writeHead(200, {'Content-Type': 'text/html'});
   
	// send the response body as "Hello World"
	response.end('<html><body><h1>Hello World</h1></body></html>');
}).listen(8080);

// open second http server
http.createServer(function (request, response) {

	// log receipt of the request
	console.log('Received request on 8081, headers:\r\n' + JSON.stringify(request.headers));
	
	// print query string
	PrintQueryString(request.url);

	// send the HTTP header 
	response.writeHead(200, {'Content-Type': 'text/html'});
   
	// send the response body as "Hello World"
	response.end('<html><body><h1>Goodbye World</h1></body></html>');
}).listen(8081);

// console will print the message
console.log('Servers running at http://127.0.0.1:8080|8081/');
