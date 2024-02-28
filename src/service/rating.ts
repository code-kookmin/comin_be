import { RatingCreate, isRatingCreate } from '../domain/rating/ratingCreate';
import { ratingRepository } from '../repository/rating';

async function save(rating: RatingCreate) {
  if (!isRatingCreate(rating)) return undefined;
  const result = await ratingRepository.save(rating);
  if (!result) return undefined;
  return result;
}

export const ratingService = { save };
