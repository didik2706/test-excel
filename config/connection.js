require('dotenv').config();
const {
    PG_HOST, PG_USER, PG_PASS, PG_NAME, PG_PORT
} = process.env;
module.exports = require('knex')({
    client: 'pg',
    connection: {
      host : PG_HOST,
      port : PG_PORT,
      user : PG_USER,
      password : PG_PASS,
      database : PG_NAME
    }
});