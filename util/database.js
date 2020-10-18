const Sequleize = require('sequelize');

const sequelize = new Sequleize('node_with_max', 'dev', 'dev', {
  dialect: 'mysql',
  hose: 'localhost',
});

module.exports = sequelize;

/* const mysql = require('mysql2');
const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'dev',
  password: 'dev',
  database: 'nod_with_max',
});

module.exports = connectionPool.promise(); */
