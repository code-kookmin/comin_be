import { RoundCreate, isRoundCreate } from '../domain/round/roundCreate';
import { roundRepository } from '../repository/round';

async function save(round: RoundCreate) {
  if (!isRoundCreate(round)) return undefined;
  const result = await roundRepository.save(round);
  return result;
}

export const roundService = { save };
