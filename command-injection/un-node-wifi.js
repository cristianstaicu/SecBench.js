var wifi = require("node-wifi");

wifi.init({
  iface: null, // network interface, choose a random wifi interface if set to null
});

wifi.connect({ ssid: "$(touch aaa)", password: ";touch aaa" }, (error) => {
  console.log("Connected");
});
