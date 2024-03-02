import { RoundCreate, isRoundCreate } from '../domain/round/roundCreate';
import { roundRepository } from '../repository/round';

async function save(round: RoundCreate) {
  if (!isRoundCreate(round)) return undefined;
  const result = await roundRepository.save(round);
  return result;
}

async function getCurrentRound() {
  const result = await roundRepository.getCurrentRound();
  return result;
}

async function getLastRound() {
  const result = await roundRepository.getLastRound();
  return result;
}

export const roundService = { save, getCurrentRound, getLastRound };
