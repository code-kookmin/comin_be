import connection from '../config/connection';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../domain/user';

interface UserRow extends RowDataPacket {
  email: string;
  password: string;
  name: string;
  birthday: string;
  github_name: string;
  baekjoon_name: string;
}

function UserRowToUser(obj: UserRow) {
  if (typeof obj == "undefined") return undefined;
  return {
    email: obj.email,
    name: obj.name,
    password: obj.password,
    birthday: obj.birthday,
    githubName: obj.github_name,
    baekjoonName: obj.baekjoon_name,
  } as User;
}

function UserToUserRow(obj: User) {
  return {
    email: obj.email,
    name: obj.name,
    password: obj.password,
    birthday: obj.birthday,
    github_name: obj.githubName,
    baekjoon_name: obj.baekjoonName,
  } as UserRow;
}

async function save(user: User) {
  const userRow = UserToUserRow(user);
  const userRowKeys = Object.keys(userRow).join(', ');
  const insertQuery = `INSERT INTO user(${userRowKeys}) VALUES(?)`;
  // try : fetch, query할 때는 써라
  try {
    await connection.query(insertQuery, [Object.values(userRow)]);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function update(user: User) {
  const updateQuery = `UPDATE user SET name=?, birthday=?, github_name=?, baekjoon_name=? WHERE email=?`;
  const updateQueryParam = [
    user.name,
    user.birthday,
    user.githubName,
    user.baekjoonName,
    user.email,
  ];
  try {
    const [result, info]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(updateQuery, updateQueryParam);
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
    const [[result], field] = await connection.query<[UserRow]>(selectQuery, [email,]);
    return UserRowToUser(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const userRepository = { findByEmail, save, update };
export default userRepository;
