import express from 'express'
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from '../../config/connection';
dotenv.config();

const whiteList:string[] = [process.env.ALLOWED_DOMAIN as string];
const corsOption = {
  origin:(origin:string, callback:Function)=>{
    if(whiteList.indexOf(origin)!==-1){
      return callback(null, true);
    }else{
      return callback(new Error("허용되지 않은 도메인입니다."));
    }
  }
}

const getHashedPassword = async (password : string)=>{
  const salt:string = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND as string));
  const hashedPassword:string = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const route = express.Router();
route.use(cors(corsOption as object));
route.use(express.json());
route.use(express.urlencoded({extended:true}));

// 회원가입 라우터
route.post("/", async (req, res)=>{
  const {email, password, name, birthday, githubName, baekjoonName} = req.body;
  if(!email || !password || !name || !birthday || !githubName || !baekjoonName){
    return res.sendStatus(400);
  }
  const hashedPassword = await getHashedPassword(password);
  const selectQuery = `SELECT * FROM user WHERE email=(?)`;
  const selectParam = [email];
  try{
    const selectResult:any[] = await connection.query(selectQuery, selectParam);
    if(selectResult[0].length==0){
      const insertQuery = `INSERT INTO user(email, password, name, birthday, github_name, baekjoon_name) 
        VALUES (?, ?, ?, ?, ?, ?)`;
      const insertParam = [email, password, name, birthday, githubName, baekjoonName];
      await connection.query(insertQuery, insertParam);
      console.log(hashedPassword);
      return res.sendStatus(200);
    }
  }catch(err){
    console.log(err);
  }
  res.sendStatus(400);
});

export default route;