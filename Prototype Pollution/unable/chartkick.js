var badOptions = JSON.parse('{"__proto__": {"test": true}}');
new Chartkick.LineChart("chart", data, badOptions);
console.log("test" in {});
