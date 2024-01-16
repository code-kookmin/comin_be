import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { Reply } from '../domain/reply';

interface ReplyRow extends RowDataPacket {
  id: number;
  comment_id: number;
  user_id: number;
  content: string;
  like: number;
}

const findById = async (id: number) => {
  const selectQuery = `SELECT * FROM reply WHERE id=?`;
  try {
    const [[result], field]: [ReplyRow[], FieldPacket[]] = await connection.query(selectQuery, [id]);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const findByCommentId = async (id: number) => {
  const selectQuery = `SELECT * FROM reply WHERE comment_id=?`;
  try {
    const [result, field]: [ReplyRow[], FieldPacket[]] = await connection.query(selectQuery, [id]);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const findByUserId = async (id: number) => {
  const selectQuery = `SELECT * FROM reply WHERE user_id=?`;
  try {
    const [result, field]: [ReplyRow[], FieldPacket[]] = await connection.query(selectQuery, [id]);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const save = async (reply: Reply) => {
  const insertQuery = `INSERT INTO reply VALUES(NULL, ?, ?, ?,  0)`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(insertQuery, [
      reply.userId,
      reply.commentId,
      reply.content,
    ]);
    if (result.insertId <= 0) return undefined;
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const update = async (id: number, reply: Reply) => {
  const updateQuery = 'UPDATE reply SET content=?, `like`=? WHERE id=?';
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(updateQuery, [
      reply.content,
      reply.like,
      id,
    ]);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const deleteById = async (id: number) => {
  const deleteQuery = `DELETE FROM reply WHERE id=?`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(deleteQuery, [id]);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const replyRepository = {
  findById,
  findByCommentId,
  findByUserId,
  save,
  update,
  deleteById,
};

export default replyRepository;
