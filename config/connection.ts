import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const connection = mysql2.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

connection.connect(()=>{
  console.log("connection Success")
});

export default connection;