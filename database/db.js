const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '9dream_database',
  password: 'pgadmin',
  port: 5432
})

module.exports = {
  query: (text, params) => pool.query(text, params),
};