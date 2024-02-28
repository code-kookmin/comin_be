import { RoundCreate } from '../domain/round/roundCreate';
import { roundService } from '../service/round';
import { getToday } from './getDate';

async function updateRound() {
  const round: RoundCreate = {
    name: '라운드',
    startDate: getToday(),
  };
  const result = await roundService.save(round);
  if (!result) return undefined;
}

async function settleRound() {}

export async function updateAndSettleRound() {
  const updateRoundResult = await updateRound();
}
