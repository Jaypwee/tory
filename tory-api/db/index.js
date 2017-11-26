// Accesses PostgreSQL server

// "use strict";

// const {Client} = require('pg');

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'torydb',
//   password: 'qkrtjddnr101',
//   port: 5432,
// });

// client.connect();

// module.exports = client;

//Access using MongoDB

var url = 'mongodb://localhost:27017/Torydb'

module.exports = {
  name: 'rest-api',
  version: '1.0.0',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
      uri: url,
  }
}