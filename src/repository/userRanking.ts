import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../config/connection";
import { UserRankingCreate } from "../domain/userRanking/userRankingCreate";
import { UserRanking } from "../domain/userRanking/userRanking";
import { UserRankingResponse } from "../domain/userRanking/userRankingResponse";

interface UserRankingResponseRow extends RowDataPacket {
  id: number;
  baekjoon_name: string;
  round_id: number;
  total_solved: number;
  total_solved_weight: number;
  tier: number;
}

function UserRankingResponseRowToUserRankingResponse(obj: UserRankingResponseRow) {
  return {
    id: obj.id,
    baekjoonName: obj.baekjoon_name,
    roundId: obj.round_id,
    totalSolved: obj.total_solved,
    totalSolvedWeight: obj.total_solved_weight,
    tier: obj.tier,
  } as UserRankingResponse;
}

async function save(ranking: UserRankingCreate) {
  const insertQuery = "INSERT INTO user_ranking VALUES(NULL, ?, ?, ?, ?, ?)";
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

async function update(ranking: UserRankingCreate) {
  const updateQuery = "UPDATE user_ranking SET total_solved=?, total_solved_weight=?, tier=? WHERE user_id=? AND round_id=?";
  const updateParam = [ranking.totalSolved, ranking.totalSolvedWeight, ranking.tier, ranking.userId, ranking.roundId];
  try {
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(updateQuery, updateParam);
    return result.affectedRows;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
async function findByUserAndRound(userId: number, roundId: number) {
  const selectQuery = `SELECT id, (SELECT baekjoon_name FROM user WHERE id=ur.user_id) baekjoon_name, round_id, total_solved, total_solved_weight, tier 
    FROM user_ranking ur 
    WHERE user_id=? AND round_id=?`;
  const selectParam = [userId, roundId];
  try {
    const [[result], field] = await connection.query<[UserRankingResponseRow]>(selectQuery, selectParam);
    if (!result) return undefined;
    return UserRankingResponseRowToUserRankingResponse(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findOrderedBySolvedCount(roundId: number, pageSize: number, pageNumber: number) {
  // LIMIT a, b : (a+1)번째부터 b개 추출
  const selectQuery = `SELECT id, (SELECT baekjoon_name FROM user WHERE id=ur.user_id) baekjoon_name, round_id, total_solved, total_solved_weight, tier 
    FROM user_ranking ur 
    WHERE round_id=? ORDER BY (total_solved, total_solved_weight) DESC 
    LIMIT ?, ?`;
  const selectParam = [roundId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[UserRankingResponseRow]>(selectQuery, selectParam);
    if (!result[0]) return undefined;
    return result.map((value) => UserRankingResponseRowToUserRankingResponse(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findOrderedBySolvedCountWeight(roundId: number, pageSize: number, pageNumber: number) {
  // LIMIT a, b : (a+1)번째부터 b개 추출
  const selectQuery = `SELECT id, (SELECT baekjoon_name FROM user WHERE id=ur.user_id) baekjoon_name, round_id, total_solved, total_solved_weight, tier 
    FROM user_ranking ur 
    WHERE round_id=? ORDER BY (total_solved_weight, total_solved) DESC 
    LIMIT ?, ?`;
  const selectParam = [roundId, (pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[UserRankingResponseRow]>(selectQuery, selectParam);
    console.log(result[0].beakjoon_name);
    if (!result[0]) return undefined;
    const ret = result.map((value) => UserRankingResponseRowToUserRankingResponse(value));
    console.log(ret[0]);
    return ret;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const userRankingRepository = {
  save,
  update,
  findByUserAndRound,
  findOrderedBySolvedCount,
  findOrderedBySolvedCountWeight,
};
