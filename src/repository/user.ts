import connection from '../config/connection';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { UserCreate } from '../domain/user/userCreate';
import { User } from '../domain/user/user';

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  name: string;
  birthday: string;
  github_name: string;
  baekjoon_name: string;
}

function UserRowToUser(obj: UserRow) {
  if (typeof obj == 'undefined') return undefined;
  return {
    id: obj.id,
    email: obj.email,
    name: obj.name,
    password: obj.password,
    birthday: obj.birthday,
    githubName: obj.github_name,
    baekjoonName: obj.baekjoon_name,
  } as User;
}

async function save(user: UserCreate) {
  const insertQuery = `INSERT INTO user VALUES(NULL, ?)`;
  // try : fetch, query할 때는 써라
  try {
    await connection.query(insertQuery, [Object.values(user)]);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function update(user: UserCreate) {
  const updateQuery = `UPDATE user SET name=?, birthday=?, github_name=?, baekjoon_name=? WHERE email=?`;
  const updateQueryParam = [user.name, user.birthday, user.githubName, user.baekjoonName, user.email];
  try {
    const [result, info]: [ResultSetHeader, FieldPacket[]] = await connection.query(updateQuery, updateQueryParam);
    console.log(result);
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

async function findByEmail(email: string) {
  const selectQuery = 'SELECT * FROM user WHERE email=?';
  try {
    const [[result], field] = await connection.query<[UserRow]>(selectQuery, [email]);
    return UserRowToUser(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findAll() {
  const selectQuery = 'SELECT * FROM user';
  try {
    const returnArray: User[] = [];
    const [result, field] = await connection.query<[UserRow]>(selectQuery);
    if (!result) return undefined;
    for (let i = 0; i < result.length; i++) {
      const user = UserRowToUser(result[i]);
      if (user) returnArray.push(user);
    }
    return returnArray;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const userRepository = { findByEmail, findAll, save, update };
export default userRepository;
