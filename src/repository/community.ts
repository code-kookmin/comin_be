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
    userId: obj.user_id,
    categoryId: obj.category_id,
    title: obj.title,
    content: obj.content,
    like: obj.like,
  } as Communtiy;
}

async function findById(id: number) {
  const selectQuery = `SELECT * FROM community WHERE id=?`;
  try {
    const [[result], field] = await connection.query<[CommuntiyRow]>(
      selectQuery,
      [id]
    );
    return communityRowToCommunity(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function save(
  title: string,
  categoryId: number,
  content: string,
  userId: number
) {
  const insertParam = [userId, categoryId, title, content, 0];
  const insertQuery = `INSERT INTO community VALUES(NULL, ?, ?, ?, ?, ?)`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(insertQuery, insertParam);
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function deleteById(id: number) {
  const deleteQuery = `DELETE FROM community WHERE id=?`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(deleteQuery, [id]);
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function update(id: number, title: string, content: string) {
  const updateQuery = `UPDATE community SET title=?, content=? WHERE id=?`;
  const updateParam = [title, content, id];
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(updateQuery, updateParam);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const communityRepository = { save, findById, deleteById, update };

export default communityRepository;
