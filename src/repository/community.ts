import { Communtiy } from '../domain/community';
import connection from '../config/connection';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

interface CommuntiyRow extends RowDataPacket {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  content: string;
  like: number;
}

function communityRowToCommunity(obj: CommuntiyRow) {
  return {
    user_id: obj.user_id,
    category_id: obj.category_id,
    title: obj.title,
    content: obj.content,
    like: obj.like,
  } as Communtiy;
}

async function findById(id: number) {
  const selectQuery = `SELECT * FROM community WHERE id=?`;
  try {
    const [result, field]: [CommuntiyRow[], FieldPacket[]] =
      await connection.query(selectQuery, [id]);
    console.log(result[0]);
    return result[0];
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function save(title: string, categoryId: number, content: string) {
  const communityKeys = 'user_id, category_id, title, content, `like`';
  const insertParam = [categoryId, title, content, 0];
  const insertQuery = `INSERT INTO community(${communityKeys}) VALUES(1, ?, ?, ?, ?)`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(insertQuery, insertParam);
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const communityRepository = { save };

export default communityRepository;
