import express from 'express'
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from '../../config/connection';
dotenv.config();

const allowedDomainList:string[] = [process.env.ALLOWED_DOMAIN as string];
const corsOption = {
  origin:allowedDomainList
};

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
  // 사용자 데이터 중 누락 데이터가 있다면 status:404 반환
  if(!email || !password || !name || !birthday || !githubName || !baekjoonName){
    return res.json({
      status:false,
      message:"누락된 정보가 있습니다"
    });
  }
  const selectQuery = `SELECT * FROM user WHERE email=(?)`;
  const selectParam = [email];
  try{
    const selectResult:any[] = await connection.query(selectQuery, selectParam);
    // email이 중복되지 않으면 현재 사용자 정보 추가
    if(selectResult[0].length==0){
      const hashedPassword = await getHashedPassword(password);
      const insertQuery = `INSERT INTO user(email, password, name, birthday, github_name, baekjoon_name) 
        VALUES (?, ?, ?, ?, ?, ?)`;
      const insertParam = [email, hashedPassword, name, birthday, githubName, baekjoonName];
      await connection.query(insertQuery, insertParam);
      return res.json({
        status:true,
        message:"회원가입 성공!"
      });
    }else{
      return res.json({
        status:false,
        message:"이미 가입한 사용자입니다."
      });
    }
  }catch(err){
    return res.json({
      status:false,
      message:"서버 에러"
    });
  }
});

export default route;