import { RatingCreate } from "../domain/rating/ratingCreate";
import { roundService } from "../service/round";
import { userRankingService } from "../service/userRanking";
import { Round } from "../domain/round/round";
import { User } from "../domain/user";
import { UserRankingCreate } from "../domain/userRanking/userRankingCreate";
import { updateAndInitRound } from "./updateAndInitRound";
import UserService from "../service/user";
import RatingService from "../service/rating";

// { level: 0, solved: 0, tried: 0, partial: 0, total: 7174 }
interface UserBojInfo {
  handle: String;
  bio: String;
  badgeId: String;
  backgroundId: String;
  profileImageUrl: String;
  solvedCount: number;
  voteCount: number;
  tier: number;
  rating: number;
  ratingByProblemsSum: number;
  ratingByClass: number;
  ratingBySolvedCount: number;
  ratingByVoteCount: number;
  class: number;
  classDecoration: String;
  rivalCount: number;
  reverseRivalCount: number;
  maxStreak: number;
  coins: number;
  stardusts: number;
  joinedAt: String;
  bannedUntil: String;
  proUntil: String;
  rank: 104;
  isRival: true;
  isReverseRival: true;
}

const userService = new UserService();
const ratingService = new RatingService();

async function refreshRating(currentRound: Round, users: User[]) {
  try {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const todayRating = await fetch("https://solved.ac/api/v3/user/show?handle=" + user.baekjoonName);
      if (todayRating.status !== 200) continue;
      const todayRatingJson: UserBojInfo = await todayRating.json();
      const ratingCreateDto: RatingCreate = {
        userId: user.id,
        roundId: currentRound.id,
        solvedCount: todayRatingJson.solvedCount,
        solvedCountWeight: todayRatingJson.ratingByProblemsSum,
        tier: todayRatingJson.tier,
      };
      const res = await ratingService.save(ratingCreateDto);
      if (!res) {
        console.log("fail to save rating");
        return undefined;
      }
    }
    return true;
  } catch (err) {
    console.log(err);
  }
}

async function updateUserRanking(currentRound: Round, users: User[]) {
  try {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const ratings = await ratingService.getUserRatingByRound(user.id, currentRound.id);
      const userRanking = await userRankingService.findByUserAndRound(user.id, currentRound.id);
      // 초기 데이터가 들어가지 못했다면, 라운드 생성 과정에 문제가 있는 것이다.
      if (!ratings) continue;
      const lastRating = ratings[0];
      const firstRating = ratings[ratings.length - 1];
      const newUserRanking: UserRankingCreate = {
        userId: user.id,
        roundId: currentRound.id,
        totalSolved: lastRating.solvedCount - firstRating.solvedCount,
        totalSolvedWeight: lastRating.solvedCountWeight - firstRating.solvedCountWeight,
        tier: lastRating.tier,
      };
      let res = undefined;
      if (!userRanking) {
        res = await userRankingService.save(newUserRanking);
      } else {
        res = await userRankingService.update(newUserRanking);
      }
    }
    return true;
  } catch (err) {
    console.log(err);
  }
}

export async function updateRatingAndRanking() {
  if (!(await roundService.getCurrentRound())) {
    await updateAndInitRound();
  }
  const currentRound = await roundService.getCurrentRound();
  const users = await userService.findAll();
  if (!currentRound || !users) return undefined;
  await refreshRating(currentRound, users);
  await updateUserRanking(currentRound, users);
}
