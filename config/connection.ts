import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export default mysql2.createPool({
  host: process.env.host,
  port: parseInt(process.env.port as string),
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

