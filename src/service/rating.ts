import { RatingCreate, isRatingCreate } from '../domain/rating/ratingCreate';
import { ratingRepository } from '../repository/rating';
import { ServiceLayer } from './ServiceLayer';

// async function save(rating: RatingCreate) {
//   if (!isRatingCreate(rating)) return undefined;
//   const result = await ratingRepository.save(rating);
//   if (!result) return undefined;
//   return result;
// }

// async function getUserRatingByRound(userId: number, roundId: number) {
//   if (isNaN(userId) || isNaN(roundId)) return undefined;
//   const result = await ratingRepository.getUserRatingByRound(userId, roundId);
//   if (!result) return undefined;
//   return result;
// }

// async function getLastUserRatingByRound(userId: number, roundId: number) {
//   if (isNaN(userId) || isNaN(roundId)) return undefined;
//   const result = await ratingRepository.getUserRatingByRound(userId, roundId);
//   if (!result) return undefined;
//   return result[0];
// }

// export const ratingService = { save, getUserRatingByRound, getLastUserRatingByRound };

export default class RatingService implements ServiceLayer{
  findById = ()=>{}
  
  save = async function save(rating: RatingCreate) {
    if (!isRatingCreate(rating)) return undefined;
    const result = await ratingRepository.save(rating);
    if (!result) return undefined;
    return result;
  }
  
  update = ()=>{}

  deleteById = ()=>{}
  
  getUserRatingByRound = async function getUserRatingByRound(userId: number, roundId: number) {
    if (isNaN(userId) || isNaN(roundId)) return undefined;
    const result = await ratingRepository.getUserRatingByRound(userId, roundId);
    if (!result) return undefined;
    return result;
  }
  
  getLastUserRatingByRound = async function getLastUserRatingByRound(userId: number, roundId: number) {
    if (isNaN(userId) || isNaN(roundId)) return undefined;
    const result = await ratingRepository.getUserRatingByRound(userId, roundId);
    if (!result) return undefined;
    return result[0];
  }
}
