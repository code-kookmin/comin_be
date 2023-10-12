import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

connection.connect(()=>{
  console.log("connection Success")
});