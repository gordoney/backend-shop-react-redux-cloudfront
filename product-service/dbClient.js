'use strict';

const { Client } = require('pg');
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

const createConnection = () => {
  const dbClient = new Client(dbOptions);
  dbClient.connect();

  return dbClient;
}

export default createConnection;
