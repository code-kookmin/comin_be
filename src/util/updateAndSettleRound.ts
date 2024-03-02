import { Round } from '../domain/round/round';
import { RoundCreate } from '../domain/round/roundCreate';
import { UserRanking } from '../domain/userRanking/userRanking';
import { UserRankingCreate } from '../domain/userRanking/userRankingCreate';
import { ratingService } from '../service/rating';
import { roundService } from '../service/round';
import userService from '../service/user';
import { userRankingService } from '../service/userRanking';
import { getToday } from './getDate';
import { refreshRating } from './refreshRating';

/*
 * 1. 이번주 사용자 최종 정보 구함.
 * 2. 저번주 사용자 최종 정보와 비교하여 델타값 구함 (이걸로 랭킹 생성)
 * 3. 다음 라운드 생성
 */

// 저번주 최종 정보와 비교하여 랭킹 생성을 위한 델타값 (user_ranking) 생성
// 랭킹 : 가장 최근 생성된 정보 - 이전 라운드 중 가장 최근 생성된 정보
async function settleRound(lastRound: Round | undefined, currentRound: Round) {
  const users = await userService.findAll();
  if (!users) {
    console.log('settleRound : error while finding user info');
    return undefined;
  }
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const currentRoundLastRating = await ratingService.getLastUserRatingByRound(user.id, currentRound.id);
    const lastRoundLastRating = lastRound
      ? await ratingService.getLastUserRatingByRound(user.id, lastRound.id)
      : {
          solvedCount: 0,
          solvedCountWeight: 0,
        };
    if (!currentRoundLastRating || !lastRoundLastRating) continue;
    const ranking: UserRankingCreate = {
      userId: user.id,
      roundId: currentRound.id,
      totalSolved: currentRoundLastRating.solvedCount - lastRoundLastRating.solvedCount,
      totalSolvedWeight: currentRoundLastRating.solvedCountWeight - lastRoundLastRating.solvedCountWeight,
      tier: currentRoundLastRating.tier,
    };
    await userRankingService.save(ranking);
  }
}

async function updateRound() {
  const round: RoundCreate = {
    name: 'round',
  };
  const result = await roundService.save(round);
  if (!result) console.log('round update failed');
}

export async function settleAndUpdateRound() {
  const currentRound = await roundService.getCurrentRound();
  const lastRound = await roundService.getLastRound();
  if (!currentRound) return undefined;
  await settleRound(lastRound, currentRound);
  await updateRound();
}
