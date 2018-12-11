const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 * @returns {object} object
 */
const createRedFlagTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  redflags(
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL,
    title VARCHAR(300) NOT NULL,
    type VARCHAR(200) NOT NULL,
    location VARCHAR(300) NOT NULL,
    culprits VARCHAR(300) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
  )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 * @returns {object} object
 */
const dropRedFlagTable = () => {
  const queryText = 'DROP TABLE IF EXISTS redflags';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Intervention Table
 * @returns {object} object
*/

const createInterventionTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  interventions(
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL,
    title VARCHAR(300) NOT NULL,
    type VARCHAR(200) NOT NULL,
    location VARCHAR(300) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP,
    status VARCHAR(40) NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
  )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 * @returns {object} object
 */
const dropInterventionTable = () => {
  const queryText = 'DROP TABLE IF EXISTS interventions';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create User Table
 * @returns {object} object
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        created_date DATE DEFAULT CURRENT_DATE     
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 * @returns {object} object
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 * @returns {object} object
 */
const createAllTables = () => {
  createRedFlagTable();
  createInterventionTable();
  createUserTable();
};
/**
 * Drop All Tables
 * @returns {object} object
 */
const dropAllTables = () => {
  dropRedFlagTable();
  dropInterventionTable();
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createRedFlagTable,
  createInterventionTable,
  createUserTable,
  createAllTables,
  dropRedFlagTable,
  dropInterventionTable,
  dropUserTable,
  dropAllTables,
};

require('make-runnable');
