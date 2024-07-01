const { Pool } = require('pg');
console.log(process.env.POSTGRES_USERNAME)
const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
});

module.exports = pool;