import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { UserRankingCreate } from '../domain/userRanking/userRankingCreate';
import { UserRanking } from '../domain/userRanking/userRanking';

interface UserRankingRow extends RowDataPacket {
  id: number;
  user_id: number;
  round_id: number;
  total_solved: number;
  total_solved_weight: number;
}

function UserRankingRowToUserRanking(obj: UserRankingRow) {
  return {
    id: obj.id,
    userId: obj.user_id,
    roundId: obj.round_id,
    totalSolved: obj.total_solved,
    totalSolvedWeight: obj.total_solved_weight,
  } as UserRanking;
}

async function save(ranking: UserRankingCreate) {
  const insertQuery = 'INSERT INTO user_ranking VALUES(NULL, ?, ?, ?, ?, ?)';
  const insertParam = [ranking.userId, ranking.roundId, ranking.totalSolved, ranking.totalSolvedWeight, ranking.tier];
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(insertQuery, insertParam);
    if (result.insertId === 0) return undefined;
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByUserAndRound(userId: number, roundId: number) {
  const selectQuery = 'SELECT * FROM user_ranking WHERE user_id=? AND round_id=?';
  const selectParam = [userId, roundId];
  try {
    const [[result], field] = await connection.query<[UserRankingRow]>(selectQuery, selectParam);
    if (!result) return undefined;
    return UserRankingRowToUserRanking(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findOrderedBySolvedCount(roundId: number, pageSize: number, pageNumber: number) {
  // LIMIT a, b : (a+1)번째부터 b개 추출
  const selectQuery = 'SELECT * FROM user_ranking WHERE round_id=? ORDER BY total_solved LIMIT ?, ?';
  const selectParam = [roundId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[UserRankingRow]>(selectQuery, selectParam);
    if (!result[0]) return undefined;
    return result.map((value) => UserRankingRowToUserRanking(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const userRankingRepository = { save, findByUserAndRound, findOrderedBySolvedCount };
