import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { CommentCreate, CommentUpdate } from '../domain/comment';

interface CommentRow extends RowDataPacket {
  id: number;
  user_id: number;
  community_id: number;
  content: string;
  like: number;
}

const findByCommunityId = async (communityId: number) => {
  const selectQuery = `SELECT * FROM comment WHERE community_id=?`;
  try {
    const [result, field]: [CommentRow[], FieldPacket[]] =
      await connection.query(selectQuery, communityId);
    if (!result[0]) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const findById = async (id: number) => {
  const selectQuery = `SELECT * FROM comment WHERE id=?`;
  try {
    const [[result], field]: [CommentRow[], FieldPacket[]] =
      await connection.query(selectQuery, id);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const save = async (comment: CommentCreate) => {
  const insertQuery = `INSERT INTO comment VALUES(NULL, ?, 0)`;
  const insertParam = [Object.values(comment)];
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(insertQuery, insertParam);
    if (result.insertId <= 0) return undefined;
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const update = async (id: number, comment: CommentUpdate) => {
  const updateQuery = 'UPDATE comment SET content=?, `like`=? WHERE id=?';
  const updateParam = [comment.content, comment.like, id];
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(updateQuery, updateParam);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const deleteById = async (id: number) => {
  const deleteQuery = `DELETE FROM comment WHERE id=?`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] =
      await connection.query(deleteQuery, [id]);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const commentRepository = {
  findById,
  findByCommunityId,
  save,
  update,
  deleteById,
};

export default commentRepository;
