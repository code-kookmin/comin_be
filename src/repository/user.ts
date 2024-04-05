import connection from "../config/connection";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../domain/user";
import { Role } from "../domain/role";

interface UserRow extends RowDataPacket {
  id: number;
  account_name: string;
  email: string;
  password: string;
  name: string;
  birthday: string;
  github_name: string;
  baekjoon_name: string;
  profile_image?: string;
  role?: number;
  organization?: string;
  status_msg?: string;
}

function UserRowToUser(obj: UserRow) {
  if (typeof obj == "undefined") return undefined;
  return {
    id: obj.id,
    accountName: obj.account_name,
    email: obj.email,
    name: obj.name,
    password: obj.password,
    birthday: obj.birthday,
    githubName: obj.github_name,
    baekjoonName: obj.baekjoon_name,
    profileImage: obj.profile_image,
    role: obj.role,
    organization: obj.organization,
    statusMsg: obj.status_msg,
  } as User;
}

async function save(user: User) {
  const insertQuery = `INSERT INTO 
  user(id, account_name, email, password, name, birthday, github_name, baekjoon_name, profile_image, role, organization, status_msg) 
  VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const insertParams = [
    user.accountName,
    user.email,
    user.password,
    user.name,
    user.birthday,
    user.githubName,
    user.baekjoonName,
    user.profileImage,
    user.role ? user.role : Role.ROLE_USER,
    user.organization,
    user.statusMsg,
  ];
  // try : fetch, query할 때는 써라
  try {
    await connection.query(insertQuery, insertParams);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function update(user: User) {
  const updateQuery = `
  UPDATE user 
  SET email=?, password=?, name=?, birthday=?, github_name=?, baekjoon_name=?, profile_image=?, organization=?, status_msg=?
  WHERE accountName=?`;
  const updateQueryParam = [
    user.email,
    user.password,
    user.name,
    user.birthday,
    user.githubName,
    user.baekjoonName,
    user.profileImage,
    user.organization,
    user.statusMsg,
    user.accountName,
  ];
  try {
    const [result, info]: [ResultSetHeader, FieldPacket[]] = await connection.query(updateQuery, updateQueryParam);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

async function updateRole(role: number) {
  const updateQuery = `UPDATE user SET role=?`;
  try {
    const [result, info]: [ResultSetHeader, FieldPacket[]] = await connection.query(updateQuery, [role]);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return 0;
  }
}
async function findById(id: number) {
  const selectQuery = "SELECT * FROM user WHERE id=?";
  try {
    const [[result], field] = await connection.query<[UserRow]>(selectQuery, [id]);
    return UserRowToUser(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByAccountName(accountName: string) {
  const selectQuery = "SELECT * FROM user WHERE account_name=?";
  try {
    const [[result], field] = await connection.query<[UserRow]>(selectQuery, [accountName]);
    return UserRowToUser(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findAll() {
  const selectQuery = "SELECT * FROM user";
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

async function findAllByPage(pageSize: number, pageNumber: number) {
  const selectQuery = "SELECT * FROM user LIMIT ?, ?";
  const selectParam = [pageSize * (pageNumber - 1), pageNumber];
  try {
    const returnArray: User[] = [];
    const [result, field] = await connection.query<[UserRow]>(selectQuery, selectParam);
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

const userRepository = { findByAccountName, findAll, findAllByPage, findById, save, update, updateRole };
export default userRepository;
