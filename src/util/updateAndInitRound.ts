import { RoundCreate } from "../domain/round/roundCreate";
import RatingService from "../service/rating";
import { roundService } from "../service/round";
import UserService from "../service/user";

const userService = new UserService
const ratingService = new RatingService

async function updateRound() {
  const round: RoundCreate = {
    name: 'round',
  };
  const result = await roundService.save(round);
  if (!result) return undefined;
  return result;
}

async function createUserRankingInitData(){
  const currentRound = await roundService.getCurrentRound();
  const lastRound = await roundService.getLastRound();
  const users = await userService.findAll();
  if (!currentRound || !users) return undefined;
  // 지난 라운드가 없다면, 어차피 이번 라운드에 처음 넣어줄 초기 데이터가 없으니까 리턴
  if(!lastRound) return undefined;
  for(let i=0; i<users.length; i++){
    const user = users[i];
    const lastUserRating = await ratingService.getLastUserRatingByRound(user.id, lastRound.id);
    if(!lastUserRating) continue;
    await ratingService.save({
      userId:lastUserRating.userId,
      roundId:lastUserRating.roundId,
      solvedCount:lastUserRating.solvedCount,
      solvedCountWeight:lastUserRating.solvedCountWeight,
      tier:lastUserRating.tier
    });
  }
}

export async function updateAndInitRound() {
  if(!(await updateRound())) return undefined;
  await createUserRankingInitData();
}
