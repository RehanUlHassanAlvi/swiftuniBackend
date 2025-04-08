// utils/db.js
const { Pool } = require("pg");

// Fix for parsing of numeric fields
const types = require("pg").types;
types.setTypeParser(1700, "text", parseFloat);

const {
  dbConfigurations: { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT },
} = require("../conf/config");

console.log("DB Configurations:", { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT });

// Parse DB_SSL as a boolean
const DB_SSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
  ssl: DB_SSL ? { rejectUnauthorized: false } : false, // Use SSL only if DB_SSL is true
});

let dataArray = [];

async function initializeDeletedUsersArray() {
  try {
    const query = "SELECT * FROM public.get_deleted_users()";
    const query2 = "UPDATE public.users SET sessionid = NULL, session_expiry = NULL";

    const { rows } = await pool.query(query);
    const { rows2 } = await pool.query(query2);
    dataArray = rows.map((item) => item.UserID);
    console.log("Deleted Users' ID:", dataArray);
  } catch (error) {
    console.error("Error initializing array:", error.message);
  }
}

// Export a function that returns a promise
function initializeAndExportArray() {
  return new Promise((resolve, reject) => {
    initializeDeletedUsersArray()
      .then(() => {
        resolve(dataArray);
      })
      .catch(reject);
  });
}

function returnUpdatedDataArray() {
  return dataArray;
}

initializeDeletedUsersArray();

// Query
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  initializeDeletedUsersArray,
  initializeAndExportArray,
  query,
  pool,
  returnUpdatedDataArray,
};