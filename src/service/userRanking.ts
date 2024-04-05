import { UserRankingCreate, isUserRankingCreate } from '../domain/userRanking/userRankingCreate';
import { userRankingRepository } from '../repository/userRanking';

async function save(ranking: UserRankingCreate) {
  if (!isUserRankingCreate(ranking)) return undefined;
  const result = await userRankingRepository.save(ranking);
  if (!result) return undefined;
  return result;
}

async function update(ranking: UserRankingCreate) {
  if (!isUserRankingCreate(ranking)) return undefined;
  const result = await userRankingRepository.update(ranking);
  if (!result) return undefined;
  return result;
}

async function findByUserAndRound(userId: number, roundId: number) {
  if (isNaN(userId) || isNaN(roundId)) return undefined;
  const result = await userRankingRepository.findByUserAndRound(userId, roundId);
  if (!result) return undefined;
  return result;
}

async function findOrderedBySolvedCount(roundId: number, pageSize: number, pageNumber: number) {
  if (isNaN(roundId) || isNaN(pageSize) || isNaN(pageNumber)) return undefined;
  const result = await userRankingRepository.findOrderedBySolvedCount(roundId, pageSize, pageNumber);
  if (!result) return undefined;
  return result;
}

async function findOrderedBySolvedCountWeight(roundId: number, pageSize: number, pageNumber: number) {
  if (isNaN(roundId) || isNaN(pageSize) || isNaN(pageNumber)) return undefined;
  const result = await userRankingRepository.findOrderedBySolvedCountWeight(roundId, pageSize, pageNumber);
  if (!result) return undefined;
  return result;
}

export const userRankingService = {
  save,
  update,
  findByUserAndRound,
  findOrderedBySolvedCount,
  findOrderedBySolvedCountWeight,
};
