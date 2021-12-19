const Redis = require("ioredis");
const client = new Redis();

async function f1() {
  await client.hset("test_key", ["__proto__", "hello"]);
  console.log("hget:", await client.hget("test_key", "proto")); // "hello"
  console.log("hgetall:", await client.hgetall("test_key")); // does not include proto: hello
}

f1();
