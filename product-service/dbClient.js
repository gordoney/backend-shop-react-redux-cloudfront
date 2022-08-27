'use strict';

const { Client } = require('pg');
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: 'postgres.ceqrtpzrlirb.eu-west-1.rds.amazonaws.com',
  port: '5432',
  database: 'postgres',
  user: 'postgres',
  password: '5DAOlEmV5Z7YT443BUub',
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
