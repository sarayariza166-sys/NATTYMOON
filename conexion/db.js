import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "123456789",
  database: "natymoon",
  port: 5432,
});