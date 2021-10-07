const { Client } = require('pg')
const client = new Client()
client.connect()

const sql = `SELECT 1 AS "\\'/*", 2 AS "\\'*/\n + console.log('hey')] = null;\n//"`

client.query(sql, (err, res) => {
  client.end()
});
