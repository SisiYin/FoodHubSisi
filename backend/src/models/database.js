require("dotenv").config({ path: "../config/dotenv/.env" });
const { Pool } = require("pg");
const moment = require("moment");
const databaseConfig = require("../config/database/config");

const pool = new Pool(databaseConfig);

const query = async (sql, values = []) => {
  try {
    return pool
      .query(sql, values)
      .then((result) => {
        result.rows = result.rows.map((row) => {
          if (row.date instanceof Date) {
            const timeZoneFormat = moment(row.date).format();
            row.date = timeZoneFormat;
          }
          return row;
        });
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    throw new Error(err.message);
  }
};

// const query = async (sql, values = []) => {
//   try {
//     const result = await pool.query(sql, values);
//     // console.log("Raw database result:", result);
//     return result;
//   } catch (error) {
//     console.error("Error executing query:", error);
//     throw error;
//   }
// };

module.exports = {
  query,
};
