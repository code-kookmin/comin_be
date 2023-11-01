import express from 'express';
import connection from '../../config/connection';


const route = express.Router();

route.get("/", async (req, res)=>{
  try{
    const result = await connection.query("SELECT * FROM category WHERE name = ?",['test']);
    console.log(result);
  }catch(err){
    console.log(err)
  }
  res.sendStatus(200);
});

export default route;