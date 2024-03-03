import connection from '../config/connection';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { RatingCreate } from '../domain/rating/ratingCreate';
import { Rating } from '../domain/rating/rating';

interface RatingRow extends RowDataPacket {
  id: number;
  user_id: number;
  round_id: number;
  registed_date: String;
  solved_count: number;
  solved_count_weight: number;
  tier: number;
}

function RatingRowToRating(obj: RatingRow) {
  return {
    id: obj.id,
    userId: obj.user_id,
    roundId: obj.round_id,
    registedDate: obj.registed_date,
    solvedCount: obj.solved_count,
    solvedCountWeight: obj.solved_count_weight,
    tier: obj.tier,
  } as Rating;
}

async function save(rating: RatingCreate) {
  // id, user_id, round_id, registed_date, solved_count, solved_count_weight
  const createQuery = `INSERT INTO rating(user_id, round_id, solved_count, solved_count_weight, tier) VALUES(?, ?, ?, ?, ?)`;
  const createParams = Object.values(rating);
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(createQuery, createParams);
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function getUserRatingByRound(userId: number, roundId: number) {
  const selectQuery = `SELECT * FROM rating WHERE user_id=? AND round_id=? ORDER BY registed_date DESC`;
  const selectParam = [userId, roundId];
  try {
    const [result, field]: [RatingRow[], FieldPacket[]] = await connection.query<[RatingRow]>(selectQuery, selectParam);
    if (result.length === 0) return undefined;
    return result.map((value) => RatingRowToRating(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const ratingRepository = { save, getUserRatingByRound };
