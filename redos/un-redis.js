const redis = require("redis");
const client = redis.createClient();

var str =
  '1111111111.1 [1 a] "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” "a” ';

client.monitor(() => {}); // <- required!

client.set("key", str, (err, resp) => {
  console.log("set " + resp);

  client.get("key", (err, result) => {
    // <- the get call gets stuck

    console.log("Get: " + result); // <- this never runs.
    console.log("Done:");
    process.exit(0);
  });
});

//var str = "foobar";
