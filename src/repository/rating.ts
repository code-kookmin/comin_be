import connection from '../config/connection';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { RatingCreate } from '../domain/rating/ratingCreate';

async function save(rating: RatingCreate) {
  // id, user_id, round_id, registed_date, solved_count, solved_count_weight
  const createQuery = `INSERT INTO rating VALUES(NULL, ?, ?, ?, ?, ?)`;
  const createParams = Object.values(rating);
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(createQuery, createParams);
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const ratingRepository = { save };
