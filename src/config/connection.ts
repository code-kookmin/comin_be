import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default mysql2.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
