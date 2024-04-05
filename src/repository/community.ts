import { Communtiy } from '../domain/community/community';
import connection from '../config/connection';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { CommunityUpdate } from '../domain/community/communityUpdate';
import { CommuntiyCreate } from '../domain/community/communityCreate';
import { val } from 'cheerio/lib/api/attributes';

interface CommuntiyRow extends RowDataPacket {
  id: number;
  user_id: number;
  subcategory_id: number;
  title: string;
  content: string;
  like: number;
}

function communityRowToCommunity(obj: CommuntiyRow) {
  return {
    id: obj.id,
    userId: obj.user_id,
    subcategoryId: obj.subcategory_id,
    title: obj.title,
    content: obj.content,
    like: obj.like,
  } as Communtiy;
}

async function findAllByPage(pageSize: number, pageNumber: number) {
  const selectQuery = `SELECT * FROM community LIMIT ?, ?`;
  const selectParam = [(pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[CommuntiyRow]>(selectQuery, selectParam);
    if (!result) return undefined;
    return result.map((value) => communityRowToCommunity(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findById(id: number) {
  const selectQuery = `SELECT * FROM community WHERE id=?`;
  try {
    const [[result], field] = await connection.query<[CommuntiyRow]>(selectQuery, [id]);
    return communityRowToCommunity(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByUserId(userId: number) {
  const selectQuery = `SELECT * FROM community WHERE user_id=?`;
  try {
    const [[result], field] = await connection.query<[CommuntiyRow]>(selectQuery, [userId]);
    return communityRowToCommunity(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByCategoryId(categoryId: number, pageSize: number, pageNumber: number) {
  const selectQuery = `
    SELECT com.* FROM community com 
    INNER JOIN subcategory sub ON com.subcategory_id=sub.id 
    INNER JOIN category cat ON sub.category_id=cat.id
    WHERE cat.id = ?
    LIMIT ?, ?
  `;
  const selectParam = [categoryId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[CommuntiyRow]>(selectQuery, selectParam);
    return result.map((value) => communityRowToCommunity(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findBySubCategoryId(subcategoryId: number, pageSize: number, pageNumber: number) {
  const selectQuery = `SELECT * FROM community WHERE subcategory_id=? LIMIT ?, ?`;
  const selectParam = [subcategoryId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[CommuntiyRow]>(selectQuery, [selectParam]);
    return result.map((value) => communityRowToCommunity(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function save(community: CommuntiyCreate) {
  const insertParam = [community.userId, community.subcategoryId, community.title, community.content, 0];
  const insertQuery = `INSERT INTO community VALUES(NULL, ?, ?, ?, ?, ?)`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(insertQuery, insertParam);
    console.log('community create insertId : ', result.insertId);
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function deleteById(id: number) {
  const deleteQuery = `DELETE FROM community WHERE id=?`;
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(deleteQuery, [id]);
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function update(community: CommunityUpdate) {
  const updateQuery = `UPDATE community SET title=?, content=? WHERE id=?`;
  const updateParam = [community.title, community.content, community.id];
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(updateQuery, updateParam);
    if (result.affectedRows === 0) return undefined;
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const communityRepository = {
  save,
  findAllByPage,
  findById,
  deleteById,
  update,
  findByUserId,
  findByCategoryId,
  findBySubCategoryId,
};

export default communityRepository;
