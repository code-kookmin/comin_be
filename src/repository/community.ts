import { Communtiy } from "../domain/community/community";
import connection from "../config/connection";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { CommunityUpdate } from "../domain/community/communityUpdate";
import { CommuntiyCreate } from "../domain/community/communityCreate";
import { val } from "cheerio/lib/api/attributes";
import { CommuntiyResponse } from "../domain/community/communityResponse";

interface CommuntiyResponseRow extends RowDataPacket {
  id: number;
  user_id: number;
  subcategory_id: number;
  title: string;
  content: string;
  like: number;
  comments_count: number;
}

function communityResponseRowToCommunityResponse(obj: CommuntiyResponseRow) {
  return {
    id: obj.id,
    userId: obj.user_id,
    subcategoryId: obj.subcategory_id,
    title: obj.title,
    content: obj.content,
    like: obj.like,
    commentsCount: obj.comments_count,
  } as CommuntiyResponse;
}

async function findAllByPage(pageSize: number, pageNumber: number) {
  const selectQuery = `
    SELECT id, user_id, subcategory_id, title, content, \`like\`,
    (SELECT COUNT(*) FROM comment c WHERE c.community_id = com.id) comments_count
    FROM community com
    LIMIT ?, ?
  `;
  const selectParam = [(pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[CommuntiyResponseRow]>(selectQuery, selectParam);
    if (!result) return undefined;
    return result.map((value) => communityResponseRowToCommunityResponse(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findById(id: number) {
  const selectQuery = `
    SELECT id, user_id, subcategory_id, title, content, \`like\`,
    (SELECT COUNT(*) FROM comment c WHERE c.community_id = com.id) comments_count
    FROM community com
    WHERE id=?
  `;
  try {
    const [[result], field] = await connection.query<[CommuntiyResponseRow]>(selectQuery, [id]);
    if (!result) return undefined;
    return communityResponseRowToCommunityResponse(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByUserId(userId: number) {
  const selectQuery = `
    SELECT id, user_id, subcategory_id, title, content, \`like\`,
    (SELECT COUNT(*) FROM comment c WHERE c.community_id = com.id) comments_count
    FROM community com
    WHERE user_id=?
  `;
  try {
    const [[result], field] = await connection.query<[CommuntiyResponseRow]>(selectQuery, [userId]);
    return communityResponseRowToCommunityResponse(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByCategoryId(categoryId: number, pageSize: number, pageNumber: number) {
  const selectQuery = `
    SELECT id, user_id, subcategory_id, title, content, \`like\`,
    (SELECT COUNT(*) FROM comment c WHERE c.community_id = com.id) comments_count
    FROM community com 
    INNER JOIN subcategory sub ON com.subcategory_id=sub.id 
    INNER JOIN category cat ON sub.category_id=cat.id
    WHERE cat.id = ?
    LIMIT ?, ?
  `;
  const selectParam = [categoryId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[CommuntiyResponseRow]>(selectQuery, selectParam);
    return result.map((value) => communityResponseRowToCommunityResponse(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findBySubCategoryId(subcategoryId: number, pageSize: number, pageNumber: number) {
  const selectQuery = `
    SELECT id, user_id, subcategory_id, title, content, \`like\`,
    (SELECT COUNT(*) FROM comment c WHERE c.community_id = com.id) comments_count
    FROM community com
    WHERE subcategory_id=? 
    LIMIT ?, ?
  `;
  const selectParam = [subcategoryId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[CommuntiyResponseRow]>(selectQuery, [selectParam]);
    return result.map((value) => communityResponseRowToCommunityResponse(value));
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
    console.log("community create insertId : ", result.insertId);
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
