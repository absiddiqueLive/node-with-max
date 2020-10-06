const mysql = require('mysql2');
const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'dev',
  password: 'dev',
  database: 'nod_with_max',
});

module.exports = poll.promise();
