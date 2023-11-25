import connection from '../config/connection';
import { RowDataPacket } from 'mysql2';
import { User } from '../domain/user';
import { connect } from 'http2';

interface UserRow extends RowDataPacket {
  email : string,
  password : string,
  name : string,
  birthday : string,
  github_name : string,
  baekjoon_name : string,
}

function UserRowToUser(obj:UserRow){
  return {
    email:obj.email,
    name:obj.name,
    password:obj.password,
    birthday:obj.birthday,
    github_name:obj.github_name,
    baekjoon_name:obj.baekjoon_name
  } as User;
}

async function save(user:User){
  const insertQuery = 'INSERT INTO user(?) VALUSE(?)';
  // try : fetch, query할 때는 써라
  try{await connection.query(insertQuery, [Object.keys(user), Object.values(user)])}
  catch(err){console.log(err)}
}

async function findByEmail(email:string){
  const selectQuery = 'SELECT * FROM user WHERE email=?';
  try{const [[result],field] = await connection.query<[UserRow]>(selectQuery, [email]);
  return UserRowToUser(result);}
  catch(err){console.log(err);} 
}

const userRepository = {findByEmail, save};
export default userRepository;